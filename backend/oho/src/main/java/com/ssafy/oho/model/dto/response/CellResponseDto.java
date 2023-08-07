package com.ssafy.oho.model.dto.response;

import com.ssafy.oho.model.entity.Minigame;
import lombok.*;

@Builder
@Getter
public class CellResponseDto {
    private String name;
    private char status;
    private int time;
    private int move;
    private boolean turn;
}
