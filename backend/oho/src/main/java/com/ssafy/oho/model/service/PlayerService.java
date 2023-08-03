package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.dto.response.RoomResponseDto;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.PlayerRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.exception.PlayerDeleteException;
import com.ssafy.oho.util.exception.PlayerGetException;
import com.ssafy.oho.util.exception.PlayerSetException;
import com.ssafy.oho.util.exception.PlayerUpdateException;
import io.openvidu.java.client.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    public PlayerResponseDto setHead(PlayerRequestDto playerRequestDto, String roomId, OpenVidu openVidu) throws PlayerSetException {
        System.out.println("PLAYER SERVECE: SET HEAD");
        try {
            PlayerResponseDto playerResponseDto = setPlayer(playerRequestDto, roomId, openVidu);
            Player head = playerRepository.findById(playerResponseDto.getId());

            /*** Entity Build ***/
            head = Player.builder()
                    .id(head.getId())
                    .nickname(head.getNickname())
                    .room(head.getRoom())
                    .head(true)
                    .ready(head.isReady())
                    .token(head.getToken())
                    .build();

            playerRepository.save(head);

            /*** Response DTO Build ***/
            playerResponseDto = PlayerResponseDto.builder()
                    .id(head.getId())
                    .nickname(head.getNickname())
                    .head(head.isHead())
                    .ready(head.isReady())
                    .token(head.getToken())
                    .build();

            return playerResponseDto;
        } catch (Exception e) {
            throw new PlayerSetException();
        }
    }
    public PlayerResponseDto setPlayer(PlayerRequestDto playerRequestDto, String roomId, OpenVidu openVidu) throws PlayerSetException {
        System.out.println("PLAYER SERVICE: SET PLAYER");
        try {
            Room room = roomRepository.findById(roomId);
            // 방이 존재하지 않을 경우
            // 플레이어가 4명 이상인 경우
            // (확인 필요) 게임이 이미 시작된 경우
            if (room == null || 4 <= playerRepository.countByRoom(room) /*|| room.isProgress()*/) {
                throw new PlayerSetException();
            }

            // 닉네임 입력 시 해당 닉네임, 미입력시 랜덤 닉네임 생성
            String nickname = "";
            if (playerRequestDto.getNickname() == null && playerRequestDto.getNickname().trim().equals("")) {  // 닉네임 없을 경우
                nickname = playerRequestDto.getNickname();
            } else {  // 닉네임 없을 경우
                nickname = randAdj[new Random().nextInt(randAdj.length)] +
                        randNoun[new Random().nextInt(randNoun.length)] +
                        new Random().nextInt(10000);  // 랜덤 닉네임 생성
            }

            /* 혜지 : OpenVidu Token 발급 */

            Session session = openVidu.getActiveSession(roomId);
            if (session == null) {
                throw new PlayerSetException();
            }
            ConnectionProperties properties = new ConnectionProperties
                    .Builder()
                    .role(OpenViduRole.PUBLISHER)
                    .data("Player")
                    .build();
            Connection connection = session.createConnection(properties);
            String token=connection.getToken();//VALUE EXAMPLE : "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd"

            /*** Entity Build ***/
            Player player = Player.builder()
                    .room(room)
                    .nickname(nickname)
                    .head(false)
                    .token(token)
                    .build();

            playerRepository.save(player);

            /*** Response DTO Build ***/
            PlayerResponseDto playerResponseDto = PlayerResponseDto.builder()
                    .id(player.getId())
                    .nickname(player.getNickname())
                    .head(player.isHead())
                    .ready(player.isReady())
                    .token(player.getToken())
                    .build();

            return playerResponseDto;
        } catch (Exception e) {//OpenViduJavaClientException, OpenViduHttpException, ...
            throw new PlayerSetException();
        }
    }

    public PlayerResponseDto getPlayer(PlayerRequestDto playerRequestDto) throws PlayerGetException {
        try {
            Player player = playerRepository.findById(playerRequestDto.getId());

            /*** Response DTO Build ***/
            PlayerResponseDto playerResponseDto = PlayerResponseDto.builder()
                    .id(player.getId())
                    .nickname(player.getNickname())
                    .head(player.isHead())
                    .ready(player.isReady())
                    .token(player.getToken())
                    .build();

            return playerResponseDto;
        } catch(Exception e) {
            System.out.println(e.getMessage());
            throw new PlayerGetException();
        }
    }

    public List<PlayerResponseDto> getPlayersByRoomId(PlayerRequestDto playerRequestDto, String roomId) throws PlayerGetException {

        try {
            /*** 유효성 검사 ***/
            // 현재 방의 플레이어 존재 확인
            Player player = playerRepository.findById(playerRequestDto.getId());
            if(player == null || player.getId() <= 0 || !player.getRoom().getId().equals(roomId)){
                throw new PlayerGetException();
            }

            // 방 유효성 확인
            Room room = roomRepository.findById(roomId);
            if(room == null || room.getId().trim().equals("")){
                throw new PlayerGetException();
            }

            List<Player> playerList = roomRepository.findById(roomId).getPlayers();
            List<PlayerResponseDto> playerResponseDtoList = new ArrayList<>();

            for(Player p : playerList) {
                /*** Response DTO Builder ***/
                playerResponseDtoList.add(PlayerResponseDto.builder()
                        .id(p.getId())
                        .nickname(p.getNickname())
                        .head(p.isHead())
                        .ready(p.isReady())
                        .token(p.getToken())
                        .build()
                );
            }

            return playerResponseDtoList;

        } catch(Exception e) {
            e.printStackTrace();
            throw new PlayerGetException();
        }
    }

    public PlayerResponseDto updatePlayer(Map<String, Object> payload, String roomId) throws PlayerUpdateException {

        try {
            /*** 유효성 검사 ***/
            // 플레이어 존재 확인
            Player player = playerRepository.findById((Long) payload.get("id"));
            if (player == null || player.getId() <= 0 || !player.getRoom().getId().equals(roomId)) {
                throw new PlayerUpdateException();
            }
            String nickname = (payload.containsKey("nickname")) ? (String) payload.get("nickname") : player.getNickname();
            boolean ready = (payload.containsKey("ready")) ? (boolean) payload.get("ready") : player.isReady();

            /*
                TO DO :: 추후 Redis 임시 데이터로 수정 예정
             */
            /*** Entity Build ***/
            player = Player.builder()
                    .id(player.getId())
                    .nickname(nickname)
                    .head(player.isHead())
                    .ready(ready)
                    .token(player.getToken())
                    .build();
            playerRepository.save(player);

            /*** Response DTO Build ***/
            PlayerResponseDto playerResponseDto = PlayerResponseDto.builder()
                    .id(player.getId())
                    .nickname(player.getNickname())
                    .head(player.isHead())
                    .ready(player.isReady())
                    .token(player.getToken())
                    .build();

            return playerResponseDto;
        } catch(Exception e) {
            throw new PlayerUpdateException();
        }
    }

    public void deletePlayer(PlayerRequestDto playerRequestDto) throws PlayerDeleteException {
        try {
            /*
                TO DO :: 본인인지 확인하는 로직 필요
             */
            playerRepository.deleteById(playerRequestDto.getId());

            return;
        } catch(Exception e) {
            throw new PlayerDeleteException();
        }
    }
}
