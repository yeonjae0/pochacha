package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

/* Entity는 유효성 검사가 필요 없으므로 Lombok으로 대체함 */
@Entity(name="penalty")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DynamicInsert
public class Penalty extends Base{
    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;//Bigint

    @Column(name="name",nullable = false, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @ColumnDefault("'무명의 벌칙'")
    private String name;

    @Column(name="api_url",nullable = false)
    private String apiUrl;

    /* 혜지 : 벌칙 테이블에 cell_id FK 추가 */
    //FK
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cell_id", nullable = false)
    private Cell cell;
}

/*
C : 관리자 모드에서 Penalty 추가
R : (1) Cell, Minigame과 함께 Cell List 구성하여 Random Board 생성
    (2) 관리자 모드에서 Penalty 목록 조회
U : 관리자 모드에서 Penalty 수정
D : 관리자 모드에서 Penalty 삭제
 */