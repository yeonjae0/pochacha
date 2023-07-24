package com.ssafy.oho.util.exception;

/* 혜지 : 명명 규칙을 따르기 위해 enter -> set 이름 변경 */
public class RoomSetException extends Throwable {
    public RoomSetException() { super("방 생성에 실패하였습니다."); }
    public RoomSetException(String message) {
        super(message);
    }
}
