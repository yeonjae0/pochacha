package com.ssafy.oho.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 유효성 검사는 Service 단에서 하기로 결정 */
@NoArgsConstructor
@AllArgsConstructor
// @Setter
@Getter
public class RoomRequestDto {
    private String id;
    private boolean secret;
    private boolean progress;
    private boolean includeMini;
    /* private List<Player> players; */
}
