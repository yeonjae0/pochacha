package com.ssafy.oho.model.dto.request;

import lombok.*;

/* 유효성 검사는 Service 단에서 하기로 결정 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class PlayerRequestDto {
    private String id;
    private String nickname;
    private String roomId;
    private boolean head;
    private boolean ready;
}
