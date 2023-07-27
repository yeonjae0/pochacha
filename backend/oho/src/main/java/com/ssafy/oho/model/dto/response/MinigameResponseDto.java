package com.ssafy.oho.model.dto.response;

import lombok.*;

@Builder
@Getter
public class MinigameResponseDto {
    String name;
    char status;
    private int winnerCnt;
    private int time;
    private boolean tagger;
    int order;
}
