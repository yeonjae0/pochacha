'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/RoomPage.module.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
//import { useRouter } from 'next/router'

export default function RoomChat({ info }) {

  /* 태훈 : 링크 복붙으로 들어온 유저의 경우에 params로 전달받은 info가 null값이 되어버리기 때문에 url의 parameter를 파싱해 info를 설정함 */
  //const router = useRouter()
  const [information, setInformation] = useState(info)

  const extractParamsFromURL = (url) => {
    const params = {};
    const urlSearchParams = new URLSearchParams(url);

    urlSearchParams.forEach((value, key) => {
      try {
        params[key] = JSON.parse(decodeURIComponent(value));
      } catch (error) {
        params[key] = value;
      }
    });
      
    console.log(params["currentName"]);

    return params["currentName"];
  }

  // const information = extractParamsFromURL(window.location.href);

  /* 유영 : Socket 함수 최초 호출 시작 */
  useEffect(() => {
    setInformation(info ? info : extractParamsFromURL(window.location.href))
    connectSocket()
    subscribeChat()
  }, [])
  /* 유영 : Socket 함수 최초 호출 끝 */

  /* 유영 : Socket을 이용한 채팅 함수 시작 */
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState(`${info?.nick}님이 입장하셨습니다.`+ '\n')

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(message)
      setChatHistory((prevHistory) => prevHistory + information.nick + ': ' + message + '\n')
      setMessage('')
    }
  }
  let [client, setClicent] = useState({})

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(process.env.NEXT_PUBLIC_HOST + "/ws")
      return sock;
    });
  }

  const subscribeChat = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/chat/${info.roomId}`, (response) => {  // 채팅 구독 url
        var data = JSON.parse(response.body)
        setChatHistory((prevHistory) => prevHistory + data.playerId + ': ' + data.message + '\n')
      })
    })
  }
  /* 유영 : Socket을 이용한 채팅 함수 끝 */

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
          "playerId": information.nick,
          "message": message,
        }
	console.log(information)
	//console.log("information" + information)
        client.current.send("/chat/" + information.roomId, {}, JSON.stringify(sendData))
      }}>전송</button>
    </div>
  )
}
/* 희진 : 채팅 누적 출력 시작 */
