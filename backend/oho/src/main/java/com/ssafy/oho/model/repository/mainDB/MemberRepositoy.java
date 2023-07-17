package com.ssafy.oho.model.repository.mainDB;

import com.ssafy.oho.model.entity.mainDB.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoy extends JpaRepository<Member,String> {
}
