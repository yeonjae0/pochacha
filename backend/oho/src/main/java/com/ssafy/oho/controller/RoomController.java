package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import com.ssafy.oho.util.exception.PlayerSetException;
import com.ssafy.oho.util.exception.RoomSetException;
import com.ssafy.oho.util.exception.RoomUpdateException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping
@CrossOrigin
public class RoomController {

    private final RoomService roomService;
    private final PlayerService playerService;
    @Autowired
    private RoomController(RoomService roomService, PlayerService playerService){
        this.roomService=roomService;
        this.playerService = playerService;
    }

    /*
    TO DO :: roomId를 OpenVidu SessionId로 대체
    */
    @PostMapping(value="/enter")
    private ResponseEntity<?> setRoom(@RequestBody PlayerRequestDto playerRequestDto){
        try {
            Map<String, Object> map = new HashMap<>();

            RoomResponseDto roomResponseDto = roomService.setRoom(playerRequestDto);
            map.put("room", roomResponseDto);

            PlayerResponseDto playerResponseDto = playerService.setHead(playerRequestDto, roomResponseDto);
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

}
