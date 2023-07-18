package com.ssafy.oho.model.entity.mainDB;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Setter, Constructor 또한 Lombok으로 대체함 */
@Entity(name="player")
@NoArgsConstructor
@AllArgsConstructor
@Setter //추후 Builder 또는 modelMapper로 변경 예정
@Getter
@DynamicInsert
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id",length = 11)
    private int id;

    //Member API 작성 후 1대다 mapping 필요
    @Column(name="nickname",length = 20,nullable = false)
    @ColumnDefault("'익명'")
    private String nickname = "익명";

    //Room API 작성 후 1대다 mapping 필요
    @Column(name="room_id",length = 11,nullable = false)
    private int roomId;

    @Column(name="head",nullable = false)
    @ColumnDefault("0")
    private boolean head = false;

    @Column(name="ready",nullable = false)
    @ColumnDefault("0")
    private boolean ready = false;

    @Column(name="score",length = 11, nullable = false)
    @ColumnDefault("0")
    private int score = 0;
}
