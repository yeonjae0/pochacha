package com.ssafy.oho.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MinigameResponseDto {
    String name;
    char status;
    private int winnerCnt;
    private int time;
    private boolean tagger;
    int order;
}
