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
    private String id;
    private boolean secret;
    private boolean progress;
    /* private List<Player> players; */
}
