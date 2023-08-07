package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.service.GameService;
import com.ssafy.oho.util.exception.GameGetException;
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
@RequestMapping("game")
@CrossOrigin
public class GameController {
    private GameService gameService;
    private SimpMessagingTemplate webSocket;
    private Map<String, List<Object>> roomMap = new HashMap<>();  // <게임 ID, 각 칸의 정보>

    @Autowired
    private GameController(SimpMessagingTemplate webSocket, GameService gameService) {
        this.webSocket = webSocket;
        this.gameService = gameService;
    }

    @PostMapping("cell")
    private ResponseEntity<?> getCell(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            if(!roomMap.containsKey(roomRequestDto.getId())) {
                List<Object> cellList = gameService.getCell(roomRequestDto);
                roomMap.put(roomRequestDto.getId(), cellList);
            }

            return ResponseEntity.ok(roomMap.get(roomRequestDto.getId()));
        } catch(GameGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 말 이동 Socket 함수
    @MessageMapping("/move/{roomId}")
    public void movePin(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {

        Map<String, Object> responsePayload = gameService.movePin(payload, roomId);
        responsePayload.put("cell", roomMap.get(roomId).get(((int) responsePayload.get("pin")) - 1));

        // 임시 cell 구분

        webSocket.convertAndSend("/topic/move/" + roomId, responsePayload/* 임시 값 저장 */);
    }

    @MessageMapping("/leave/{roomId}")
    public void leavePlayer(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        webSocket.convertAndSend("/topic/player/" + roomId, payload/* 임시 값 저장 */);
    }

    /* 혜지 : 라이어 게임 API */
    @MessageMapping("/mini/liar/{roomId}")
    public void setLiarGame(@Payload Map<String,Object> payload, @DestinationVariable String roomId){
        LiarGameResponseDto liarGameResponseDto=gameService.setLiarGame(payload,roomId);
        webSocket.convertAndSend("/topic/game/"+roomId,liarGameResponseDto);
    }
}
