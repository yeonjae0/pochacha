package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Minigame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MinigameRepository extends JpaRepository<Minigame, Integer> {
    @Query(value="SELECT * FROM minigame ORDER BY RAND() LIMIT 4", nativeQuery = true)
    List<Minigame> findTop4Random();
}
