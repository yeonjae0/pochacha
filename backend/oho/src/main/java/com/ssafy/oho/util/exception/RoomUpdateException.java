package com.ssafy.oho.util.exception;

public class RoomUpdateException extends Exception {
    public RoomUpdateException () {
        super("방 수정에 실패하였습니다.");
    }
    public RoomUpdateException (String message) {
        super(message);
    }
}
