package com.ssafy.oho.util.exception;

public class GameGetException extends Exception {
    public GameGetException() {
        super("보드게임 조회에 실패하였습니다.");
    }
    public GameGetException(String message) {
        super(message);
    }
}
