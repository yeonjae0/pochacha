package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name="penalty")
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
}
