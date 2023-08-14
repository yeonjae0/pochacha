package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.dto.response.PlayerResponseDto;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.PlayerRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.exception.PlayerDeleteException;
import com.ssafy.oho.util.exception.PlayerGetException;
import com.ssafy.oho.util.exception.PlayerSetException;
import com.ssafy.oho.util.exception.PlayerUpdateException;
import io.openvidu.java.client.*;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PlayerService extends RedisService {
    private final PlayerRepository playerRepository;
    private final RoomRepository roomRepository;
    private final String[] randAdj = {"풍부한", "어지러운", "미세한", "혁신적인", "진실의", "통통한", "믿을만한", "혼란스러운",
            "낙천적인", "심각한", "매력적인", "냉동의", "아픈", "겁먹은", "지루한", "행복한", "슬픈", "실망한", "멋진", "죄책감느끼는",
            "자신있는", "정확한", "미끄러운", "흠뻑젖은", "감염된", "공감하는", "다가오는", "생각없는", "불합리한"}; // 형용사 모음
    private final String[] randNoun = {"연제정", "김태훈", "배희진", "김연재", "유영", "임혜지"/*, "이현석", "성유지", "최웅렬"*/}; // 명사 모음

    private PlayerService(StringRedisTemplate redisTemplate, PlayerRepository playerRepository, RoomRepository roomRepository) {
        super(redisTemplate);
        this.playerRepository = playerRepository;
        this.roomRepository = roomRepository;
    }

    public PlayerResponseDto setHead(PlayerRequestDto playerRequestDto, String roomId, OpenVidu openVidu) throws PlayerSetException {
        try {
            PlayerResponseDto headResponseDto = setPlayer(playerRequestDto, roomId, openVidu);
            Player head = playerRepository.findById(headResponseDto.getId()).orElseThrow(PlayerSetException::new);

            /*** Entity Build ***/
            head = Player.builder()
                    .id(head.getId())
                    .nickname(head.getNickname())
                    .room(head.getRoom())
                    .head(true)
                    .build();

            playerRepository.save(head);

            /*** Redis Input ***/
            Map<String, String> hash = new HashMap<>() {{ put("head", "true"); put("ready", "true"); }};
            super.setPlayerInfo(roomId, head.getId(), hash);

            /*** Response DTO Build ***/
            headResponseDto = PlayerResponseDto.builder()
                    .id(head.getId())
                    .nickname(head.getNickname())
                    .head(head.isHead())
                    .ready(true)
                    .build();

            return headResponseDto;
        } catch (Exception e) {
            throw new PlayerSetException();
        }
    }
    public PlayerResponseDto setPlayer(PlayerRequestDto playerRequestDto, String roomId, OpenVidu openVidu) throws PlayerSetException {
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(PlayerSetException::new);
            // 방이 존재하지 않을 경우, 플레이어가 4명 이상인 경우, 게임이 이미 시작된 경우
            if (room == null ||(room.getPlayers() != null && 4 <= room.getPlayers().size()) || room.isProgress()) {
                throw new PlayerSetException("해당 방에 접속할 수 없습니다.");
            }

            // 닉네임 입력 시 해당 닉네임, 미입력시 랜덤 닉네임 생성
            String nickname = "";
            if (playerRequestDto.getNickname() != null && !playerRequestDto.getNickname().trim().equals("")) {  // 닉네임 없을 경우
                nickname = playerRequestDto.getNickname();
            } else {  // 닉네임 없을 경우
                nickname = randAdj[new Random().nextInt(randAdj.length)] +
                        randNoun[new Random().nextInt(randNoun.length)] +
                        (new Random().nextInt(8999) + 1000);  // 랜덤 닉네임 생성 알고리즘
            }

            /* 혜지 : OpenVidu Token 발급 */
            Session session = openVidu.getActiveSession(roomId);
            if (session == null) {
                throw new PlayerSetException();
            }
            ConnectionProperties properties = new ConnectionProperties
                    .Builder()
                    .role(OpenViduRole.PUBLISHER)
                    .data(nickname) /* 혜지: data로 nickname 실어 보내기 */
                    .build();
            Connection connection = session.createConnection(properties);
            String token = connection.getToken();  // VALUE EXAMPLE : "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd"
            String[] tokenUnit = token.split("=");
            String tokenParam = tokenUnit[tokenUnit.length - 1];

            /*** Entity Build ***/
            Player player = Player.builder()
                    .id(token)
                    .room(room)
                    .nickname(nickname)
                    .head(false)
                    .build();

            playerRepository.save(player);
            super.setPlayer(roomId, player);

            /*** Response DTO Build ***/
            return PlayerResponseDto.builder()
                    .id(player.getId())
                    .nickname(player.getNickname())
                    .head(player.isHead())
                    .ready(Boolean.parseBoolean(super.getPlayerInfo(roomId, player.getId(), "ready")))
                    .build();
        } catch (Exception e) {  // OpenViduJavaClientException, OpenViduHttpException, ...
            e.printStackTrace();
            throw new PlayerSetException();
        }
    }

    public PlayerResponseDto getPlayer(PlayerRequestDto playerRequestDto) throws PlayerGetException {
        try {
            Player player = playerRepository.findById(playerRequestDto.getId()).orElseThrow(()-> new PlayerGetException());

            /*** Response DTO Build ***/
            return PlayerResponseDto.builder()
                    .id(player.getId())
                    .nickname(player.getNickname())
                    .head(player.isHead())
                    .ready(Boolean.parseBoolean(super.getPlayerInfo(playerRequestDto.getRoomId(), player.getId(), "ready")))
                    .build();
        } catch(Exception e) {
            throw new PlayerGetException();
        }
    }

    public List<PlayerResponseDto> getPlayersByRoomId(PlayerRequestDto playerRequestDto, String roomId) throws PlayerGetException {

        try {
            Player player;
            String playerId = playerRequestDto.getId();

            /*** 유효성 검사 ***/
            // 현재 방의 플레이어 존재 확인
            if(!playerRepository.existsById(playerId) && super.getPlayer(roomId, playerId) != null) {
                player = Player.builder()
                        .id(playerId)
                        .nickname(super.getPlayerInfo(roomId, playerId, "nickname"))
                        .room(roomRepository.findById(roomId).orElseThrow(PlayerGetException::new))
                        .head(playerRequestDto.isHead())
                        .build();
                playerRepository.save(player);
            } else {
                player = playerRepository.findById(playerId).orElseThrow(PlayerGetException::new);
            }
            System.out.println(player);

            if(player == null || !player.getRoom().getId().equals(roomId)) {
                throw new PlayerGetException("플레이어가 존재하지 않습니다.");
            }

            // 방 유효성 확인
            Room room = roomRepository.findById(roomId).orElseThrow(PlayerGetException::new);
            if(room == null || room.getId().trim().equals("")){
                throw new PlayerGetException("해당 방이 존재하지 않습니다.");
            }

            List<Player> playerList = room.getPlayers();
            List<PlayerResponseDto> playerResponseDtoList = new ArrayList<>();

            for(Player p : playerList) {
                if(super.getPlayer(roomId, p.getId()) == null) {
                    super.setPlayer(roomId, p);
                }

                /*** Response DTO Builder ***/
                playerResponseDtoList.add(PlayerResponseDto.builder()
                        .id(p.getId())
                        .nickname(p.getNickname())
                        .head(p.isHead())
                        .build()
                );
            }

            return playerResponseDtoList;

        } catch(Exception e) {
            throw new PlayerGetException();
        }
    }

    public PlayerResponseDto updatePlayer(Map<String, Object> payload, String roomId) throws PlayerUpdateException {
        try {
            /*** 유효성 검사 ***/
            // 플레이어 존재 확인
            if(!payload.containsKey("playerId")) {
                throw new PlayerUpdateException();
            }

            String playerId = (String) payload.get("playerId");
            // Redis 저장 확인
            if (super.getPlayer(roomId, playerId) == null) {
                // Redis에도 DB에도 없을 시 Exception
                if(!playerRepository.existsById(playerId)) {
                    throw new PlayerUpdateException();
                }

                // DB엔 있으나 Redis에 없을 시 Redis에 저장
                super.setPlayer(roomId, playerRepository.findById(playerId).orElseThrow(()-> new PlayerUpdateException()));
            }

            /*** Redis Input ***/
            Map<String, String> hash = new HashMap<>();
//            if(payload.containsKey("head")) {  // Head 상태 변경
//                hash.put("head", Boolean.toString((boolean) payload.get("head")));
//            }
//            if(payload.containsKey("ready")) {  // Ready 상태 변경
//                hash.put("ready", Boolean.toString((boolean) payload.get("ready")));
//            }
            boolean ready = Boolean.parseBoolean(super.getPlayerInfo(roomId, playerId, "ready"));

            hash.put("ready", Boolean.toString(!ready));
            super.setPlayerInfo(roomId, playerId, hash);

            /*** Response DTO Build ***/
            return PlayerResponseDto.builder()
                    .id(playerId)
                    .ready(Boolean.parseBoolean(super.getPlayerInfo(roomId, playerId, "ready")))
                    .build();
        } catch(Exception e) {
            throw new PlayerUpdateException();
        }
    }

    public PlayerResponseDto deletePlayer(Map<String, Object> payload, String roomId) throws PlayerDeleteException {
        // 플레이어 존재 확인
        if(!payload.containsKey("playerId")) {
            throw new PlayerDeleteException("플레이어 아이디가 존재하지 않습니다.");
        }

        String playerId = (String) payload.get("playerId");
        if(!playerRepository.existsById(playerId)) {  // DB에 플레이어 없을 시 Exception
            throw new PlayerDeleteException();
        }
        try {
            playerRepository.deleteById(playerId);  // DB 삭제

            return PlayerResponseDto.builder()
                    .id(playerId)
                    .build();
        } catch(Exception e) {
            throw new PlayerDeleteException();
        }
    }
}
