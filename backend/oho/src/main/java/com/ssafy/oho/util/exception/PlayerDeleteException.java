package com.ssafy.oho.util.exception;

public class PlayerDeleteException extends Exception {
    public PlayerDeleteException() {
        super("플레이어 삭제에 실패하였습니다.");
    }
    public PlayerDeleteException(String message) {
        super(message);
    }
}
