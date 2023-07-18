package com.ssafy.oho.util.exception;

public class RoomEnterException extends Throwable {
    public RoomEnterException() {
        super("방 생성에 실패하였습니다.");
    }
    public RoomEnterException(String message) {
        super(message);
    }
}
