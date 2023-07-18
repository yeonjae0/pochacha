package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.MemberRequestDto;
import com.ssafy.oho.model.entity.mainDB.Member;
import com.ssafy.oho.model.entity.mainDB.Player;
import com.ssafy.oho.model.repository.mainDB.RoomRepository;
import com.ssafy.oho.util.jwt.JwtProvider;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    /* Member API 구현 후에 사용할 예정 */
    private final JwtProvider jwtProvider;

    private RoomService(RoomRepository roomRepository,JwtProvider jwtProvider){
        this.roomRepository=roomRepository;
        this.jwtProvider=jwtProvider;
    }

    /* 방 만들기 전까지는 String 타입의 메시지로 전달 */
    public String setRoom(MemberRequestDto memberRequestDto) {
        Player player=new Player();
        /*
        DB 연결 X, 예외 처리 X
         */
        return "ok";
    }
}
