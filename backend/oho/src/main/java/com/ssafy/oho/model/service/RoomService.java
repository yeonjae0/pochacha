package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.exception.RoomDeleteException;
import com.ssafy.oho.util.exception.RoomGetException;
import com.ssafy.oho.util.exception.RoomSetException;
import com.ssafy.oho.util.exception.RoomUpdateException;
import io.openvidu.java.client.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Service
public class RoomService {

//    @Value("${OPENVIDU_URL}")
//    private String OPENVIDU_URL;
//
//    @Value("${OPENVIDU_SECRET}")
//    private String OPENVIDU_SECRET;

    private final RoomRepository roomRepository;
 //   private final OpenVidu openVidu;


    /*
    기존 OpenVidu Controller에서는 생성자 선언 시에 @PostConstruct를 사용했음.
    @PostConstruct란
    종속성 주입이 완료된 후 실행되어야 하는 메소드에 사용하는 것으로,
    의존성 주입이 끝나고 실행됨과 빈이 하나만 생성됨을 보장함.
    그러나 서비스 단에서 구현하는 것을 고려할 때, @Autowired를 사용하는 것으로 결정함.
     */

    @Autowired
    private RoomService(RoomRepository roomRepository){
        this.roomRepository=roomRepository;
        //this.openVidu=new OpenVidu(OPENVIDU_URL,OPENVIDU_SECRET);
    }

    /* 혜지 : OpenVidu Controller의 initializeSession과 createConnection을 RoomService에서 선언 */
    public RoomResponseDto setRoom(PlayerRequestDto playerRequestDto) throws RoomSetException {
        try {
            // 랜덤 방 UID 생성
            String id;
            do {
                id = RandomStringUtils.random(12, true, true);
            } while(roomRepository.existsById(id));

            /*** Entity Build ***/
            Room room = Room.builder()
                    .id(id)
                    .build();

            room = roomRepository.save(room);

            /*** Response DTO Build ***/
            RoomResponseDto roomResponseDto = RoomResponseDto.builder()
                    .id(room.getId())
                    .secret(room.isSecret())
                    .progress(room.isProgress())
                    .build();

            return roomResponseDto;

        } catch(Exception e) {
            System.out.println(e.getMessage());
            throw new RoomSetException();
        }
    }

    public RoomResponseDto getRoom(RoomRequestDto roomRequestDto) throws RoomGetException {

        /*** 유효성 검사 ***/
        /* 
            TO DO :: 사용자가 현재 방에 존재하는 사람인지 검사
         */
        Room room = roomRepository.findById(roomRequestDto.getId());
        if (room == null) throw new RoomGetException();

        try {

            /*** Response DTO Build ***/
            RoomResponseDto roomResponseDto = RoomResponseDto.builder()
                    .id(room.getId())
                    .secret(room.isSecret())
                    .progress(room.isProgress())
                    .build();

            return roomResponseDto;
        } catch (Exception e) {
            throw new RoomGetException();
        }
    }

    public RoomResponseDto updateRoom(RoomRequestDto roomRequestDto) throws RoomUpdateException {
        String id = roomRequestDto.getId();
        boolean secret = roomRequestDto.isSecret();
        boolean progress = roomRequestDto.isProgress();

        /*** 유효성 검사 ***/
        // 존재하지 않는 방일 경우
        if(id == null || roomRepository.existsById(id)){
            throw new RoomUpdateException();
        }
        // 게임이 진행 중일 경우
        if(progress) {
            throw new RoomUpdateException();
        }
        /*
            TO DO :: request 보낸 플레이어가 현재 방의 방장인지 확인
        */

        try {
            /*** Entity Build ***/
            Room room = Room.builder()
                    .id(id)
                    .secret(secret)
                    .progress(false)
                    .build();

            roomRepository.save(room);

            /*** Response DTO Build ***/
            RoomResponseDto roomResponseDto = RoomResponseDto.builder()
                    .id(room.getId())
                    .secret(room.isSecret())
                    .progress(room.isProgress())
                    .build();

            return roomResponseDto;
        } catch(Exception e) {
            throw new RoomUpdateException();
        }
    }

    public void deleteRoom(RoomRequestDto roomRequestDto) throws RoomDeleteException {
        Room room = roomRepository.findById(roomRequestDto.getId());

        /*** 유효성 검사 ***/
        if (room == null) throw new RoomDeleteException();
        if(0 < room.getPlayers().size()) {  // 방에 아직 인원이 있을 경우
            throw new RoomDeleteException();
        }

        try {
            roomRepository.delete(room);

            return;
        } catch (Exception e) {
            throw new RoomDeleteException();
        }

    }

    /* 혜지 : OpenVidu 관련 API 메소드 추가 */

//    /**
//     * @param params The Session properties
//     * @return The Session ID
//     */
//    /* Session ID 발급 API -> RoomId로 활용 */
//    @PostMapping("/api/sessions")
//    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        System.out.println("OPENVIDU API CALL : initializeSession");
//        SessionProperties properties = new SessionProperties
//                .Builder()
//                .build();
//        Session session = openVidu.createSession(properties);
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
//    }
//    /*
//      RETURN VALUE EXAMPLE : "ses_JM9v0nfD1l"
//     */
//
//    /**
//     * @param sessionId The Session in which to create the Connection
//     * @param params    The Connection properties
//     * @return The Token associated to the Connection
//     */
//    /* 연결 Token 발급 API */
//    @PostMapping("/api/sessions/{sessionId}/connections")
//    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
//                                                   @RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        System.out.println("OPENVIDU API CALL : createConnection");
//        Session session = openVidu.getActiveSession(sessionId);
//        if (session == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        ConnectionProperties properties = new ConnectionProperties
//                .Builder()
//                .role(OpenViduRole.PUBLISHER)
//                .data("Player")
//                .build();
//        Connection connection = session.createConnection(properties);
//
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
//    }
//    /*
//    RETURN VALUE EXAMPLE : "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd"
//     */
}
