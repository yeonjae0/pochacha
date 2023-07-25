package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import com.ssafy.oho.util.exception.PlayerSetException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private ResponseEntity<?> setPlayer(@RequestBody PlayerRequestDto playerRequestDto, HttpServletRequest request) {
        try {
            RoomResponseDto roomResponseDto = new RoomResponseDto();
            roomResponseDto.setId(playerRequestDto.getRoomId());
            PlayerResponseDto playerResponseDto;
            if(playerRequestDto.isHead()) {
                playerResponseDto = playerService.setHead(playerRequestDto, roomResponseDto,request.getRemoteAddr());
            } else {
                playerResponseDto = playerService.setPlayer(playerRequestDto, roomResponseDto,request.getRemoteAddr());
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
        } catch(/*PlayerGet*/Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
