'use client'

import { useEffect, useState, useRef } from 'react'
import styles from '@/styles/RoomPage.module.css'

export default function RoomChat(props) {
  
  const info = props.info;
  const [client] = useState(props.client);

  console.log(info)
  console.log(client)

  /* 유영 : Socket을 이용한 채팅 함수 시작 */
  const [message, setMessage] = useState('')
  const [spam, setSpam] = useState('') // 도배 메시지
  const [count, setCount] = useState(0) // 도배 횟수 카운트
  const [inputVisible, setInputVisible] = useState(true) // 입력란 보이기/숨기기 상태

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }

  /* 희진 : 도배 유저 일시 차단 시작 */
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      setMessage(''); //메시지 입력 시 input창 비우기
    }
  }

  const sendMessage = () => {

    let spamMsg = spam;
    setSpam(message) // 도배 메시지 저장
    if (spamMsg === message) {
      setCount(count + 1)
      if (count >= 4) {
        setInputVisible(false)
        alert("5회 이상 같은 채팅을 입력하셨습니다.")
        setCount(0)
        setMessage(''); // 메시지 비우기
        return; // 도배일 경우 함수 종료
      }
    } else {
      setCount(0);
    }

    if (message === '') {
      alert("입력된 메시지가 없습니다.")
    } else if (client.current) {
      var sendData = {
        "playerId": info.nick,
        "message": message,
      }

      client.current.send("/chat/" + info.roomId, {}, JSON.stringify(sendData))
    }
    setMessage('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInputVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [inputVisible]);
  /* 희진 : 도배 유저 일시 차단 끝 */

  /* 희진 : 채팅창 자동 스크롤 시작 */
  const chatTextAreaRef = useRef(null);

  useEffect(() => {
    if (chatTextAreaRef.current) {
      /*
        TO DO :: 자동 스크롤 시 채팅창도 아래로 내려가게 하기
      */
      chatTextAreaRef.current.scrollTop = chatTextAreaRef.current.scrollHeight;
    }
  }, [props.chatHistory]);
  /* 희진 : 채팅창 자동 스크롤 끝 */

  /* 희진 : 입장 시 입장 메시지 자동 채팅 전송 (Cam On) 시작 */
  const sendIntroMessage = () => {
    if (message === '') {
      var sendData = {
        "playerId": '입장 알림봇',
        "message": `${info.nick}님이 입장하셨습니다.`,
      }
      client.current.send("/chat/" + info.roomId, {}, JSON.stringify(sendData))
    }
    setMessage('');
  };

  useEffect(() => {
    setTimeout(() => {
      sendIntroMessage();
    }, 1000)
  }, []);
  /* 희진 : 입장 시 입장 메시지 자동 채팅 전송 끝 */

  return (
    <div>
      <div className={styles.outerChat}>
        <div className={styles.innerChat}>
          <textarea ref={chatTextAreaRef}
            className={styles.chatArea}
            readOnly
            value={props.chatHistory} />
        </div>
      </div>
      {inputVisible ? (
        <input type="text" className={styles.chatInput}
          value={message}
          onChange={handleOnChange}
          onKeyDown={enterDown}
        />
      ) : null}

      {!inputVisible ? (
        <input type="text" className={styles.chatInput}
          placeholder='15초 후에 채팅이 가능합니다.'
          value={message}
          onChange={handleOnChange}
          onKeyDown={enterDown}
          disabled
        />
      ) : null}

      <button className={styles.sendBtn} onClick={sendMessage}>전송</button>
    </div>
  )
}
