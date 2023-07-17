package com.ssafy.oho.model.entity.mainDB;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* Entity는 유효성 검사가 필요 없으므로 Setter, Constructor 또한 Lombok으로 대체함 */
@Entity(name="room")
@NoArgsConstructor
@AllArgsConstructor
@Setter //추후 Builder 또는 modelMapper로 변경 예정
@Getter
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id",length = 11)
    private int id;

    @Column(name="name",length = 20,nullable = false)
    private String name;

    @Column(name="secret",nullable = false)
    private boolean secret;

    @Column(name="progress",nullable = false)
    private boolean progress;
}
