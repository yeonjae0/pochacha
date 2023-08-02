import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function RoomChat({ info }) {
  
  /* 희진 : 채팅 컴포넌트 이동 시작 */
  /* 유영 : Socket 함수 최초 호출 시작 */
  useEffect(() => {
    connectSocket();
    subscribeChat();
  }, []);
  /* 유영 : Socket 함수 최초 호출 끝 */

  /* 유영 : Socket을 이용한 채팅 함수 시작 */
  const [message, setMessage] = useState('')
  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(message)
    }
  }
  const [chat, setChat] = useState('')
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
        console.log(data.playerId + ": " + data.message);
      })
    })
  }
  /* 유영 : Socket을 이용한 채팅 함수 끝 */
  
  return (
    <div id="send">
      <input type="text" className="chatInput"
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
/* 희진 : 채팅 컴포넌트 이동 끝 */
