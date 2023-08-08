package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.KrWordResponseDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.CellRepository;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.exception.GameGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class GameService extends RedisService {

    // private final StringRedisTemplate redisTemplate;
    private final CellRepository cellRepository;
    private final MinigameRepository minigameRepository;
    private final RoomRepository roomRepository;
    private final int MINIGAME_CNT = 4;
    private final int CELL_CNT = 24;

    @Autowired
    private GameService(StringRedisTemplate redisTemplate, CellRepository cellRepository, MinigameRepository minigameRepository, RoomRepository roomRepository) {
        super(redisTemplate);
        // this.redisTemplate = redisTemplate;
        this.cellRepository = cellRepository;
        this.minigameRepository = minigameRepository;
        this.roomRepository = roomRepository;
    }

    public Object[] startGame(RoomRequestDto roomRequestDto) throws GameGetException {
        try {
            /*** 유효성 검사 ***/
            String roomId = roomRequestDto.getId();
            /*
                TO DO :: 플레이어 존재 여부 확인
             */
            if (roomId == null || !roomRepository.existsById(roomId)) {  // 해당 방이 존재하지 않을 경우
                throw new GameGetException();
            }
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new GameGetException("방 조회에 실패하였습니다. (방이 존재하지 않음)"));

//            if(room.getPlayers().size() != 4) {  // 정원 4인이 모두 접속하지 않았을 경우
//                throw new GameGetException("4명이 되어야 게임을 시작할 수 있습니다.");
//            }

            for(Player p : room.getPlayers()) {
                if(!super.hashOperations.hasKey(super.getPlayerListKey(roomId, p.getId()), "id")) {
                    throw new GameGetException("해당 방에 존재하지 않는 플레이어입니다.");
                }
                if(!Boolean.parseBoolean((String) super.hashOperations.get(super.getPlayerListKey(roomId, p.getId()), "ready"))) {
                    throw new GameGetException("모든 플레이어가 준비되지 않았습니다.");
                }
            }
            /*** 유효성 검사 끝 ***/

            // 게임 정보 존재하지 않을 경우
            if(!super.hashOperations.hasKey(super.getGameKey(roomId), "id")) {
                /*** 유효성 검사 ***/
                if(room.isProgress()) {  // 게임이 이미 시작 중일 경우
                    throw new GameGetException();
                }

                super.defaultGameRedis(room.getId(), room.getPlayers());  // 게임 정보 Redis에 삽입
                setCell(roomId, roomRequestDto);
            }

            Object[] cellStatusList = new Object[24];
            for (int i = 0; i < CELL_CNT; i++) {
                cellStatusList[i] = super.hashOperations.entries(super.getCellListKey(roomId, i));
            }

            return cellStatusList;
        } catch(Exception e) {
            throw new GameGetException();
        }


    }

    public void setCell(String roomId, RoomRequestDto roomRequestDto) throws GameGetException {
        List<Cell> normalCellList = cellRepository.findTop19Random();

        if(roomRequestDto.isIncludeMini()) { // 미니게임 ON 시작
            List<Minigame> miniCellList = minigameRepository.findTop4Random();

            // 미니게임 수만큼 Redis에 cell 삽입
            Minigame minigame;
            int miniIndex;
            Set<Integer> randomIndex = new HashSet<>();  // 삽입할 index 담기
            for (int i = 0; i < MINIGAME_CNT; i++) {
                minigame = miniCellList.get((int) Math.floor(i % miniCellList.size()));  // 미니게임 가져오기
                do {
                    miniIndex = (int)(Math.random() * CELL_CNT);
                }while (randomIndex.contains(miniIndex));

                super.defaultMinigameRedis(minigame, roomId, miniIndex);  /// Redis에 minigame 삽입
            }
        }  // 미니게임 ON 끝

        Cell cell;
        for (int i = 0; i < CELL_CNT; i++) {
            // 해당 순서에 미니게임 이미 삽입되어 있을 경우 pass
            if(super.hashOperations.hasKey(super.getCellListKey(roomId, i), "name")) continue;
            cell = normalCellList.get((int) Math.floor(i % normalCellList.size()));  // 각 칸 가져오기

            super.defaultCellRedis(cell, roomId, i);  /// Redis에 cell 삽입
        }
    }

    public Map<Object, Object> getCell(String roomId, int index) {
        return super.hashOperations.entries(super.getCellListKey(roomId, index));
    }

    public Map<String, Object> movePin(Map<String, Object> payload, String roomId) {
        Map<String, Object> responsePayload = new HashMap<>();

        int dice = (int) (Math.random() * 6) +1;

        int pin = ((int) payload.get("pin") + dice) % 24;
        if(pin < 0) pin += 24;

        int lab = (int) payload.get("lab");
        if(pin < (int) payload.get("pin")) lab++;

        responsePayload.put("dice", dice);
        responsePayload.put("pin", pin);
        responsePayload.put("lab", lab);

        return responsePayload;
    }

    /*
        TO DO :: 라이어 게임 세팅 API
     */
    public LiarGameResponseDto setLiarGame(Map<String, Object> payload, String roomId) {
        /*
        <구현 로직>
        1. word와 liar, player 순서 리스트 내보내기
        2. Redis에 roomId와 함께 저장하기
         */
        return new LiarGameResponseDto();
    }

    /*
        TO DO :: 투표 득표수 집계 메소드 추가
     */
    String[] wordUnit = {
            "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
            "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
            "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
            "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    };
    public KrWordResponseDto setKrWord(Map<String, Object> payload, String roomId) {
        String firstWord = wordUnit[(int) Math.floor(Math.random() * wordUnit.length)];
        String secondWord = wordUnit[(int) Math.floor(Math.random() * wordUnit.length)];
        List<String> playerIdList = new ArrayList<>();
        // 플레이어 ID 리스트에 추가
        playerIdList.add((String) super.hashOperations.get(super.getGameKey(roomId), "player1"));
        playerIdList.add((String) super.hashOperations.get(super.getGameKey(roomId), "player2"));
        playerIdList.add((String) super.hashOperations.get(super.getGameKey(roomId), "player3"));
        playerIdList.add((String) super.hashOperations.get(super.getGameKey(roomId), "player4"));

        Collections.shuffle(playerIdList);  // 무작위 섞기

        /*** Redis Input ***/
        defaultKrWordRedis(roomId, firstWord, secondWord, playerIdList);

        /*** Response DTO Build ***/
        KrWordResponseDto krWordResponseDto = KrWordResponseDto.builder()
                .firstWord(firstWord)
                .secondWord(secondWord)
                .turn(playerIdList)
                .build();

        return krWordResponseDto;
    }
    public Map<String, Object> confirmKrWord(Map<String, Object> payload, String roomId) {
        // 데이터 Key : correct(Boolean), msg(String)
        Map<String, Object> confirmMap = new HashMap<>();
        confirmMap.put("correct", false);  // Default correct
        confirmMap.put("msg", "틀렸습니다.");  // Default msg

        String firstWord = (String) super.hashOperations.get(super.getKrWordKey(roomId), "firstWord");
        String secondWord = (String) super.hashOperations.get(super.getKrWordKey(roomId), "secondWord");

        String word = ((String) payload.getOrDefault("word", "")).trim();
        if(word.equals("") || word.length() != 2) {  // 단어를 받지 못했을 경우, 단어 길이가 다를 경우
            confirmMap.put("msg", "단어의 길이를 확인해 주세요.");
            return confirmMap;
        }

        char inputFirstWord = word.charAt(0);
        char inputSecondWord = word.charAt(1);
        if(inputFirstWord < 0xAC00 && inputSecondWord < 0xAC00) {  // 한글을 입력하지 않았을 경우
            confirmMap.put("msg", "한영 전환을 확인해 주세요.");
            return confirmMap;
        }

        // 첫번재 단어 비교
        int inputFistUnitVal = inputFirstWord - 0xAC00;
        int inputFirstUnit = ((inputFistUnitVal - (inputFistUnitVal % 28))/28)/21;

        int inputSecondUnitVal = inputSecondWord - 0xAC00;
        int inputSecondUnit = ((inputSecondUnitVal - (inputSecondUnitVal % 28))/28)/21;

        if(!firstWord.equals(wordUnit[inputFirstUnit]) || !secondWord.equals(wordUnit[inputSecondUnit])) {
            return confirmMap;
        }

        confirmMap.put("correct", true);  // Default correct
        confirmMap.put("msg", "정답입니다!");  // Default msg

        return confirmMap;
    }
}
