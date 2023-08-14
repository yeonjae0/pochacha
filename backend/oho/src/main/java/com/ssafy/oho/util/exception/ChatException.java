package com.ssafy.oho.util.exception;

public class ChatException extends Exception {
    public ChatException() {
        super("채팅 전송에 실패하였습니다.");
    }
    public ChatException(String message) {
        super(message);
    }
}
