package com.ssafy.oho.model.dto.response;

import lombok.*;

@Builder
@Getter
public class RoomResponseDto {
    private String id;
    private boolean secret;
    private boolean progress;
}
