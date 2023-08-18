package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,String> { /* 혜지 : 관리 엔티티 타입과 엔티티의 KEY 타입 */
    /* 혜지 : 커스텀 메소드가 아닐 때 선언할 필요 없음 => 내장 메소드를 사용함으로써 예외 처리 의무화 */
//    Player findById(String id);
//    void deleteById(String id);
}
