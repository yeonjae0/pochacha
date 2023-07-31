package com.ssafy.oho.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class SocketController {

    @Autowired
    private SimpMessagingTemplate webSocket;

    /*
        TO DO :: {roomId}를 OpenVidu SessionId로 대체
     */
    @MessageMapping("/connect/{roomId}")
    public void connect(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        webSocket.convertAndSend("/topic/connect/" + roomId, payload.get("name"));
    }

    /*
    TO DO :: {roomId}를 OpenVidu SessionId로 대체
    */
    @MessageMapping("/chat/{roomId}")
    public void chat(@Payload Map<String, Object> payload, @DestinationVariable String roomId) {
        webSocket.convertAndSend("/topic/chat/" + roomId, payload);
    }
}
