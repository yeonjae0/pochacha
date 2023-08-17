package com.ssafy.oho.model.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class GameResponseDto {
    private Object[] cellList;
    private List<String> playerIdList;
}
