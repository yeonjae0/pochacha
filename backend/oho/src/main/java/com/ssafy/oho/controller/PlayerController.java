package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import com.ssafy.oho.util.exception.PlayerDeleteException;
import com.ssafy.oho.util.exception.PlayerGetException;
import com.ssafy.oho.util.exception.PlayerSetException;
import com.ssafy.oho.util.exception.PlayerUpdateException;
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
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/player")
@CrossOrigin(origins = "*")
public class PlayerController {

    private final SimpMessagingTemplate webSocket;
    private final PlayerService playerService;
    private final RoomService roomService;
    private final OpenVidu openVidu;

    @Autowired
    private PlayerController(SimpMessagingTemplate webSocket, PlayerService playerService, RoomService roomService, OpenVidu openVidu) {
        this.webSocket = webSocket;
        this.playerService = playerService;
        this.roomService = roomService;
        this.openVidu=openVidu;
    }

    @PostMapping(value="create")
    private ResponseEntity<?> setPlayer(@RequestBody PlayerRequestDto playerRequestDto) {
        try {
            PlayerResponseDto playerResponseDto;
            if(playerRequestDto.isHead()) {  // 방장일 경우
                playerResponseDto = playerService.setHead(playerRequestDto, playerRequestDto.getRoomId(), openVidu);
            } else {  // 플레이어일 경우
                playerResponseDto = playerService.setPlayer(playerRequestDto, playerRequestDto.getRoomId(), openVidu);
            }

            return ResponseEntity.ok(playerResponseDto);
        } catch (PlayerSetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    private ResponseEntity<?> getPlayer(@RequestBody PlayerRequestDto playerRequestDto) {
        try {
            PlayerResponseDto playerResponseDto = playerService.getPlayer(playerRequestDto);

            return ResponseEntity.ok(playerResponseDto);
        } catch(PlayerGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("{roomId}")
    private ResponseEntity<?> getPlayersByRoomId(@RequestBody PlayerRequestDto playerRequestDto, @PathVariable String roomId) {
        try {
            List<PlayerResponseDto> playerResponseDto = playerService.getPlayersByRoomId(playerRequestDto, roomId);

            for (PlayerResponseDto p : playerResponseDto) {
                if(p.getId().equals(playerRequestDto.getId())) {
                    webSocket.convertAndSend("/topic/player/" + roomId, p);
                }
            }

            return ResponseEntity.ok(playerResponseDto);
        } catch(PlayerGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @MessageMapping("ready/{roomId}")
    public void updatePlayer(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        try {
            PlayerResponseDto playerResponseDto = playerService.updatePlayer(payload, roomId);
            webSocket.convertAndSend("/topic/player/" + roomId, playerResponseDto/* 임시 값 저장 */);
        } catch(PlayerUpdateException e) {
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/topic/player/" + roomId, errorMsg/* 임시 값 저장 */);
        } catch(Exception e) {
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/topic/player/" + roomId, payload/* 임시 값 저장 */);
        }
    }

    @MessageMapping("leave/{roomId}")
    public void deletePlayer(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        try {
            PlayerResponseDto playerResponseDto = playerService.deletePlayer(payload, roomId);

            // id만 가지고 있는 값 전송
            webSocket.convertAndSend("/topic/player/" + roomId, playerResponseDto);
        } catch(PlayerDeleteException e) {
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/queue/" + payload.get("id"), errorMsg);
        } catch(Exception e) {
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/topic/player/" + roomId, payload/* 임시 값 저장 */);
        }
    }

}
