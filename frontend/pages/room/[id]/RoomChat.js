'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/RoomPage.module.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

export default function RoomChat(props) {
  const info = props.info;
  const client = props.client;

  /* 유영 : Socket 함수 최초 호출 시작 */
  useEffect(() => {
    connectSocket()
    subscribeChat()
  }, [])
  /* 유영 : Socket 함수 최초 호출 끝 */

  /* 유영 : Socket을 이용한 채팅 함수 시작 */
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState(`${info.nick}님이 입장하셨습니다.` + '\n')
  const [spam, setSpam] = useState('') // 도배 메시지
  const [count, setCount] = useState(0) // 도배 횟수 카운트
  const [inputVisible, setInputVisible] = useState(true) // 입력란 보이기/숨기기 상태

  /* 희진 : 도배 유저 15초 차단 시작 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [inputVisible]);
  /* 희진 : 도배 유저 15초 차단 끝 */

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }

  /* 희진 : 도배 유저 일시 차단 시작 */
  const enterDown = (e) => {
    if (e.key === 'Enter') {

      let spamMsg = spam;
      setSpam(message) // 도배 메시지 저장
      if (spamMsg === spam) {
        setCount(count + 1)
        if (count === 5) {
          setInputVisible(false)
          alert("5회 이상 같은 채팅을 입력하셨습니다.")
          setCount(0)
        }
      }

      if (message === '') {
        alert("입력된 메시지가 없습니다.")
      } else {
        setChatHistory((prevHistory) => prevHistory + info.nick + ': ' + message + '\n')
        setMessage('')
      }
    }
  }
  /* 희진 : 도배 유저 일시 차단 끝 */

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws")
      return sock
    })
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

      {inputVisible ? (
        <input type="text" style={{ width: '500px' }} className={styles.chatInput}
          value={message}
          onChange={handleOnChange}
          onKeyDown={enterDown}
        />
      ) : null}

      {!inputVisible ? (
        <input type="text" style={{ width: '500px' }} className={styles.chatInput}
          placeholder='15초 후에 채팅이 가능합니다.'
          value={message}
          onChange={handleOnChange}
          onKeyDown={enterDown}
          disabled
        />
      ) : null}

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
