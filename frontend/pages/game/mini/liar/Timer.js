import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

/*
    CONFIRM :: 두더지게임 타이머를 적용할지 고민
*/
export default function Timer(){
    const [timeLeft,setTimeLeft]=useState(60);
    const [timerRunning,setTimerRunning]=useState(false);

    const socket=new SockJS(process.env.NEXT_PUBLIC_WS + '/ws');
    //websocket server url 수정 필요

    useEffect(()=>{
        const stompClient=Stomp.over(socket);

        stompClient.connect({},frame=>{
            stompClient.subscribe('/topic/timer',message=>{
                const parsedMessage=JSON.parse(message.body);
                setTimeLeft(parsedMessage.timeLeft);
            });
        });

        return ()=>{
            stompClient.disconnect();
        }
    },[]);

    const startTimer=()=>{
        setTimerRunning(true);
    };

    const stopTimer=()=>{
        setTimerRunning(false);
    };

    return(
        <div>
            <h1>타이머 테스트</h1>
            <p>Time Left: {timeLeft} seconds</p>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
        </div>
    );
}