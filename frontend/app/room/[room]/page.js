'use client'

// import { useEffect, useState } from 'react';
import RoomCam from '../RoomCam.js'
import RoomChat from '../RoomChat.js'
import RoomBtn from '../RoomBtn.js'
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

export default function Room(props) {

  console.log(props)
  let info = JSON.parse(props.searchParams.currentName)

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
      <RoomBtn />
      <RoomChat info={info}/>
    </div>
  )
}