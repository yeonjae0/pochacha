package com.ssafy.oho.model.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Setter, Constructor 또한 Lombok으로 대체함 */
@Entity
@Table(name="minigame")
@Getter
@DynamicInsert
public class Minigame extends Base{

    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;//Bigint

    @Column(name="name",nullable = false, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @ColumnDefault("'무명의 게임'")
    private String name;

    @Column(name="winner_cnt",nullable = false)
    @ColumnDefault("1")
    private int winnerCnt;

    @Column(name="time",nullable = false)
    @ColumnDefault("0")
    private int time;

    @Column(name="tagger",nullable = false)
    @ColumnDefault("0")
    private boolean tagger;
    
}

/*
C : 관리자 모드에서 게임 추가
R : 관리자 모드에서 게임 목록 조회
U : 관리자 모드에서 게임 수정
D : 관리자 모드에서 게임 삭제
 */
