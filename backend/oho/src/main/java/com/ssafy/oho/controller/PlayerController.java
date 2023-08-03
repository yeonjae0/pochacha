package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
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
@CrossOrigin
public class PlayerController {

    /* 혜지 : OpenViduController RoomController 통합 작업 */
    /* 
        CONFIRM :: OpenVidu 객체가 RoomController를 포함하여 총 두 개 생성되므로 고민 필요
     */
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
    private final SimpMessagingTemplate webSocket;

    private final PlayerService playerService;
    private final RoomService roomService;

    @Autowired
    private PlayerController(SimpMessagingTemplate webSocket, PlayerService playerService, RoomService roomService) {
        this.webSocket = webSocket;
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

            return ResponseEntity.ok(playerResponseDto);
        } catch(PlayerGetException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @MessageMapping("/update/{roomId}")
    public void updatePlayer(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        try {
            PlayerResponseDto playerResponseDto = playerService.updatePlayer(payload, roomId);
            webSocket.convertAndSend("/topic/player/" + roomId, playerResponseDto/* 임시 값 저장 */);
        } catch(PlayerUpdateException e) {
            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/queue/" + payload.get("id"), errorMsg);
        } catch(Exception e) {
            e.printStackTrace();

            HashMap<String, String> errorMsg = new HashMap<>();
            errorMsg.put("error", e.getMessage());
            webSocket.convertAndSend("/topic/player/" + roomId, payload/* 임시 값 저장 */);
        }
    }
}
