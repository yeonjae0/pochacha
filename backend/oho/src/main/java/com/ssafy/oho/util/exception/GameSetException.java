package com.ssafy.oho.util.exception;

public class GameSetException extends Exception {
    public GameSetException() {
        super("게임 세팅에 실패했습니다");
    }

    public GameSetException(String message) {
        super(message);
    }
}
