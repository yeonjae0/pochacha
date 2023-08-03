import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function RoomChat({ info }) {

  console.log(info)
  
  /* 유영 : Socket 함수 최초 호출 시작 */
  useEffect(() => {
    connectSocket();
    subscribeChat();
  }, []);
  /* 유영 : Socket 함수 최초 호출 끝 */

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
  let [client, setClicent] = useState({})

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws")
      return sock;
    });
  }

  const subscribeChat = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/chat/${info.roomId}`, (response) => {  // 채팅 구독 url
        var data = JSON.parse(response.body);
        setChatHistory((prevHistory) => prevHistory + data.playerId + ': ' + data.message + '\n')
      })
    })
  }
  /* 유영 : Socket을 이용한 채팅 함수 끝 */

  return (
    <div id="send">
      <textarea readOnly value={chatHistory} />
      <input type="text" style={{ width: '500px' }} className="chatInput"
        value={message}
        onChange={handleOnChange}
        onKeyDown={enterDown}
        />
      <button className="sendBtn" onClick={() => {
        var sendData = {
          "playerId": info.nick,
          "message": message,
        };
        client.current.send("/chat/" + info.roomId, {}, JSON.stringify(sendData));
      }}>전송</button>
    </div>
  )
}
/* 희진 : 채팅 누적 출력 시작 */
