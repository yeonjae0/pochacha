package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.MemberRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class RoomController {

    @PostMapping(value="/enter")
    private ResponseEntity<?> setRoom(@RequestBody MemberRequestDto memberRequestDto){

        return ResponseEntity.ok("ok");
    }

}
