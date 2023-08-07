package com.ssafy.oho.util.exception;

public class RoomGetException extends Exception {
    public RoomGetException() {
        super("방 정보 조회에 실패하였습니다.");
    }
    public RoomGetException(String message) {
        super(message);
    }
}
