package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository  extends JpaRepository<Chat, String> {
}
