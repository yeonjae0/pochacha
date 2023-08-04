package com.ssafy.oho.model.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Lombok으로 대체함 */
@Entity(name="chat")
// @Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DynamicInsert
public class Chat extends Base{

    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;

    @Column(name="message",nullable = false, columnDefinition = "VARCHAR(500) CHARACTER SET UTF8")
    private String message;

    @ManyToOne
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name="room_id")
    private Room room;
}

/*
C : 채팅 입력
R : 뒤늦은 입장 시 이전 채팅 조회?
U : X
D : (1) 주기적으로 채팅 기록 삭제
    (2) 방 삭제 시 채팅 기록 삭제?
 */