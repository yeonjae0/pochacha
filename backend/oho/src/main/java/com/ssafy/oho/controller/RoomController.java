package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import com.ssafy.oho.util.exception.ChatException;
import com.ssafy.oho.util.exception.PlayerSetException;
import com.ssafy.oho.util.exception.RoomSetException;
import com.ssafy.oho.util.exception.RoomUpdateException;
import io.openvidu.java.client.OpenVidu;
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
import java.util.Map;

@Controller
@RequestMapping
@CrossOrigin(origins = "*")
public class RoomController {

    private final SimpMessagingTemplate webSocket;
    private final RoomService roomService;
    private final PlayerService playerService;
    private final OpenVidu openVidu;

    @Autowired
    private RoomController(SimpMessagingTemplate webSocket, RoomService roomService, PlayerService playerService, OpenVidu openVidu){
        this.webSocket = webSocket;
        this.roomService=roomService;
        this.playerService = playerService;
        this.openVidu=openVidu;
    }

    @PostMapping(value="/enter")
    private ResponseEntity<?> setRoom(@RequestBody PlayerRequestDto playerRequestDto) {
        try {
            Map<String, Object> map = new HashMap<>();

            /* 혜지 : roomId를 OpenVidu SessionId로 대체 */
            RoomResponseDto roomResponseDto = roomService.setRoom(playerRequestDto, openVidu);
            map.put("room", roomResponseDto);

            /* 혜지 : 각 플레이어(현재 방장)에게 토큰 발급 */
            PlayerResponseDto playerResponseDto = playerService.setHead(playerRequestDto, roomResponseDto.getId(), openVidu);
            map.put("player", playerResponseDto);

            return ResponseEntity.ok(map);
        } catch(RoomSetException | PlayerSetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value="/room")
    private ResponseEntity<?> getRoom(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            return ResponseEntity.ok(roomService.getRoom(roomRequestDto));
        } catch(/*RoomGet*/Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value="/room/update")
    private ResponseEntity<?> updateRoom(@RequestBody RoomRequestDto roomRequestDto) {
        try {
            return ResponseEntity.ok(roomService.updateRoom(roomRequestDto));
        } catch(RoomUpdateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @MessageMapping("/chat/{roomId}")
    public void chat(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        try {
            webSocket.convertAndSend("/topic/chat/" + roomId, new HashMap<>() {{ put("message", roomService.chat(payload, roomId)); }});
        } catch(ChatException e) {
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/queue/" + payload.get("playerId"), payload/* 임시 값 저장 */);
        } catch(Exception e) {
            return;
        }
    }
}
