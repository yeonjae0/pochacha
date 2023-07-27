package com.ssafy.oho.util.exception;

public class RoomDeleteException extends Exception {
    public RoomDeleteException() {
        super("방 삭제에 실패하였습니다.");
    }
    public RoomDeleteException(String message) {
        super(message);
    }
}
