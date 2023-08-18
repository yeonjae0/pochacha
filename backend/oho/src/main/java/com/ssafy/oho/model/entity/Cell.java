package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Lombok으로 대체함 */
@Entity(name="cell")
@Table(indexes = {
        @Index(name="idx_status",columnList = "status")
})
@Getter
@DynamicInsert
public class Cell extends Base {

    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;//Bigint

    @Column(name="status",length = 1,nullable = false)
    @ColumnDefault("'N'")
    private char status;

    /* 혜지 : 길이 50으로 fix */
    @Column(name="name",nullable = false, columnDefinition = "VARCHAR(50) CHARACTER SET UTF8")
    @ColumnDefault("'무명의 칸'")
    private String name;

    /* 혜지 : Cell별 제한시간 추가 */
    @Column(name="time")
    @ColumnDefault("0")
    private int time;

}

/*
C : 관리자 모드에서 Cell 추가
R : (1) Minigame, Penalty와 함께 Cell List 구성하여 Random Board 생성
    (2) 관리자 모드에서 Cell 목록 조회
U : 관리자 모드에서 Cell 수정
D : 관리자 모드에서 Cell 삭제
 */