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

import java.util.Random;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final RoomRepository roomRepository;
    private final String[] randAdj = {"풍부한", "어지러운", "미세한", "혁신적인", "진실의", "통통한", "믿을만한", "혼란스러운",
            "낙천적인", "심각한", "매력적인", "냉동의", "아픈", "겁먹은", "지루한", "행복한", "슬픈", "실망한", "멋진", "죄책감느끼는",
            "자신있는", "정확한", "미끄러운", "흠뻑젖은", "감염된", "공감하는", "다가오는", "생각없는", "불합리한"}; // 형용사 모음
    private final String[] randNoun = {"연제정", "김태훈", "배희진", "김연재", "유영", "임혜지", "이현석", "성유지", "최웅렬"}; // 명사 모음

    private PlayerService(PlayerRepository playerRepository, RoomRepository roomRepository) {
        this.playerRepository = playerRepository;
        this.roomRepository = roomRepository;
    }
    public PlayerResponseDto setHead(PlayerRequestDto playerRequestDto, RoomResponseDto roomResponseDto) throws PlayerSetException {
        PlayerResponseDto playerResponseDto = setPlayer(playerRequestDto, roomResponseDto);
        Player head = playerRepository.findById(playerResponseDto.getId());
        head.setHead(true);
        playerRepository.save(head);

        playerResponseDto.setHead(true);
        return playerResponseDto;
    }
    public PlayerResponseDto setPlayer(PlayerRequestDto playerRequestDto, RoomResponseDto roomResponseDto) throws PlayerSetException {
        Player player = new Player();
        PlayerResponseDto playerResponseDto = new PlayerResponseDto();

        Room room = roomRepository.findById(roomResponseDto.getId());
        if(4 <= playerRepository.countByRoom(room)) {  // 인원이 4명을 넘을 경우
            throw new PlayerSetException();
        }
        player.setRoom(room);

        // 닉네임 입력 시 해당 닉네임, 미입력시 랜덤 닉네임 생성
        if(playerRequestDto.getNickname() != null && !playerRequestDto.getNickname().trim().equals("")) {  // 닉네임 있을 경우
            /* CONFIRM :: Builder 사용 확인 시 변경 */
            player.setNickname(playerRequestDto.getNickname());
        } else {  // 닉네임 없을 경우
            /* CONFIRM :: Builder 사용 확인 시 변경 */
            player.setNickname(
                    randAdj[new Random().nextInt(randAdj.length)] +
                            randNoun[new Random().nextInt(randNoun.length)] +
                            new Random().nextInt(10000));
        }
        player.setHead(false);

        playerRepository.save(player);

        /* CONFIRM :: Builder 사용 확인 시 변경 */
        playerResponseDto.setId(player.getId());
        playerResponseDto.setNickname(player.getNickname());
        playerResponseDto.setRoomId(player.getRoom().getId());
        playerResponseDto.setHead(player.isHead());
        playerResponseDto.setReady(player.isReady());

        return playerResponseDto;
    }

    public PlayerResponseDto getPlayer(PlayerRequestDto playerRequestDto) {
        Player player = playerRepository.findById(playerRequestDto.getId());
        PlayerResponseDto playerResponseDto = new PlayerResponseDto();

        /* CONFIRM :: Builder 사용 확인 시 변경 */
        playerResponseDto.setId(player.getId());
        playerResponseDto.setNickname(player.getNickname());
        playerResponseDto.setRoomId(player.getRoom().getId());
        playerResponseDto.setHead(player.isHead());
        playerResponseDto.setReady(player.isReady());

        return playerResponseDto;
    }
}
