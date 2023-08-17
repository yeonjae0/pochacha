package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.LiarGameRequestDto;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.service.MinigameService;
import com.ssafy.oho.util.exception.GameGetException;
import com.ssafy.oho.util.exception.GameSetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("game")
@CrossOrigin(origins = "*")
public class MinigameController {

    private MinigameService minigameService;
    private SimpMessagingTemplate webSocket;

    @Autowired
    private MinigameController(SimpMessagingTemplate webSocket, MinigameService minigameService) {
        this.webSocket = webSocket;
        this.minigameService = minigameService;
    }


    /* 라이어 게임 API */
    @MessageMapping("/mini/liar/set/{roomId}")
    public void setLiarGame(@Payload Map<String,Object> payload, @DestinationVariable String roomId){
        try {
            webSocket.convertAndSend("/topic/mini/liar/set/" + roomId, minigameService.setLiarGame(payload, roomId));
        }catch(GameSetException e){
            webSocket.convertAndSend("/topic/mini/liar/set/" + roomId, e.getMessage());
        }
    }

    @MessageMapping("/mini/liar/vote/{roomId}")
    public void voteLiar(@Payload Map<String,Object> payload, @DestinationVariable String roomId){

    }

    /* 훈민정음 게임 API */
    @PostMapping("/mini/spell")
    public ResponseEntity<?> setSpell(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            return ResponseEntity.ok(minigameService.setSpell(roomRequestDto));
        } catch (GameGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @MessageMapping("/mini/spell/confirm/{roomId}")
    public void confirmSpell(@Payload Map<String,Object> payload, @DestinationVariable String roomId) {
        try {
            // 초성 분리 및 정답 확인
            webSocket.convertAndSend("/topic/game/" + roomId, minigameService.confirmSpell(payload, roomId));
        } catch (GameGetException e) {
            webSocket.convertAndSend("/topic/game/" + roomId, e.getMessage());
        }
    }

    /*
    태훈 : 두더지 게임 관련 소켓 통신
     */
    @MessageMapping("/mini/mole/time/{roomId}")
    public void broadcastRecord(@Payload Map<String,Object> payload, @DestinationVariable String roomId){
        try{
            webSocket.convertAndSend("/topic/mole/" + roomId, minigameService.checkRecordValidation(payload, roomId));
        } catch(GameGetException e){
            webSocket.convertAndSend("/topic/mole/" + roomId, e.getMessage());
        }
    }
}
