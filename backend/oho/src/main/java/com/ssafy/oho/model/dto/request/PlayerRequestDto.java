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
public class PlayerRequestDto {
    private long id;
    private String nickname;
    private String roomId;
    private boolean head;
    private boolean ready;
    /* 혜지 : score 삭제 */
//    private int score;
//    private Penalty penalty;
//    private String ipAddress;
}
