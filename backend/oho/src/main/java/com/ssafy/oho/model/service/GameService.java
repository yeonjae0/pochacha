package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.CellResponseDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.dto.response.MinigameResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.repository.CellRepository;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.util.exception.GameGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class GameService {

    // StringRedisTemplate redisTemplate;
    CellRepository cellRepository;
    MinigameRepository minigameRepository;
    private final int MINIGAME_CNT = 4;
    private final int CELL_CNT = 24;

    @Autowired
    private GameService(CellRepository cellRepository, MinigameRepository minigameRepository/*, StringRedisTemplate redisTemplate*/) {
        this.cellRepository = cellRepository;
        this.minigameRepository = minigameRepository;
        // this.redisTemplate = redisTemplate;
    }

    public List<Object> getCell(RoomRequestDto roomRequestDto) throws GameGetException {
        /* 유효성 검사 */
        if(roomRequestDto.isProgress()) {  // 게임이 이미 시작 중일 경우
            throw new GameGetException();
        }

        // HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        List<Object> cellList = new ArrayList<>();
        List<Cell> normalCellList = cellRepository.findTop19Random();
        if(roomRequestDto.isIncludeMini()) { // 미니게임 ON 시작
            List<Minigame> miniCellList = minigameRepository.findTop4Random();

            // 미니게임 수만큼 넣는 알고리즘
            Minigame minigame;
            for (int i = 0; i < MINIGAME_CNT; i++) {
                minigame = miniCellList.get((int) Math.floor(i % miniCellList.size()));
                cellList.add(MinigameResponseDto.builder()
                        .name(minigame.getName())
                        .status('M')
                        .winnerCnt(minigame.getWinnerCnt())
                        .time(minigame.getTime())
                        .tagger(minigame.isTagger())
                        .build()
                );
            }
        }  // 미니게임 ON 끝

        Cell cell;
        int cellIdx = 0;
        while(cellList.size() < CELL_CNT) {
            cell = normalCellList.get((int) Math.floor(cellIdx++ % normalCellList.size()));

            boolean turn = false;
            int move = 0;
            // 이벤트인 경우
            if(cell.getStatus() == 'E') {
                // 턴제 확인
                if (cell.getName().contains("한 턴") || cell.getName().contains("한턴")) turn = true;

                // 이동 확인
                else if (cell.getName().contains("한 칸 앞")) move = 1;
                else if (cell.getName().contains("한 칸 뒤")) move = 2;
                else if (cell.getName().contains("두 칸 앞")) move = -1;
                else if (cell.getName().contains("두 칸 뒤")) move = -2;
            }

            cellList.add(CellResponseDto.builder()
                    .name(cell.getName())
                    .status(cell.getStatus())
                    .turn(turn)
                    .move(move)
                    .time(cell.getTime())
                    .build()
            );
        }

        Collections.shuffle(cellList);

        return cellList;
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
}
