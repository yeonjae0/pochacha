package com.ssafy.oho.model.dto.response;

import com.ssafy.oho.model.entity.Player;

import java.util.List;

public class LiarGameResponseDto {
    private String liar;//거짓말을 할 playerId
    private String word;//세 명의 player가 받을 단어
    //private String turn;//현재 차례인 player
    private List<Player> turns;//임의로 섞은 player 순서
}
