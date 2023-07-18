package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.MemberRequestDto;
import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import com.ssafy.oho.util.exception.RoomEnterException;
import com.ssafy.oho.util.exception.RoomGetException;
import com.ssafy.oho.util.exception.RoomUpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class RoomController {

    private final RoomService roomService;
    private final PlayerService playerService;
    @Autowired
    private RoomController(RoomService roomService, PlayerService playerService){
        this.roomService=roomService;
        this.playerService = playerService;
    }

    @PostMapping(value="/enter")
    private ResponseEntity<?> setRoom(@RequestBody PlayerRequestDto playerRequestDto){
        try {
            RoomResponseDto roomResponseDto = roomService.setRoom(playerRequestDto);
            playerService.setHead(playerRequestDto, roomResponseDto);

            return ResponseEntity.ok(roomResponseDto);
        } catch(RoomEnterException e) {
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

}
