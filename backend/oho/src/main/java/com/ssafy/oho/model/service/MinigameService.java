package com.ssafy.oho.model.service;

import com.google.gson.JsonObject;
import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.data.liargame.words.*;
import com.ssafy.oho.util.data.liargame.words.Objects;
import com.ssafy.oho.util.exception.GameGetException;
import com.ssafy.oho.util.exception.GameSetException;
import com.ssafy.oho.util.exception.RoomGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

@Service
public class MinigameService extends RedisService {

    private final MinigameRepository minigameRepository;
    private final RoomRepository roomRepository;
    private final int MINIGAME_CNT = 4;

    @Autowired
    private MinigameService(StringRedisTemplate redisTemplate, MinigameRepository minigameRepository, RoomRepository roomRepository) {
        super(redisTemplate);
        this.minigameRepository = minigameRepository;
        this.roomRepository = roomRepository;
    }

    public LiarGameResponseDto setLiarGame(Map<String, Object> payload, String roomId) throws GameSetException {
        Map<String, Object> responsePayload = new HashMap<>();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new RoomGetException());
            List<String> playerIdList=new ArrayList<>();

            for(Player player:room.getPlayers()){
                playerIdList.add(player.getId());
            }

            //멀티 게임이므로 2명 미만의 상태에서는 진행 불가
            if(playerIdList.size()<2){
                throw new GameSetException();
            }

            //게임 진행 턴(순서) 임의로 배정
            Collections.shuffle(playerIdList);

            String subject = ((String) payload.getOrDefault("subject", "")).trim();

            /*
                CONFIRM :: 조건문을 바꿀 방법 찾기 (enum 데이터 저장 방식 변경)
                            그러나 우아한 형제들 블로그에서는 enum과 함께 아래처럼 사용
             */

            String word="";
            if(subject.equals("animal")){ word= Animal.getRandomValue(); }
            else if(subject.equals("country")){ word= Country.getRandomValue(); }
            else if(subject.equals("food")){ word= Food.getRandomValue(); }
            else if(subject.equals("objects")){ word= Objects.getRandomValue(); }
            else if(subject.equals("singer")){ word= Singer.getRandomValue(); }
            else if(subject.equals("sports")) { word = Sports.getRandomValue(); }
            else{ throw new GameSetException(); }

            /*** Response DTO Build ***/
            LiarGameResponseDto.builder()
                    .liar(playerIdList.get(0))
                    .word(word)
                    .turns(playerIdList)
                    .build();
        /*
            TO DO :: Redis에 roomId, liar, room, turns 저장
         */
            return new LiarGameResponseDto();
        }
        catch(Exception e){
            throw new GameSetException();
        }
    }

    /*
        TO DO :: 투표 득표수 집계 메소드 추가
     */
    String[] wordUnit = {
            "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
            "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
            "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
            "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    };
    String[] randWordUnit = {
            "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ",
            "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ",
            "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    };
    private final String SPELL_KEY = "461267C04AE2F8FD88F1327EC3533DA7";
    private static final String SPELL_URL = "https://krdict.korean.go.kr/api/search";
    public HashMap<String, Object> setSpell(@RequestBody RoomRequestDto roomRequestDto) throws GameGetException {
        String firstWord = randWordUnit[(int) Math.floor(Math.random() * randWordUnit.length)];
        String secondWord = randWordUnit[(int) Math.floor(Math.random() * randWordUnit.length)];

        if(roomRequestDto == null || roomRequestDto.getId() == null) throw new GameGetException();
        Room room = roomRepository.findById(roomRequestDto.getId()).orElseThrow(() -> new GameGetException());
        List<String> playerIdList = new ArrayList<>();
        for (Player p : room.getPlayers()) {
            playerIdList.add(p.getId());
        }

        Collections.shuffle(playerIdList);  // 무작위 섞기

        /*** Redis Input ***/
        super.setSpell(roomRequestDto.getId(), firstWord, secondWord, playerIdList);

        /*** Response DTO Build ***/
        return new HashMap<>() {{
            put("firstWord", firstWord);
            put("secondWord", secondWord);
            put("playerIdList", playerIdList);
        }};
    }
    public Map<String, Object> confirmSpell(Map<String, Object> payload, String roomId) throws GameGetException {
        try {
        /*
            TO DO :: 플레이어 올바른 순서 확인 로직 필요
         */
            // 데이터 Key : correct(Boolean), msg(String)
            Map<String, Object> confirmMap = new HashMap<>();
            confirmMap.put("correct", false);  // Default correct
            confirmMap.put("msg", "틀렸습니다.");  // Default msg

            String firstWord = super.getSpellInfo(roomId, "firstWord");
            String secondWord = super.getSpellInfo(roomId, "secondWord");

            String word = ((String) payload.getOrDefault("word", "")).trim();
            if (word.length() != 2) {  // 단어를 받지 못했을 경우, 단어 길이가 다를 경우
                confirmMap.put("msg", "단어의 길이를 확인해 주세요.");
                return confirmMap;
            }

            char inputFirstWord = word.charAt(0);
            char inputSecondWord = word.charAt(1);
            if (inputFirstWord < 0xAC00 && inputSecondWord < 0xAC00) {  // 한글을 입력하지 않았을 경우
                confirmMap.put("msg", "한영 전환을 확인해 주세요.");
                return confirmMap;
            }

            // 첫번재 단어 비교
            int inputFistUnitVal = inputFirstWord - 0xAC00;
            int inputFirstUnit = ((inputFistUnitVal - (inputFistUnitVal % 28)) / 28) / 21;

            int inputSecondUnitVal = inputSecondWord - 0xAC00;
            int inputSecondUnit = ((inputSecondUnitVal - (inputSecondUnitVal % 28)) / 28) / 21;

            if (!firstWord.equals(wordUnit[inputFirstUnit]) || !secondWord.equals(wordUnit[inputSecondUnit])) {
                return confirmMap;
            }

            /*** 사전 등재 단어 찾기 시작 ***/
            String urlStr = SPELL_URL + "?key=" + SPELL_KEY + "&type_search=search&part=word&q=" + URLEncoder.encode(word);
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            conn.setDoOutput(true);

            // 서버로부터 데이터 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = null;
            for (int i = 0; i <= 8; i++) {
                line = br.readLine();
            }
            int wordNum = line.substring(8).charAt(0) - '0';
            if(wordNum == 0) {
                confirmMap.put("msg", "사전에 등재되지 않은 단어입니다.");
                return confirmMap;

            }
            /*** 사전 등재 단어 찾기 종료 ***/

            confirmMap.put("correct", true);
            confirmMap.put("msg", "정답입니다!");

            return confirmMap;
        } catch(Exception e) {
            e.printStackTrace();
            throw new GameGetException("훈민정음 조회에 실패하였습니다.");
        }
    }
}
