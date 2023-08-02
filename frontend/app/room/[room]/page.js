'use client'

// import { useEffect, useState } from 'react';
import RoomCam from '../RoomCam.js'
import RoomChat from '../RoomChat.js'
import RoomBtn from '../RoomBtn.js'
import './../../css/Room.css'
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

export default function Room(props) {

  let info = JSON.parse(props.searchParams.currentName)

  const tmp = (
    <div>
      <h1>대기실입니다.</h1>
      <h3>방 번호 : {info.roomId}</h3>
      <h3>게임시작 : {info.progress.toString()}</h3>
      <h3>비밀방 : {info.secret.toString()}</h3>
      <h3>닉네임 : {info.nick}</h3>
      <h3>아이디 : {info.playerId.toString()}</h3>
      <h3>준비 : {info.ready.toString()}</h3>
      
      <RoomCam />
      {/* 버튼에 룸 정보 전달 */}
      <RoomBtn info={info}/>
      <RoomChat info={info}/>
    </div>
  )

  return (
    <div>
      <div className="roof"></div>
      <div id="room">
        <div id="camList">
          <div className="cam"></div>
          <div className="cam"></div>
          <div className="cam"></div>
          <div className="cam"></div>
        </div>
        <div className="chatContainer outerChat">
          <div className="chatContainer innerChat">
            <div className="chatUnit">
              <div className="sender">오스틴</div><div className="time">오늘 오후 3:27</div>
              <div className="message">목욕 중인데 심심해서 들어왔습니다. 목욕 중인데 심심해서 들어왔습니다.</div>
            </div>
            <div className="chatUnit">
              <div className="sender">제이슨</div><div className="time">오늘 오후 3:28</div>
              <div className="message">저도 힙합 중입니다. 저도 힙합 중입니다. 저도 힙합 중입니다.</div>
            </div>
          </div>
        </div>
        <RoomChat info={info}/>
        <RoomCam />
      <RoomBtn info={info}/>
      </div>
    </div>
  )
}