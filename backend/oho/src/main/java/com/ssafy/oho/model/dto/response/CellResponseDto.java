package com.ssafy.oho.model.dto.response;

import com.ssafy.oho.model.entity.Minigame;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CellResponseDto {
    String name;
    char status;
    int order;
}
