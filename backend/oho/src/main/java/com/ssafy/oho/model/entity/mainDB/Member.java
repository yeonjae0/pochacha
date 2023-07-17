package com.ssafy.oho.model.entity.mainDB;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* Entity는 유효성 검사가 필요 없으므로 Setter, Constructor 또한 Lombok으로 대체함 */
@Entity(name="member")
@NoArgsConstructor
@AllArgsConstructor
@Setter //추후 Builder 또는 modelMapper로 변경 예정
@Getter
public class Member {
    @Id
    @Column(name="id",length = 20,nullable = false)
    private String id;

    @Column(name="password",length = 255,nullable = false)
    private String password;

    @Column(name="name",length = 20,nullable = false)
    private String name;

    //unique 필요
    @Column(name="nickname",length = 20,nullable = false)
    private String nickname;

    /* 관리자, 사용자로 구분 */
    @Column(name="role",length = 11,nullable = false)
    private String role;

}
