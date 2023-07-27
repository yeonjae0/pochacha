package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Player;
import com.ssafy.oho.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,Integer> {
    Player findById(long id);
    void deleteById(long id);
    Long countByRoom(Room room);
}
