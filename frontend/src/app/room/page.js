"use client"
import { useEffect, useState } from 'react';
import RoomCam from '../../routes/RoomCam.js'
import RoomChat from '../../routes/RoomChat.js'
import RoomBtn from '../../routes/RoomBtn.js'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function Room({ name, roomId }) {
  

  /* 유영 : Socket을 이용한 채팅 함수 시작 */
  const [message, setMessage] = useState('');
  const handleOnChange = (e)=> {
    setMessage(e.target.value);
  };
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(message)
    }
  };
  const [chat, setChat] = useState('');
  let [client, setClicent] = useState({});

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws")
      return sock;
    });
  }

  const subscribeChat = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/chat/${roomId}`, (response) => {  // 채팅 구독 url
        var data = JSON.parse(response.body);
        setChat(chat + data.playerId + " : " + data.message);
        console.log("chat : ", chat);
      });
    });
  }
  /* 유영 : Socket을 이용한 채팅 함수 끝 */

  /* 희진 : roomId 값 가져오기 (진행 중) */

  useEffect(()=>{
    console.log('roomId 확인 ▼');
    console.log(roomId);
  }, []);

  /* 유영 : Socket 함수 최초 호출 시작 */
  useEffect(() => {
    connectSocket();
    subscribeChat();
  }, []);
  /* 유영 : Socket 함수 최초 호출 끝 */

  return (
    <div>
      <h1>룸 화면</h1>
      <RoomCam />
      <RoomChat />
      <RoomBtn />
      <div>
        <textarea readOnly value={chat} />
        <div>
        <input type="text "
          value={ message }
          onChange = {handleOnChange}
          onKeyDown = {enterDown}
          />
        <button onClick={() => {
          var sendData = {
            "playerId" : 1,
            "message" : message,
          };

          client.current.send("/chat/" + roomId, {}, JSON.stringify(sendData));
        }}>전송</button>
        </div>
      </div>
    </div>
  )
}
