package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Penalty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PenaltyRepository  extends JpaRepository<Penalty, String> {
}
