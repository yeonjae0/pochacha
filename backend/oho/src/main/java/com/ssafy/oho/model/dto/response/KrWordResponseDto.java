package com.ssafy.oho.model.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public class KrWordResponseDto {
    char firstWord;
    char secondWord;
    List<String> turn;  // 임의로 섞은 순서를 id 형태로 전달
}
