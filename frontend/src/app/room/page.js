"use client"
import { useEffect } from 'react';
import RoomCam from '../../routes/RoomCam.js'
import RoomChat from '../../routes/RoomChat.js'
import RoomBtn from '../../routes/RoomBtn.js'

export default function Room({ name, roomId }) {

  /* 희진 : roomId 값 가져오기 (진행 중) */

  useEffect(()=>{
    console.log('roomId 확인 ▼');
    console.log(roomId);
  });

  return (
    <div>
      <h1>룸 화면</h1>
      <RoomCam />
      <RoomChat />
      <RoomBtn />
    </div>
  )
}
