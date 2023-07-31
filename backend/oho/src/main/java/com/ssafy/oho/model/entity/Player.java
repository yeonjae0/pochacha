package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Lombok으로 대체함 */
@Entity
@Table(name="player",indexes = {
        @Index(name = "idx_nickname",columnList = "nickname"),
        @Index(name = "idx_room_id",columnList = "room_id"),
})
@Builder
@Getter
@DynamicInsert
public class Player extends Base {

    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;//Bigint

    @Column(name="nickname",nullable = false, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8", unique = true)
    //@ColumnDefault("'익명'") 랜덤으로 생성하는 닉네임을 서비스에서 구현 예정
    private String nickname;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id", nullable = false)
    private Room room;

    @Column(name="head",nullable = false)
    @ColumnDefault("0")
    private boolean head = false;

    @Column(name="ready",nullable = false)
    @ColumnDefault("0")
    private boolean ready = false;

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