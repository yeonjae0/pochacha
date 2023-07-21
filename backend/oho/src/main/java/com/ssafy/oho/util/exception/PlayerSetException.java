package com.ssafy.oho.util.exception;

public class PlayerSetException extends Exception {
    public PlayerSetException() {
        super("플레이어 생성에 실패하였습니다.");
    }
    public PlayerSetException(String message) {
        super(message);
    }
}
