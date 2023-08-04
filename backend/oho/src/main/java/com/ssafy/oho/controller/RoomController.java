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
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping
@CrossOrigin(origins = "*")
public class RoomController {

    /* 혜지 : OpenViduController RoomController 통합 작업 */
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openVidu;

    /*
        @PostConstruct란,
        종속성 주입이 완료된 후 실행되어야 하는 메소드에 사용하는 것으로,
        의존성 주입이 끝나고 실행됨과 빈이 하나만 생성됨을 보장함.
    */
    @PostConstruct
    public void init() {
        System.out.println("CREATE OPENVIDU OBJECT");
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    private final RoomService roomService;
    private final PlayerService playerService;
    @Autowired
    private RoomController(RoomService roomService, PlayerService playerService){
        this.roomService=roomService;
        this.playerService = playerService;
    }


    /**
     * @param playerRequestDto Nickname
     * @return room(Session Id), player
     */
    @PostMapping(value="/enter")
    private ResponseEntity<?> setRoom(@RequestBody PlayerRequestDto playerRequestDto) {
        System.out.println("SET ROOM API CALL");
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


}
