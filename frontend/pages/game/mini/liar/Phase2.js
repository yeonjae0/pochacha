import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import VoteLiarComponent from './VoteLiarComponent';
import styles from '@/styles/LiarGame.module.css';


export default function Phase2() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(33); // 빠른 테스트를 위한 시간 1초 설정(기존 값 : minutes = 2, seconds = 0)
  const [status, setStatus] = useState('ing')
  const [client, setClient] = useState({});

  const roomId = useSelector(state => state.room.currentRoomId);

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws");
      return sock;
    });
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/timer/${roomId}`, (response) => {
        let data = JSON.parse(response.body);
        setSeconds(seconds + data.time);
      })
    })
  }

  useEffect(() => {
    connectSocket();
    subscribeSocket();
  }, [])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          setStatus('done')
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const handleAddTime = () => {
    let sendData = {
      time: 30,
    };
    if (client.current) {
      client.current.send(`/timer/${roomId}`, {}, JSON.stringify(sendData));
    } else {
      alert("소켓 연결 실패!");
    }
  };
  
  return (
    <div
          className="discuss"
        >  
        {
          (status === 'ing' && minutes >= 0 && seconds > 0) && (<><h1>토론을 해보세요</h1><h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.</h2></>)
        }
        {
          (status === 'ing' && minutes === 0 && seconds <= 30 && seconds >= 1 ) && (<button className={styles.addTimebtn} onClick={() => handleAddTime()}>시간 추가</button>)
        }
        {
          status === 'done' && (<VoteLiarComponent/>)
        }
        </div>
  )
}