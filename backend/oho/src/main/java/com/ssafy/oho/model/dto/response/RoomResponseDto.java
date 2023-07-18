package com.ssafy.oho.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RoomResponseDto {
    private int id;
    private String name;
    private boolean secret;
    private boolean progress;
}
