package com.ssafy.oho.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@MappedSuperclass
/* 생성 날짜 및 수정 날짜 일괄 관리 */
public class Base {

    @Column(updatable = false)
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    @PrePersist
    public void prePersist(){
        LocalDateTime now = LocalDateTime.now();
        created_at = now;
        updated_at = now;
    }
    @PreUpdate
    public void preUpdate() {
        updated_at = LocalDateTime.now();
    }
}
