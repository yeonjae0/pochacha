package com.ssafy.oho.model.dto.response;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LiarGameResponseDto {
    private String liar;//거짓말을 할 playerId
    private String word;//세 명의 player가 받을 단어
    private List<String> turns;//임의로 섞은 playerId 순서
    private int total;//전체 투표자 수
    private boolean tiebreak;//동점 여부
    private List<String> tiebreaker;//동점일 경우의 동점자 playerId 리스트
    private boolean winner; //라이어 기준으로 승리 여부
}
