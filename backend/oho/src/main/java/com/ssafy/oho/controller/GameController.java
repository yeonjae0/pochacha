package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.response.GameResponseDto;
import com.ssafy.oho.model.dto.response.TimeStatusResponseDto;
import com.ssafy.oho.model.service.GameService;
import com.ssafy.oho.util.exception.GameGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("game")
@CrossOrigin
public class GameController {
    private GameService gameService;
    private SimpMessagingTemplate webSocket;

    @Autowired
    private GameController(SimpMessagingTemplate webSocket, GameService gameService) {
        this.webSocket = webSocket;
        this.gameService = gameService;
    }

    @MessageMapping("/game/{roomId}")
    public void startGame(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        try {
            GameResponseDto responsePayload = gameService.startGame(payload, roomId);
            webSocket.convertAndSend("/topic/game/" + roomId, responsePayload);
        }catch(GameGetException e){
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/topic/game/" + roomId, errorMsg/* 임시 값 저장 */);
        }
    }

    // 말 이동 Socket 함수
    @MessageMapping("move/{roomId}")
    public void movePin(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        Map<String, Object> responsePayload = gameService.movePin(payload, roomId);
        webSocket.convertAndSend("/topic/move/" + roomId, responsePayload);
    }

    @MessageMapping("/penalty/voice/{roomId}")
    public void broadcastAudioPenalty(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        System.out.println("Penalty Log");
        try {
            webSocket.convertAndSend("/topic/penalty/voice/" + roomId, gameService.validateNickName(payload, roomId));
        } catch (Exception e) {
            webSocket.convertAndSend("/topic/penalty/voice/" + roomId, e.getMessage());
        }
    }

    @MessageMapping("/timer/{roomId}")
    public void addTime(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {

        int time=(Integer)payload.get("time");
        // 타이머 시간 추가
        TimeStatusResponseDto timeStatusResponseDto = TimeStatusResponseDto.builder().time(time).build();
        webSocket.convertAndSend("/topic/timer/" + roomId, timeStatusResponseDto);
    }
}
