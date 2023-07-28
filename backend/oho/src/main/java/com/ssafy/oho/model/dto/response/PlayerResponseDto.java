package com.ssafy.oho.model.dto.response;


import lombok.*;

@Builder
@Getter
public class PlayerResponseDto {
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
