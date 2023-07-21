package com.ssafy.oho.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PlayerResponseDto {
    private long id;
    private String nickname;
    private String roomId;
    private boolean head;
    private boolean ready;
    private int score;
}
