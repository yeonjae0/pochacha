package com.ssafy.oho.model.dto.response;

import com.ssafy.oho.model.entity.Minigame;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CellResponseDto {
    String name;
    char status;
    int order;
}
