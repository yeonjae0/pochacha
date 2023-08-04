package com.ssafy.oho.model.dto.response;


import lombok.*;

@Builder
@Getter
public class PlayerResponseDto {
    private String id;
    private String nickname;
//    private String roomId;  // 굳이 보낼 필요 없어서 삭제
    private boolean head;
    private boolean ready;
}
