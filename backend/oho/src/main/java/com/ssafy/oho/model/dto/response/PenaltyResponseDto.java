package com.ssafy.oho.model.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PenaltyResponseDto {
    private String nickname;
    private int num;
}
