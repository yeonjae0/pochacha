package com.ssafy.oho.util.openvidu;

import com.ssafy.oho.util.data.liargame.words.Animal;
import com.ssafy.oho.util.data.liargame.words.Sports;
import io.openvidu.java.client.OpenVidu;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenViduConfig {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    /*
        @PostConstruct란,
        종속성 주입이 완료된 후 실행되어야 하는 메소드에 사용하는 것으로,
        의존성 주입이 끝나고 실행됨과 빈이 하나만 생성됨을 보장함.
    */
    /*@PostConstruct
    public void init() {
        System.out.println("CREATE OPENVIDU OBJECT");
        this.openVidu = new io.openvidu.java.client.OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }*/

    @Bean
    public OpenVidu openVidu(){
        //System.out.println("OPENVIDU OBJECT");
        return new OpenVidu(OPENVIDU_URL,OPENVIDU_SECRET);
    }
}
