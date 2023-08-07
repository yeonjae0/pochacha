package com.ssafy.oho.util.exception;

public class PlayerGetException extends Exception {
    public PlayerGetException() {
        super("플레이어 정보 조회에 실패하였습니다.");
    }
    public PlayerGetException(String message) {
        super(message);
    }
}
