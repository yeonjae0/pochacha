package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.CellResponseDto;
import com.ssafy.oho.model.dto.response.MinigameResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.repository.CellRepository;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.util.exception.BoardGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BoardService {

    CellRepository cellRepository;
    MinigameRepository minigameRepository;
    private final int MINIGAME_CNT = 4;
    private final int CELL_CNT = 24;

    @Autowired
    private BoardService(CellRepository cellRepository, MinigameRepository minigameRepository) {
        this.cellRepository = cellRepository;
        this.minigameRepository = minigameRepository;
    }

    public List<Object> getCell(RoomRequestDto roomRequestDto) throws BoardGetException {
        /* 유효성 검사 */
        if(roomRequestDto.isProgress()) {  // 게임이 이미 시작 중일 경우
            throw new BoardGetException();
        }

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
                        .order(0)
                        .build()
                );
            }
        }  // 미니게임 ON 끝

        Cell cell;
        int cellIdx = 0;
        while(cellList.size() < CELL_CNT) {
            cell = normalCellList.get((int) Math.floor(cellIdx++ % normalCellList.size()));
            cellList.add(CellResponseDto.builder()
                    .name(cell.getName())
                    .status(cell.getStatus())
                    .order(0)
                    .build()
            );
        }

        Collections.shuffle(cellList);

        return cellList;
    }
}
