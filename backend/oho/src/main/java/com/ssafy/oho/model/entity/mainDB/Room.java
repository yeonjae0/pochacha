package com.ssafy.oho.model.entity.mainDB;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

/* Entity는 유효성 검사가 필요 없으므로 Setter, Constructor 또한 Lombok으로 대체함 */
@Entity
@Table(name="room",indexes = {
        @Index(name="idx_room_name",columnList = "name"),
        @Index(name="idx_room_secret",columnList = "secret"),
        @Index(name="idx_room_progress",columnList = "progress")
})
@NoArgsConstructor
@AllArgsConstructor

@Data   //@Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode 한번에 정의
        //@Setter의 경우 추후 Builder 또는 modelMapper로 변경 필요
@DynamicInsert
public class Room extends Base{

    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;//Bigint

    @Column(name="name",nullable = false, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @ColumnDefault("'무명의 방'")
    private String name;

    @Column(name="secret",nullable = false)
    @ColumnDefault("0")
    private boolean secret;

    @Column(name="progress",nullable = false)
    @ColumnDefault("0")
    private boolean progress;

    //FK
    @OneToMany
    @JoinColumn(name="players")
    private List<Player> players=new ArrayList<>();
}

/*
C : 방장이 방 생성 ( -> 공유 URL 생성 )
R : (1) 맵 띄울 때 해당 맵에 대한 정보와 플레이어들 정보 조회 (2) 관리자 모드에서 방 목록 조회
U : 방이름 업데이트
D : PROGRESS==TRUE 상태에서 PLAYERS.SIZE()==0일 경우 방 삭제 ( -> 채팅 기록 삭제? )
 */