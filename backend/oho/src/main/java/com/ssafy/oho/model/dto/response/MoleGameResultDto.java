package com.ssafy.oho.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class MoleGameResultDto implements Comparable<MoleGameResultDto> {
    private String playerId;
    private int score;

    @Override
    public int compareTo(MoleGameResultDto o) {
        return Integer.compare(o.score,this.score);
    }
}
