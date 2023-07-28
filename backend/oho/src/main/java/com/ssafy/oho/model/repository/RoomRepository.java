package com.ssafy.oho.model.repository;

import com.ssafy.oho.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room,Integer> {
    Room findById(String roomId);
    boolean existsById(String roomId);
}
