'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/RoomPage.module.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

export default function RoomChat(props) {
  const info = props.info;
  const client = props.client;

  /* 유영 : Socket을 이용한 채팅 함수 시작 */
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState(`${info.nick}님이 입장하셨습니다.`+ '\n')

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(message)
      setChatHistory((prevHistory) => prevHistory + info.nick + ': ' + message + '\n')
      setMessage('')
    }
  }

  const subscribeChat = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/chat/${info.roomId}`, (response) => {
        var data = JSON.parse(response.body);
        setChatHistory((prevHistory) => prevHistory + data.playerId + ': ' + data.message + '\n')
      })  // 채팅 구독
    })
  }

  useEffect(() => {
    subscribeChat();
  }, []);

  return (
    <div className={styles.send}>
      <textarea className={styles.chatArea} readOnly value={chatHistory} />
      <input type="text" style={{ width: '500px' }} className={styles.chatInput}
        value={message}
        onChange={handleOnChange}
        onKeyDown={enterDown}
        />
      <button className={styles.sendBtn} onClick={() => {
        var sendData = {
          "playerId": info.nick,
          "message": message,
        }
        client.current.send("/chat/" + info.roomId, {}, JSON.stringify(sendData))
      }}>전송</button>
    </div>
  )
}
/* 희진 : 채팅 누적 출력 시작 */
