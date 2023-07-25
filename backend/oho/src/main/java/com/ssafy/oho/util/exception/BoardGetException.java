package com.ssafy.oho.util.exception;

public class BoardGetException extends Exception {
    public BoardGetException() {
        super("보드게임 조회에 실패하였습니다.");
    }
    public BoardGetException(String message) {
        super(message);
    }
}
