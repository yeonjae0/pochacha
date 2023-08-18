package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

/* Entity는 유효성 검사가 필요 없으므로 Lombok으로 대체함 */
@Entity(name="room") /* 혜지 : Table 어노테이션의 name을 Entity 어노테이션의 name으로 선언 (테이블 재생성을 위함) */
@Table(indexes = {
        @Index(name="idx_room_secret",columnList = "secret"),
        @Index(name="idx_room_progress",columnList = "progress")
})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@DynamicInsert
public class Room extends Base {

    @Id//PK
    @Column(name="id", columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    private String id;

    @Column(name="secret",nullable = false)
    @ColumnDefault("0")
    private boolean secret;

    @Column(name="progress",nullable = false)
    @ColumnDefault("0")
    private boolean progress;

    //FK
    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER)
    private List<Player> players = new ArrayList<>();

}

/*
C : 방장이 방 생성 ( -> 공유 URL 생성 )
R : (1) 맵 띄울 때 해당 맵에 대한 정보와 플레이어들 정보 조회
    (2) 관리자 모드에서 방 목록 조회
U : 방이름 업데이트
D : PROGRESS==TRUE 상태에서 PLAYERS.SIZE()==0일 경우 방 삭제
    ( -> 채팅 기록 삭제? )
 */