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
import io.openvidu.java.client.OpenVidu;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    PlayerService playerService;
    RoomService roomService;

    @Autowired
    private PlayerController(PlayerService playerService, RoomService roomService) {
        this.playerService = playerService;
        this.roomService = roomService;
    }

    /**
     * @param playerRequestDto
     * @return playerResponseDto (OpenVidu Token)
     */
    @PostMapping(value="create")
    private ResponseEntity<?> setPlayer(@RequestBody PlayerRequestDto playerRequestDto) {
        System.out.println("SET PLAYER API CALL");
        try {
            RoomResponseDto roomResponseDto = RoomResponseDto.builder()
                    .id(playerRequestDto.getRoomId())
                    .build();

            PlayerResponseDto playerResponseDto;
            if(playerRequestDto.isHead()) {  // 방장일 경우
                playerResponseDto = playerService.setHead(playerRequestDto, roomResponseDto, openVidu);
            } else {  // 플레이어일 경우
                playerResponseDto = playerService.setPlayer(playerRequestDto, roomResponseDto, openVidu);
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
