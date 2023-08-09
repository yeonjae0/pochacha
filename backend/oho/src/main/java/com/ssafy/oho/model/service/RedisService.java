package com.ssafy.oho.model.service;

import com.ssafy.oho.model.entity.Cell;
import com.ssafy.oho.model.entity.Minigame;
import com.ssafy.oho.model.entity.Player;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class RedisService {
    protected final StringRedisTemplate redisTemplate;
    protected HashOperations<String, Object, Object> hashOperations = null;  // Redis 데이터 담을 변수
    private final long TTL = 60;  // 임의 TTL 시간

    public RedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;

        // Redis 데이터와 연결
        this.hashOperations = this.redisTemplate.opsForHash();
    }

    /*** 플레이어 정보 ***/
    protected String getPlayerKey(String roomId, String playerId) {
        return roomId + "." + playerId;
    }
    protected void setPlayer(String roomId, Player player) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public <K, V> Object execute(RedisOperations<K, V> operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                hashOperations.put(getPlayerKey(roomId, player.getId()), "head", Boolean.toString(player.isHead()));
                hashOperations.put(getPlayerKey(roomId, player.getId()), "ready", Boolean.toString(false));
                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getPlayerKey(roomId, player.getId()), TTL, TimeUnit.SECONDS);
    }
    protected Map<Object, Object> getPlayer(String roomId, String playerId) {
        if(hashOperations.entries(getPlayerKey(roomId, playerId)).size() == 0) return null;
        return hashOperations.entries(getPlayerKey(roomId, playerId));
    }
    protected void deletePlayer(String roomId, String playerId) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public <K, V> Object execute(RedisOperations<K, V> operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                hashOperations.delete(getPlayerKey(roomId, playerId), "head");
                hashOperations.delete(getPlayerKey(roomId, playerId), "ready");
                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
    }

    protected void setPlayerInfo(String roomId, String playerId, Map<String, String> hash) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                for (String hashKey : hash.keySet()) {
                    hashOperations.put(getPlayerKey(roomId, playerId), hashKey, hash.get(hashKey));
                }
                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getPlayerKey(roomId, playerId), TTL, TimeUnit.SECONDS);
    }
    protected String getPlayerInfo(String roomId, String playerId, String hashKey) {
        return (String) hashOperations.get(getPlayerKey(roomId, playerId), hashKey);
    }

    /*** 게임 정보 ***/
    protected String getGameKey(String roomId) {
        return roomId + ".game";
    }
    protected void setGame(String roomId, int pin, int lab) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                hashOperations.put(getGameKey(roomId), "pin", Integer.toString(pin));
                hashOperations.put(getGameKey(roomId), "lab", Integer.toString(lab));
                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getGameKey(roomId), TTL, TimeUnit.SECONDS);
    }
    protected Map<Object, Object> getGame(String roomId) {
        if(hashOperations.entries(getGameKey(roomId)).size() == 0) return null;
        return hashOperations.entries(getGameKey(roomId));
    }

    protected void setGameInfo(String roomId, Map<String, String> hash) {
        System.out.println("REDIS SERVICE: SET GAME INFO");
        System.out.println("ROOMID: "+roomId);
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                for (String hashKey : hash.keySet()) {
                    hashOperations.put(getGameKey(roomId), hashKey, hash.get(hashKey));
                }
                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getGameKey(roomId), TTL, TimeUnit.SECONDS);
    }
    protected String getGameInfo(String roomId, String hashKey) {
        System.out.println("REDIS SERVICE: GET GAME INFO");
        System.out.println("ROOMID: "+roomId);
        System.out.println("HASHKEY: "+hashKey);
        return (String) hashOperations.get(getGameKey(roomId), hashKey);
    }

    /*** 칸 정보 삽입 ***/
    protected String getCellKey(String roomId, int index) {
        return roomId + ".cell" + index;
    }
    protected void setCell(String roomId, Cell cell, int index) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작

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
                hashOperations.put(getCellKey(roomId, index), "name", cell.getName());
                hashOperations.put(getCellKey(roomId, index), "status", Character.toString(cell.getStatus()));
                hashOperations.put(getCellKey(roomId, index), "turn", Boolean.toString(turn));
                hashOperations.put(getCellKey(roomId, index), "move", Integer.toString(move));
                hashOperations.put(getCellKey(roomId, index), "time", Integer.toString(cell.getTime()));

                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getCellKey(roomId, index), TTL, TimeUnit.SECONDS);
    }
    protected void setMinigame(String roomId, Minigame minigame, int index) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                hashOperations.put(getCellKey(roomId, index), "name", minigame.getName());
                hashOperations.put(getCellKey(roomId, index), "status", "M");
                hashOperations.put(getCellKey(roomId, index), "time", Integer.toString(minigame.getTime()));

                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getCellKey(roomId, index), TTL, TimeUnit.SECONDS);
    }
    protected Map<Object, Object> getCell(String roomId, int index) {
        if(hashOperations.entries(getCellKey(roomId, index)).size() == 0) return null;
        return hashOperations.entries(getCellKey(roomId, index));
    }

    protected String getSpellKey(String roomId) {
        return roomId + ".spell";
    }
    protected void setSpell(String roomId, String firstWord, String secondWord, List<String> playerIdList) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                /*** Redis Input : 모든 데이터를 String으로 변경 ***/
                hashOperations.put(getSpellKey(roomId), "firstWord", firstWord);
                hashOperations.put(getSpellKey(roomId), "secondWord", secondWord);
                hashOperations.put(getSpellKey(roomId), playerIdList.get(0), Boolean.toString(false));
                hashOperations.put(getSpellKey(roomId), playerIdList.get(1), Boolean.toString(false));
                hashOperations.put(getSpellKey(roomId), playerIdList.get(2), Boolean.toString(false));
                hashOperations.put(getSpellKey(roomId), playerIdList.get(3), Boolean.toString(false));

                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getSpellKey(roomId), TTL, TimeUnit.SECONDS);
    }
    protected Map<Object, Object> getSpell(String roomId) {
        if(hashOperations.entries(getSpellKey(roomId)).size() == 0) return null;
        return hashOperations.entries(getSpellKey(roomId));
    }

    protected void setSpellInfo(String roomId, Map<String, String> hash) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();  // 트랜잭션 시작
                for (String hashKey : hash.keySet()) {
                    hashOperations.put(getSpellKey(roomId), hashKey, hash.get(hashKey));
                }
                operations.exec();  // 트랜잭션 실행
                return null;
            }
        });
        redisTemplate.expire(getSpellKey(roomId), TTL, TimeUnit.SECONDS);
    }
    protected String getSpellInfo(String roomId, String hashKey) {
        return (String) hashOperations.get(getSpellKey(roomId), hashKey);
    }
}
