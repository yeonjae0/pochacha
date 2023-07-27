package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import com.ssafy.oho.util.exception.PlayerDeleteException;
import com.ssafy.oho.util.exception.PlayerGetException;
import com.ssafy.oho.util.exception.PlayerSetException;
import com.ssafy.oho.util.exception.PlayerUpdateException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/player")
@CrossOrigin
public class PlayerController {

    PlayerService playerService;
    RoomService roomService;

    @Autowired
    private PlayerController(PlayerService playerService, RoomService roomService) {
        this.playerService = playerService;
        this.roomService = roomService;
    }

    @PostMapping(value="create")
    private ResponseEntity<?> setPlayer(@RequestBody PlayerRequestDto playerRequestDto) {
        try {
            RoomResponseDto roomResponseDto = RoomResponseDto.builder()
                    .id(playerRequestDto.getRoomId())
                    .build();

            PlayerResponseDto playerResponseDto;
            if(playerRequestDto.isHead()) {  // 방장일 경우
                playerResponseDto = playerService.setHead(playerRequestDto, roomResponseDto);
            } else {  // 플레이어일 경우
                playerResponseDto = playerService.setPlayer(playerRequestDto, roomResponseDto);
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
    @PostMapping("update")
    private ResponseEntity<?> updatePlayer(@RequestBody PlayerRequestDto playerRequestDto) {
        try {
            playerService.updatePlayer(playerRequestDto);

            return ResponseEntity.ok("");
        } catch(PlayerUpdateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
