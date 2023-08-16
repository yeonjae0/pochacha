package com.ssafy.oho.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LiarGameVoteDto implements Comparable<LiarGameVoteDto> {
    private String playerId;
    private int cnt;

    @Override
    public int compareTo(LiarGameVoteDto o) {
        return Integer.compare(o.cnt,this.cnt);//cnt에 대해 내림차순 정렬
    }
}
