package com.ssafy.oho.model.dto.response;

import com.ssafy.oho.model.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LiarGameResponseDto {
    private String liar;//거짓말을 할 playerId
    private String word;//세 명의 player가 받을 단어
    //private String turn;//현재 차례인 player
    private List<String> turns;//임의로 섞은 playerId 순서
}
