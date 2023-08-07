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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    private RoomService(RoomRepository roomRepository){
        this.roomRepository=roomRepository;
    }

    public RoomResponseDto setRoom(PlayerRequestDto playerRequestDto, OpenVidu openVidu) throws RoomSetException {
        try {

            /* 혜지 : 방 Session ID 발급으로 변경 */
            String id;

//            do {
//                id = RandomStringUtils.random(12, true, true);
//            } while(roomRepository.existsById(id));

            SessionProperties properties = new SessionProperties
                    .Builder()
                    .build();
            Session session = openVidu.createSession(properties);

            id=session.getSessionId(); //VALUE EXAMPLE : "ses_JM9v0nfD1l"

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

        } catch(Exception e) { //OpenViduJavaClientException, OpenViduHttpException, ...
            //System.out.println(e.getMessage());
            throw new RoomSetException();
        }
    }

    public RoomResponseDto getRoom(RoomRequestDto roomRequestDto) throws RoomGetException {

        /*** 유효성 검사 ***/
        /* 
            TO DO :: 사용자가 현재 방에 존재하는 사람인지 검사
         */
        Room room = roomRepository.findById(roomRequestDto.getId()).orElseThrow(()->new RoomGetException());
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
        Room room = roomRepository.findById(roomRequestDto.getId()).orElseThrow(()->new RoomDeleteException());

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
}
