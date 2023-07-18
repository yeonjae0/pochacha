package com.ssafy.oho.model.entity.mainDB;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@MappedSuperclass
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
