'use client'

import { useEffect, useState } from 'react';
import RoomCam from '../RoomCam.js'
import RoomChat from '../RoomChat.js'
import RoomBtn from '../RoomBtn.js'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function Room(props) {

  console.log(props)
  let info = JSON.parse(props.searchParams.currentName)

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
      client.current.subscribe(`/topic/chat/${info.roomId}`, (response) => {  // 채팅 구독 url
        var data = JSON.parse(response.body);
        setChat(chat + data.playerId + " : " + data.message);
        console.log("chat : ", chat);
      });
    });
  }
  /* 유영 : Socket을 이용한 채팅 함수 끝 */

  /* 유영 : Socket 함수 최초 호출 시작 */
  useEffect(() => {
    connectSocket();
    subscribeChat();
  }, []);
  /* 유영 : Socket 함수 최초 호출 끝 */

  return (
    <div>
      <h1>대기실입니다.</h1>
      <h3>방 번호 : {info.roomId}</h3>
      <h3>게임시작 : {info.progress.toString()}</h3>
      <h3>비밀방 : {info.secret.toString()}</h3>
      <h3>닉네임 : {info.nick}</h3>
      <h3>아이디 : {info.playerId.toString()}</h3>
      <h3>준비 : {info.ready.toString()}</h3>
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

          client.current.send("/chat/" + info.roomId, {}, JSON.stringify(sendData));
        }}>전송</button>
        </div>
      </div>
    </div>
  )
}