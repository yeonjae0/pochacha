package com.ssafy.oho.model.service;

import com.ssafy.oho.model.dto.response.CellResponseDto;
import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.entity.Player;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.List;

public class RedisService {
    private final StringRedisTemplate redisTemplate;
    protected HashOperations<String, Object, Object> hashOperations = null;  // Redis 데이터 담을 변수

    public RedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;

        // Redis 데이터와 연결
        this.hashOperations = this.redisTemplate.opsForHash();
    }

    /*** 플레이어 정보 삽입 ***/
    protected String getPlayerListKey(String roomId, String playerId) {
        StringBuilder sb = new StringBuilder();
        sb.append(roomId).append(".player.").append(playerId);

        return sb.toString();
    }
    protected void defaultPlayerRedis(String roomId, Player player) {
        /*** Redis Input : 모든 데이터를 String으로 변경 ***/
        hashOperations.put(getPlayerListKey(roomId, player.getId()), "id", player.getId());
        hashOperations.put(getPlayerListKey(roomId, player.getId()), "nickname", player.getNickname());
        hashOperations.put(getPlayerListKey(roomId, player.getId()), "head", Boolean.toString(player.isHead()));
        hashOperations.put(getPlayerListKey(roomId, player.getId()), "ready", "false");
    }

    /*** 게임 정보 삽입 ***/
    protected String getGameKey(String roomId) {
        StringBuilder sb = new StringBuilder();
        sb.append(roomId).append(".game");

        return sb.toString();
    }
    protected void defaultGameRedis(String roomId, List<Player> playerList) {
        /*** Redis Input : 모든 데이터를 String으로 변경 ***/
        hashOperations.put(getGameKey(roomId), "id", roomId);
        hashOperations.put(getGameKey(roomId), "progress", Boolean.toString(false));
        hashOperations.put(getGameKey(roomId), "pin", "0");
        hashOperations.put(getGameKey(roomId), "lab", "0");

        // 플레이어 ID만 삽입 (순서를 위해)
        hashOperations.put(getGameKey(roomId), "player1", playerList.get(0).getId());
        hashOperations.put(getGameKey(roomId), "player2", playerList.get(1).getId());
        hashOperations.put(getGameKey(roomId), "player3", playerList.get(2).getId());
        hashOperations.put(getGameKey(roomId), "player4", playerList.get(3).getId());
    }

    /*** 칸 정보 삽입 ***/
    protected String getCellListKey(String roomId, int index) {
        StringBuilder sb = new StringBuilder();
        sb.append(roomId).append(".cell.").append(index);

        return sb.toString();
    }
    protected void defaultCellRedis(Cell cell, String roomId, int index) {
        boolean turn = false;
        int move = 0;
        // 이벤트인 경우
        if(cell.getStatus() == 'E') {
            // 턴제 확인
            if (cell.getName().contains("한 턴") || cell.getName().contains("한턴")) turn = true;

            // 이동 확인
            else if (cell.getName().contains("한 칸 앞")) move = 1;
            else if (cell.getName().contains("한 칸 뒤")) move = 2;
            else if (cell.getName().contains("두 칸 앞")) move = -1;
            else if (cell.getName().contains("두 칸 뒤")) move = -2;
        }

        /*** Redis Input : 모든 데이터를 String으로 변경 ***/
        hashOperations.put(getCellListKey(roomId, index), "name", cell.getName());
        hashOperations.put(getCellListKey(roomId, index), "status", Character.toString(cell.getStatus()));
        hashOperations.put(getCellListKey(roomId, index), "turn", Boolean.toString(turn));
        hashOperations.put(getCellListKey(roomId, index), "move", Integer.toString(move));
        hashOperations.put(getCellListKey(roomId, index), "time", Integer.toString(cell.getTime()));
    }
    protected void defaultMinigameRedis(Minigame minigame, String roomId, int index) {
        /*** Redis Input : 모든 데이터를 String으로 변경 ***/
        hashOperations.put(getCellListKey(roomId, index), "name", minigame.getName());
        hashOperations.put(getCellListKey(roomId, index), "status", "M");
        hashOperations.put(getCellListKey(roomId, index), "time", Integer.toString(minigame.getTime()));
    }

    protected String getKrWordKey(String roomId) {
        StringBuilder sb = new StringBuilder();
        sb.append(roomId).append(".game.krword");

        return sb.toString();
    }
    protected void defaultKrWordRedis(String roomId, String firstWord, String secondWord, List<String> playerIdList) {
        /*** Redis Input : 모든 데이터를 String으로 변경 ***/
        hashOperations.put(getKrWordKey(roomId), "firstWord", firstWord);
        hashOperations.put(getKrWordKey(roomId), "secondWord", secondWord);
        hashOperations.put(getKrWordKey(roomId), "player1", playerIdList.get(0));
        hashOperations.put(getKrWordKey(roomId), "player2", playerIdList.get(1));
        hashOperations.put(getKrWordKey(roomId), "player3", playerIdList.get(2));
        hashOperations.put(getKrWordKey(roomId), "player4", playerIdList.get(3));

    }
}
