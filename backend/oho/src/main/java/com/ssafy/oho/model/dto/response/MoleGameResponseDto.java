package com.ssafy.oho.model.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class MoleGameResponseDto {
    private boolean finish;
    private List<MoleGameResultDto> result;
}
