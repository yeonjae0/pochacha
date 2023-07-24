package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,Integer> {
    Player findById(long roomId);
}
