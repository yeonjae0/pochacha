package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.request.RoomRequestDto;
import com.ssafy.oho.model.dto.response.LiarGameResponseDto;
import com.ssafy.oho.model.dto.response.LiarGameVoteDto;
import com.ssafy.oho.model.dto.response.MoleGameResponseDto;
import com.ssafy.oho.model.dto.response.MoleGameResultDto;
import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import com.ssafy.oho.model.repository.MinigameRepository;
import com.ssafy.oho.model.repository.RoomRepository;
import com.ssafy.oho.util.data.liargame.words.*;
import com.ssafy.oho.util.data.liargame.words.Objects;
import com.ssafy.oho.util.exception.GameGetException;
import com.ssafy.oho.util.exception.GameSetException;
import com.ssafy.oho.util.exception.PlayerGetException;
import com.ssafy.oho.util.exception.RoomGetException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import java.io.BufferedReader;
import java.io.InputStream;
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
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new RoomGetException());
            List<String> playerIdList=new ArrayList<>();

            for(Player player:room.getPlayers()){
                playerIdList.add(player.getId());
            }

            //멀티 게임이므로 2명 미만의 상태에서는 진행 불가
            if(playerIdList.size()<2){
                throw new GameSetException("라이어 게임은 두명 이상이어야 해요");
            }

            //게임 진행 턴(순서) 임의로 배정
            Collections.shuffle(playerIdList);

            String subject=((String) payload.getOrDefault("subject", "")).trim();

            String word="";
            if(subject.equals("animal")){ word= Animal.getRandomValue(); }
            else if(subject.equals("country")){ word= Country.getRandomValue(); }
            else if(subject.equals("food")){ word= Food.getRandomValue(); }
            else if(subject.equals("objects")){ word= Objects.getRandomValue(); }
            else if(subject.equals("singer")){ word= Singer.getRandomValue(); }
            else if(subject.equals("sports")) { word = Sports.getRandomValue(); }
            else{ throw new GameSetException("단어 생성에 문제가 있어요"); }

            Random random = new Random();
            int liarCnt=random.nextInt(room.getPlayers().size());

            /*** Redis Input ***/
            super.setLiarGame(roomId, playerIdList.get(liarCnt), 0, playerIdList, word);

            /*** Response DTO Build ***/
            LiarGameResponseDto liarGameResponseDto= LiarGameResponseDto.builder()
                    .liar(playerIdList.get(liarCnt))
                    .word(word)//저장x
                    .turns(playerIdList)//저장x
                    .build();

            return liarGameResponseDto;
        }
        catch(Exception e){
            throw new GameSetException();
        }
    }

    public LiarGameResponseDto voteLiar(Map<String, Object> payload, String roomId) throws GameGetException {
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new RoomGetException());

            String playerId=((String) payload.getOrDefault("playerId", "")).trim();
            String vote=((String) payload.getOrDefault("vote", "")).trim();

            if(playerId==null||vote==null){
                throw new PlayerGetException("접속 정보를 확인해주세요");
            }

            /*
                TO DO :: 해당 방에 존재하는 player인지 유효성 검사 필요
             */

            int total = Integer.parseInt(super.getLiarGameInfo(roomId, "total"));
            total++;

            List<LiarGameVoteDto> voteList=new ArrayList<>();
            for(Player player:room.getPlayers()){
                String id=player.getId();
                int cnt=Integer.parseInt(super.getLiarGameVoteList(roomId,id));

                if(vote.equals(id)){
                    //득표자일 경우
                    cnt++;
                }
                voteList.add(new LiarGameVoteDto(id,cnt));
            }

            /*
                CONFIRM :: 이미 투표했던 사람이면 예외처리 (프론트엔드 완료)
             */

            //내림차순 정렬 후 동점자 확인
            boolean tiebreak=false;
            List<String> tiebreaker=new ArrayList<>();

            Collections.sort(voteList);

            int max=voteList.get(0).getCnt();
            tiebreaker.add(voteList.get(0).getPlayerId());

            for(int i=1;i<voteList.size();i++){
                if(max==voteList.get(i).getCnt()){
                    tiebreak=true;
                    tiebreaker.add(voteList.get(i).getPlayerId());
                }
            }

            /* total 체크 : 재투표 시 reset */
            String liar=super.getLiarGameInfo(roomId,"liar");
            String word=super.getLiarGameInfo(roomId,"word");


            /*** Redis Input ***/
            super.setLiarGameVoteList(roomId, total, voteList);

            /*** Response DTO Build ***/
            LiarGameResponseDto liarGameResponseDto;
            if(tiebreak==true){
                liarGameResponseDto=LiarGameResponseDto.builder()
                        .total(total)
                        .tiebreak(true)
                        .tiebreaker(tiebreaker)
                        .build();
            }
            else{
                boolean winner=true;
                if(voteList.get(0).getPlayerId().equals(liar)){
                    winner=false;
                }

                liarGameResponseDto=LiarGameResponseDto.builder()
                        .total(total)
                        .tiebreak(false)
                        .winner(winner)
                        .word(word)
                        .liar(liar)
                        .build();
            }

            if(total==4){
                List<String> playerIdList=new ArrayList<>();
                for(Player player:room.getPlayers()){
                    playerIdList.add(player.getId());//투표 시에 순서 고려할 필요 없음
                }

                super.setLiarGame(roomId, liar, 0, playerIdList, word);
            }

            return liarGameResponseDto;
        }
        catch(Exception e){
            throw new GameGetException();
        }
    }

    String[] wordUnit = {
            "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
            "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
            "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
            "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    };
    String[] randWord = {
            "ㅅㄱ", "ㄱㄱ", "ㄱㅂ", "ㅂㅅ", "ㅇㅇ",
            "ㅂㅂ", "ㅌㄱ", "ㅇㅊ", "ㅅㅂ", "ㄱㅈ"
    };

    @Value("${SPELL_KEY}")
    private String SPELL_KEY;

    @Value("${SPELL_URL}")
    private String SPELL_URL;

    public HashMap<String, Object> setSpell(@RequestBody RoomRequestDto roomRequestDto) throws GameGetException {
        HashMap<String, Object> responsePayload = new HashMap<>();
        String firstWord, secondWord;

        // room 유효성 검사
        if (roomRequestDto == null || roomRequestDto.getId() == null) throw new GameGetException();
        Room room = roomRepository.findById(roomRequestDto.getId()).orElseThrow(() -> new GameGetException());

        if(super.getSpell(roomRequestDto.getId()) == null) {
            String correctWord = randWord[(int) Math.floor(Math.random() * randWord.length)];
            firstWord = Character.toString(correctWord.charAt(0));
            secondWord = Character.toString(correctWord.charAt(1));

            List<String> playerIdList = new ArrayList<>();
            for (Player p : room.getPlayers()) {
                playerIdList.add(p.getId());
            }

            Collections.shuffle(playerIdList);  // 무작위 섞기

            /*** Redis Input ***/
            super.setSpell(room.getId(), firstWord, secondWord, playerIdList);
        }
        int index = Integer.parseInt(super.getSpellInfo(room.getId(), "index"));
        responsePayload.put("firstWord", super.getSpellInfo(room.getId(), "firstWord"));
        responsePayload.put("secondWord", super.getSpellInfo(room.getId(), "secondWord"));
        responsePayload.put("currentPlayerId", super.getSpellInfo(room.getId(), "player" + index));  // 현 순서의 플레이어
        responsePayload.put("index", super.getSpellInfo(room.getId(), "index"));  // 현 순서의 플레이어

        /*** Response DTO Build ***/
        return responsePayload;
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
            confirmMap.put("inputWord", word);  // Input word

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

//            System.setProperty("https.protocols", "TLSv1.2");

//            SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
//            sslContext.init(null, null, null);
//            SSLSocketFactory socketFactory = sslContext.getSocketFactory();

            /*** 사전 등재 단어 찾기 시작 ***/
            String urlStr = SPELL_URL + "?key=" + SPELL_KEY + "&type_search=search&part=word&q=" + URLEncoder.encode(word);
            System.out.println("urlStr: " + urlStr);

            URL url = new URL(urlStr);
            System.out.println("url: " + url);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            System.out.println("conn: " + conn.toString());

            // 만약 SSLContext를 사용하여 커스텀 SSL 설정을 하려면 아래와 같이 설정 가능
//             ((HttpsURLConnection) conn).setSSLSocketFactory(socketFactory);

            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            conn.setDoOutput(true);

            // 서버로부터 데이터 읽어오기
            InputStream inputStream = conn.getInputStream();

            System.out.println("inputStream: " + inputStream.toString());

            BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
            String line = null;
            for (int i = 0; i <= 8; i++) {
                line = br.readLine();
                System.out.println("iter " + i + " line: " + line);
            }
            int wordNum = line.substring(8).charAt(0) - '0';
            if(wordNum == 0) {
                confirmMap.put("msg", "사전에 등재되지 않은 단어입니다.");
                return confirmMap;
            }
            /*** 사전 등재 단어 찾기 종료 ***/

            confirmMap.put("correct", true);
            confirmMap.put("msg", "정답입니다!");

            int index = Integer.parseInt(super.getSpellInfo(roomId, "index"));
            index = (index + 1) % 4;

            HashMap<String, String> hash = new HashMap<>();
            hash.put("index", Integer.toString(index));
            super.setSpellInfo(roomId, hash);  // 순서 다시 설정

            confirmMap.put("currentPlayerId", super.getSpellInfo(roomId, "player" + index));

            return confirmMap;
        } catch(Exception e) {
            throw new GameGetException("훈민정음 조회에 실패하였습니다.");
        }
    }

    public MoleGameResponseDto getMoleGameResult(Map<String, Object> payload, String roomId) throws GameGetException {
        try {
            String playerId = (String) payload.get("playerId");
            int score = (Integer) payload.get("score");

            Room room = roomRepository.findById(roomId).orElseThrow(RoomGetException::new);

            /*** Redis Input ***/
            super.setMoleGameResult(roomId,playerId,score);

            /*** Redis Output ***/
            Map<Object,Object> map=super.getMoleGame(roomId);
            List<MoleGameResultDto> result=new ArrayList<>();
            for(Object key:map.keySet()){
                String id=key.toString();
                int tempScore=Integer.parseInt(map.get(key).toString());
                result.add(new MoleGameResultDto(id,tempScore));
            }
            Collections.sort(result);
            MoleGameResponseDto moleGameResponseDto=null;
            System.out.println(result.size());
            if(result.size()==4){
                moleGameResponseDto=MoleGameResponseDto.builder().finish(true).result(result).build();
            }
            else{
                moleGameResponseDto=MoleGameResponseDto.builder().finish(false).result(result).build();
            }

            return moleGameResponseDto;
        }catch (Exception e){
            throw new GameGetException("두더지 잡기 결과 조회에 실패했습니다.");
        }

    }
}
