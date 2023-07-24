package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.PlayerRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.exception.PlayerSetException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final RoomRepository roomRepository;

    private PlayerService(PlayerRepository playerRepository, RoomRepository roomRepository) {
        this.playerRepository = playerRepository;
        this.roomRepository = roomRepository;
    }
    public PlayerResponseDto setHead(PlayerRequestDto playerRequestDto, RoomResponseDto roomResponseDto) throws PlayerSetException {
        Player player = new Player();
        PlayerResponseDto playerResponseDto = new PlayerResponseDto();
        /*
         회원 여부 구분 (구현 X)
         login 과정 후 이미 닉네임 값이 들어가 있을 것
         => 굳이 방장 설정에서 닉네임 삽입을 안 해줘도 됨? (추후 front와 상의)
        */

        // 닉네임 입력 시 설정, 미입력시 default
        if(playerRequestDto.getNickname() != null && !playerRequestDto.getNickname().trim().equals("")) {
            /* CONFIRM :: Builder 사용 확인 시 변경 */
            player.setNickname(playerRequestDto.getNickname());
        } else {
            /*
                TO DO :: 랜덤 닉네임 생성
             */
            /* CONFIRM :: Builder 사용 확인 시 변경 */
            player.setNickname(
                    RandomStringUtils.random(4, true, true) + "-" +
                            RandomStringUtils.random(4, true, true) + "-" +
                            RandomStringUtils.random(4, true, true));
        }
        player.setHead(true);
        Room room = roomRepository.findById(roomResponseDto.getId());
        player.setRoom(room);

        playerRepository.save(player);

        playerResponseDto.setId(player.getId());
        playerResponseDto.setNickname(player.getNickname());
        playerResponseDto.setRoomId(player.getRoom().getId());
        playerResponseDto.setHead(player.isHead());
        playerResponseDto.setReady(player.isReady());
        playerResponseDto.setScore(player.getScore());

        return playerResponseDto;


        // PlayerResponseDto 추가?
    }
}
