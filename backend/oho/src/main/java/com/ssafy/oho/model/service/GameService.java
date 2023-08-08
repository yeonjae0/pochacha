package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.CellRepository;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.data.liargame.words.*;
import com.ssafy.oho.util.data.liargame.words.Objects;
import com.ssafy.oho.util.exception.GameGetException;
import com.ssafy.oho.util.exception.GameSetException;
import com.ssafy.oho.util.exception.RoomGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameService extends RedisService {
    private final CellRepository cellRepository;
    private final MinigameRepository minigameRepository;
    private final RoomRepository roomRepository;
    private final int MINIGAME_CNT = 4;
    private final int CELL_CNT = 24;

    @Autowired
    private GameService(StringRedisTemplate redisTemplate, CellRepository cellRepository, MinigameRepository minigameRepository, RoomRepository roomRepository) {
        super(redisTemplate);
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
                if(super.getPlayer(roomId, p.getId()) == null) {
                    throw new GameGetException("해당 방에 존재하지 않는 플레이어입니다.");
                }
                if((boolean) super.getPlayerInfo(roomId, p.getId(), "ready")) {
                    throw new GameGetException("모든 플레이어가 준비되지 않았습니다.");
                }
            }
            /*** 유효성 검사 끝 ***/

            // 게임 정보 존재하지 않을 경우
            if(super.getGame(roomId) == null) {
                /*** 유효성 검사 ***/
                if(room.isProgress()) {  // 게임이 이미 시작 중일 경우
                    throw new GameGetException();
                }

                super.setGame(room.getId(), 0, 0);
                setCell(roomId, roomRequestDto);
            }

            Object[] cellList = new Object[24];
            for (int i = 0; i < CELL_CNT; i++) {
                cellList[i] = super.getCell(roomId, i);
            }

            return cellList;
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
                minigame = miniCellList.get(i % miniCellList.size());  // 미니게임 가져오기
                do {
                    miniIndex = new Random().nextInt(CELL_CNT);
                }while (randomIndex.contains(miniIndex));

                randomIndex.add(miniIndex);
                super.setMinigame(roomId, minigame, miniIndex);  /// Redis에 minigame 삽입
            }
        }  // 미니게임 ON 끝

        Cell cell;
        for (int i = 0; i < CELL_CNT; i++) {
            // 해당 순서에 미니게임 이미 삽입되어 있을 경우 pass
            if(super.getCell(roomId, i) != null) continue;
            cell = normalCellList.get((int) Math.floor(i % normalCellList.size()));  // 각 칸 가져오기

            super.setCell(roomId, cell, i);  /// Redis에 cell 삽입
        }
    }

    public Map<String, Object> movePin(Map<String, Object> payload, String roomId) {
        Map<String, Object> responsePayload = new HashMap<>();

        int dice = (int) (Math.random() * 6) +1;

        int pin = (int) super.getGameInfo(roomId, "pin");
        int lab = (int) super.getGameInfo(roomId, "lab");

        Map<String, String> hash = new HashMap<>();

        hash.put("pin", Integer.toString((pin + dice) % 24));
        if(Integer.parseInt(hash.get("pin")) < 0) hash.put("pin", hash.get("pin") + 24);
        if(pin < Integer.parseInt(hash.get("pin"))) hash.put("lab", Integer.toString(++lab));

        super.setGameInfo(roomId, hash);  // Redis에 저장

        responsePayload.put("game", super.getGame(roomId));
        responsePayload.put("cell", super.getCell(roomId, Integer.parseInt(hash.get("pin"))));

        return responsePayload;
    }

    /*
        TO DO :: 라이어 게임 세팅 API
     */
    public LiarGameResponseDto setLiarGame(Map<String, Object> payload, String roomId) throws GameSetException{
        Map<String, Object> responsePayload = new HashMap<>();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new RoomGetException());
            List<Player> playerList=room.getPlayers();

            //멀티 게임이므로 2명 미만의 상태에서는 진행 불가
            if(playerList.size()<2){
                throw new GameSetException();
            }

            //게임 진행 턴(순서) 임의로 배정
            Collections.shuffle(playerList);

            String subject = ((String) payload.getOrDefault("subject", "")).trim();

            /*
                CONFIRM :: 조건문을 바꿀 방법 찾기 (enum 데이터 저장 방식 변경)
                            그러나 우아한 형제들 블로그에서는 enum과 함께 아래처럼 사용
             */

            String word="";
            if(subject.equals("animal")){
                word=Animal.getRandomValue();
            }
            else if(subject.equals("country")){
                word=Country.getRandomValue();
            }
            else if(subject.equals("food")){
                word=Food.getRandomValue();
            }
            else if(subject.equals("objects")){
                word=Objects.getRandomValue();
            }
            else if(subject.equals("singer")){
                word=Singer.getRandomValue();
            }
            else if(subject.equals("sports")) {
                word = Sports.getRandomValue();
            }
            else{
                throw new GameSetException();
            }

            /*** Response DTO Build ***/
            LiarGameResponseDto.builder()
                    .liar(playerList.get(0).getId())
                    .word(word)
                    .turns(playerList)
                    .build();


        /*
            TO DO :: Redis에 roomId, liar, room, turns 저장
         */
            return new LiarGameResponseDto();
        }
        catch(Exception e){
            throw new GameSetException();
        }
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
    public HashMap<String, Object> setSpell(RoomRequestDto roomRequestDto) throws GameGetException {
        String firstWord = wordUnit[(int) Math.floor(Math.random() * wordUnit.length)];
        String secondWord = wordUnit[(int) Math.floor(Math.random() * wordUnit.length)];

        Room room = roomRepository.findById(roomRequestDto.getId()).orElseThrow(GameGetException::new);
        List<String> playerIdList = new ArrayList<>();
        for (Player p : room.getPlayers()) {
            playerIdList.add(p.getId());
        }

        Collections.shuffle(playerIdList);  // 무작위 섞기

        /*** Redis Input ***/
        super.setSpell(roomRequestDto.getId(), firstWord, secondWord, playerIdList);

        /*** Response DTO Build ***/
        return new HashMap<>() {{
            put("firstWord", firstWord);
            put("secondWord", secondWord);
            put("playerIdList", playerIdList);
        }};
    }
    public Map<String, Object> confirmSpell(Map<String, Object> payload, String roomId) {
        /*
            TO DO :: 플레이어 올바른 순서 확인 로직 필요
         */
        // 데이터 Key : correct(Boolean), msg(String)
        Map<String, Object> confirmMap = new HashMap<>();
        confirmMap.put("correct", false);  // Default correct
        confirmMap.put("msg", "틀렸습니다.");  // Default msg

        String firstWord = (String) super.getSpellInfo(roomId, "firstWord");
        String secondWord = (String) super.getSpellInfo(roomId, "secondWord");

        String word = ((String) payload.getOrDefault("word", "")).trim();
        if(word.length() != 2) {  // 단어를 받지 못했을 경우, 단어 길이가 다를 경우
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
