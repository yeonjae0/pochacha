package com.ssafy.oho.util.exception;

public class PlayerUpdateException extends Exception {
    public PlayerUpdateException() {
        super("플레이어 수정에 실패하였습니다.");
    }
    public PlayerUpdateException(String message) {
        super(message);
    }
}
