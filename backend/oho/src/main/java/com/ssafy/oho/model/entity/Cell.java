package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

/* Entity는 유효성 검사가 필요 없으므로 Setter, Constructor 또한 Lombok으로 대체함 */
@Entity
@Table(name="cell",indexes = {
        @Index(name="idx_status",columnList = "status")
})
@NoArgsConstructor
@AllArgsConstructor

@Data   //@Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode 한번에 정의
        //@Setter의 경우 추후 Builder 또는 modelMapper로 변경 필요
@DynamicInsert
public class Cell extends Base{

    @Id//PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)//AUTO INCREMENT
    @Column(name="id")
    private long id;//Bigint

    @Column(name="status",length = 1,nullable = false)
    @ColumnDefault("'N'")
    private String status;

    @Column(name="name",nullable = false, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @ColumnDefault("'무명의 칸'")
    private String name;

}

/*
C : 관리자 모드에서 셀 추가
R : 관리자 모드에서 셀 목록 조회
U : 관리자 모드에서 셀 수정
D : 관리자 모드에서 셀 삭제
 */