package com.ssafy.oho.util.socket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        /*
            /topic : 해당 토픽을 구독중인 n명에게 뿌리기
            /queue : msg 발행을 한 한명에게 다시 정보 보내기
        */
        config.enableSimpleBroker("/topic", "/queue");  // 메시지 브로커 등록
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
		.addEndpoint("/wss", "/ws")
                .setAllowedOriginPatterns("*/*")
                .withSockJS();
    }
}

