package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.entity.mainDB.Player;
import com.ssafy.oho.model.entity.mainDB.Room;
import com.ssafy.oho.model.repository.mainDB.PlayerRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    private PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }
    public void/*PlayerResponseDto*/ setHead(PlayerRequestDto playerRequestDto, RoomResponseDto roomResponseDto) {
        Player player = new Player();
        /*
         회원 여부 구분 (구현 X)
         login 과정 후 이미 닉네임 값이 들어가 있을 것
         => 굳이 방장 설정에서 닉네임 삽입을 안 해줘도 됨? (추후 front와 상의)
        */

//        String memberId = playerRequestDto.getMemberId();
//        if(memberId != null && !memberId.trim().equals("")) {
//            Member member = memberService.getMemberById(memberId);
//            player.setNickname(member.getNickname());
//        } else {
//            player.setNickname(player.getNickname());
//        }

        // 닉네임 입력 시 설정, 미입력시 default
        if(playerRequestDto.getNickname() != null && !playerRequestDto.getNickname().trim().equals("")) {
            player.setNickname(playerRequestDto.getNickname());
        } else {
            /*
                TO DO :: 랜덤 닉네임 생성
             */
            player.setNickname(RandomStringUtils.random(8, true, true));
        }
        player.setHead(true);

        Room room = new Room();
        room.setId(roomResponseDto.getId());
        room.setName(roomResponseDto.getName());
        room.setSecret(room.isSecret());
        room.setProgress(room.isProgress());

        player.setRoom(room);

        playerRepository.save(player);

        // PlayerResponseDto 추가?
    }
}
