package com.ssafy.oho.model.dto.request;

import lombok.*;

/* 유효성 검사는 Service 단에서 하기로 결정 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RoomRequestDto {
    private String id;
    private boolean secret;
    private boolean progress;
    private boolean includeMini;
}
