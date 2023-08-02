package com.ssafy.oho.controller;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class OpenViduController {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        System.out.println("CREATE OPENVIDU OBJECT");
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    /* Session ID 발급 API */
    /*
        TO DO :: Room UUID를 Session ID로 대체해 URL 생성
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("OPENVIDU CONTROLLER : initializeSession");
	System.out.println("OPENVIDU URL: " + OPENVIDU_URL);
	System.out.println("OPENVIDU SECRET: " + OPENVIDU_SECRET);
        SessionProperties properties = new SessionProperties
                .Builder()
                .build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }
    /*
      RETURN VALUE EXAMPLE : "ses_JM9v0nfD1l"
     */

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    /* 연결 Token 발급 API */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("OPENVIDU CONTROLLER : createConnection");
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = new ConnectionProperties
                .Builder()
                .role(OpenViduRole.PUBLISHER)
                .data("Player")
                .build();
        Connection connection = session.createConnection(properties);

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
    /*
    RETURN VALUE EXAMPLE : "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd"
     */
}
