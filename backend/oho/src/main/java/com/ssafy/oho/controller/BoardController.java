package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.CellResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.service.BoardService;
import com.ssafy.oho.util.exception.BoardGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("board")
@CrossOrigin
public class BoardController {
    private BoardService boardService;
    private SimpMessagingTemplate webSocket;
    private Map<String, List<Object>> roomMap = new HashMap<>();  // <게임 ID, 각 칸의 정보>

    @Autowired
    private BoardController(SimpMessagingTemplate webSocket, BoardService boardService) {
        this.webSocket = webSocket;
        this.boardService = boardService;
    }

    @PostMapping("cell")
    private ResponseEntity<?> getCell(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            if(!roomMap.containsKey(roomRequestDto.getId())) {
                List<Object> cellList = boardService.getCell(roomRequestDto);
                roomMap.put(roomRequestDto.getId(), cellList);
            }

            return ResponseEntity.ok(roomMap.get(roomRequestDto.getId()));
        } catch(BoardGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 말 이동 Socket 함수
    @MessageMapping("/move/{roomId}")
    public void board(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        webSocket.convertAndSend("/topic/move/" + roomId, payload.get("dice")/* 임시 값 저장 */);
    }
}
