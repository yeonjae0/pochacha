package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.dto.response.TimeStatusResponseDto;
import com.ssafy.oho.model.service.GameService;
import com.ssafy.oho.util.exception.GameGetException;
import com.ssafy.oho.util.exception.GameSetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("start")
    private ResponseEntity<?> startGame(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            Object[] cellStatusList = gameService.startGame(roomRequestDto);

            return ResponseEntity.ok(cellStatusList);
        } catch(GameGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 말 이동 Socket 함수
    @MessageMapping("move/{roomId}")
    public void movePin(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {

        Map<String, Object> responsePayload = gameService.movePin(payload, roomId);
        webSocket.convertAndSend("/topic/move/" + roomId, responsePayload);
    }

    /* 타이머 테스트 관련 코드 (재사용성) */
    /*
        TO DO :: 타이머 관련 ON/OFF API 작성
     */
    @MessageMapping("/start-timer")
    @SendTo("/topic/timer")
    public TimeStatusResponseDto startTimer() {
        // 타이머 시작 로직
        TimeStatusResponseDto timeStatusResponseDto = new TimeStatusResponseDto(); // TimerStatus는 타이머 상태 클래스로 가정
        // 타이머 상태 설정 로직
        return timeStatusResponseDto;
    }


    /* 라이어 게임 API */
    @MessageMapping("/mini/liar/set/{roomId}")
    public void setLiarGame(@Payload Map<String,Object> payload, @DestinationVariable String roomId) throws GameSetException{
            LiarGameResponseDto liarGameResponseDto = gameService.setLiarGame(payload, roomId);
            webSocket.convertAndSend("/topic/game/" + roomId, liarGameResponseDto);
    }
    /*
        TO DO :: 소켓 예외 처리 고려 (임의로 throws)
     */

    @MessageMapping("/mini/liar/vote/{roomId}")
    public void voteLiar(@Payload Map<String,Object> payload, @DestinationVariable String roomId){
       
    }

    @PostMapping("/mini/spell")
    public ResponseEntity<?> setSpell(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            return ResponseEntity.ok(gameService.setSpell(roomRequestDto));
        } catch (GameGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @MessageMapping("/mini/spell/confirm/{roomId}")
    public void confirmSpell(@Payload Map<String,Object> payload, @DestinationVariable String roomId) {
        // 초성 분리 및 정답 확인
        webSocket.convertAndSend("/topic/game/" + roomId, gameService.confirmSpell(payload, roomId));
    }
}
