package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Lombok으로 대체함 */
@Entity(name="player")
@Table(indexes = {
        @Index(name = "idx_nickname",columnList = "nickname"),
        @Index(name = "idx_room_id",columnList = "room_id"),
})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@DynamicInsert
/* 혜지 : Player Id를 OpenVidu Token으로 정정 */
public class Player extends Base {

    @Id//PK
    @Column(name="id")
    private String id;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id", nullable = false)
    private Room room;

    @Column(name="nickname",nullable = false, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8"/*, unique = true*/)
    private String nickname;

    @Column(name="head",nullable = false)
    @ColumnDefault("0")
    private boolean head = false;

    /* 혜지 : Redis 사용으로 ready 삭제 */
    /* 혜지 : score, 벌칙 참조, ip 주소 칼럼 삭제 */
}

/*
C : 닉네임 입력 시 생성
R : (1) 플레이어 자신의 정보 조회?
    (2) 관리자 모드에서 플레이어 목록 조회
U : X
D : 접속 끊길 때 삭제
    ( -> 접속 해제하는 플레이어가 방장일 경우에 해당 방의 방장 업데이트 필요 , PLAYERS.SIZE()==0일 경우 방 삭제 )
 */
