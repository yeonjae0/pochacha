package com.ssafy.oho.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 유효성 검사는 Service 단에서 하기로 결정 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PlayerRequestDto {
    private String id;
    private String nickname;
    private String roomId;
    private boolean head;
    private boolean ready;
}
