package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.GameResponseDto;
import com.ssafy.oho.model.dto.response.PenaltyResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.CellRepository;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.exception.GameGetException;
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

    public GameResponseDto startGame(Map<String, Object> payload, String roomId) throws GameGetException {
        /*** 유효성 검사 ***/
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new GameGetException("방 조회에 실패하였습니다."));

        //if(room.getPlayers().size() != 4) {  // 정원 4인이 모두 접속하지 않았을 경우
        //    throw new GameGetException("4명이 되어야 게임을 시작할 수 있습니다.");
        //}

        for(Player p : room.getPlayers()) {
            if(super.getPlayer(roomId, p.getId()) == null) {
                throw new GameGetException("해당 방에 존재하지 않는 플레이어입니다.");
            }
            if(!Boolean.parseBoolean(super.getPlayerInfo(roomId, p.getId(), "ready"))) {
                throw new GameGetException("모든 플레이어가 준비되지 않았습니다.");
            }
        }

        /*** 유효성 검사 끝 ***/
        try {
            // 게임 정보 존재하지 않을 경우
            if(super.getGame(roomId) == null) {
                /*** 유효성 검사 ***/
                if(room.isProgress()) {  // 게임이 이미 시작 중일 경우
                    throw new GameGetException();
                }

                /* 기존 rest api를 변경하면서 임의로 생성 */
                RoomRequestDto roomRequestDto=RoomRequestDto.builder().id(roomId).includeMini(payload.containsKey("includeMini")).build();

                super.setGame(room.getId(), 0, 0);
                setCell(roomId, roomRequestDto);
            }

            Object[] cellList = new Object[CELL_CNT];
            for (int i = 0; i < CELL_CNT; i++) {
                cellList[i] = super.getCell(roomId, i);
            }

            roomRepository.save(Room.builder()
                    .id(roomId)
                    .players(room.getPlayers())
                    .progress(true)
                    .secret(room.isSecret())
                    .build());

            List<String> playerIdList=new ArrayList<>();
            for(Player player:room.getPlayers()){
                playerIdList.add(player.getId());
            }
            Collections.shuffle(playerIdList);

            GameResponseDto gameResponseDto=GameResponseDto.builder().cellList(cellList).playerIdList(playerIdList).build();

            return gameResponseDto;
        } catch(Exception e) {
            throw new GameGetException();
        }
    }
    public void setCell2(String roomId, RoomRequestDto roomRequestDto) throws GameGetException {
        List<Minigame> miniCellList = minigameRepository.findAll();

        Minigame minigame;
        int miniIndex;
        for (int i = 0; i < CELL_CNT; i++) {
            minigame = miniCellList.get(i % miniCellList.size());  // 미니게임 가져오기
            super.setMinigame(roomId, minigame, i);  /// Redis에 minigame 삽입
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

        boolean set=(boolean) payload.get("set");

        if(set==false) {
            int dice = (!payload.containsKey("reload")) ? (int) (Math.random() * 6) + 1 : 0;

            int pin = Integer.parseInt(super.getGameInfo(roomId, "pin"));
            int lab = Integer.parseInt(super.getGameInfo(roomId, "lab"));

            Map<String, String> hash = new HashMap<>();

            /* 혜지 : dice 값 추가 */
            hash.put("dice", Integer.toString(dice));
            hash.put("pin", Integer.toString((pin + dice) % 24));
            if (Integer.parseInt(hash.get("pin")) < 0) hash.put("pin", hash.get("pin") + 24);
            if (pin > Integer.parseInt(hash.get("pin"))) hash.put("lab", Integer.toString(++lab));

            super.setGameInfo(roomId, hash);  // Redis에 저장

            responsePayload.put("game", super.getGame(roomId));
            responsePayload.put("cell", super.getCell(roomId, Integer.parseInt(hash.get("pin"))));
        }
        else{
            int move=Integer.parseInt(payload.get("move").toString());
            int dice = Integer.parseInt(super.getGameInfo(roomId, "dice"));
            int pin = Integer.parseInt(super.getGameInfo(roomId, "pin"));
            int newPin=pin+move;
            if(newPin<0) newPin+=24;
            if(newPin>23) newPin%=24;
            int lab = Integer.parseInt(super.getGameInfo(roomId, "lab"));
            if(pin>newPin) lab++;

            Map<String, String> hash = new HashMap<>();
            hash.put("dice", Integer.toString(dice));
            hash.put("pin", Integer.toString(newPin));
            hash.put("lab",Integer.toString(lab));

            super.setGameInfo(roomId, hash);  // Redis에 저장

            responsePayload.put("game", super.getGame(roomId));
            responsePayload.put("cell", super.getCell(roomId, Integer.parseInt(hash.get("pin"))));
        }
        return responsePayload;
    }

    public PenaltyResponseDto getFaceFilter(Map<String, Object> payload, String roomId) throws GameGetException {
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new RoomGetException());
            String nickname=payload.get("nickname").toString();
            Random random=new Random();
            int num=random.nextInt(4);//4 미만의 랜덤 수

            PenaltyResponseDto penaltyResponseDto=PenaltyResponseDto.builder()
                    .nickname(nickname)
                    .num(num)
                    .build();
            return penaltyResponseDto;
        }catch (Exception e){
            throw new GameGetException("벌칙 생성에 실패했어요");
        }
    }
}
