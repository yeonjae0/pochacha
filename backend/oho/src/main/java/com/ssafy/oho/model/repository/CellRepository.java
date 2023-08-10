package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Cell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CellRepository extends JpaRepository<Cell, Cell> {
    @Query(value="SELECT * FROM cell ORDER BY RAND() LIMIT 24", nativeQuery = true)
    List<Cell> findTop19Random();
}
