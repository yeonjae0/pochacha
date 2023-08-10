'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// Room 입장시 받은 router.query를 props로 활용
export default function RoomBtn(props) {

  const router = useRouter();

  let ModeBtn = styled.button`
  margin: 10px;
  padding: 5px;
  background-color: black;
  border-radius: 10px;
  color: white;
  width: 80px;
  height: 50px;
  `;

  let CopyBtn = styled.button`
  width: 219px;
  height: 158px;
  background: #43BEF2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `;

  let ReadyBtn = styled.button`
  width: 325px;
  height: 158px;
  background: #FF285C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `;

  let StartBtn = styled.button`
  width: 325px;
  height: 158px;
  background: #FF285C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `;

  const info = props.info;

  //console.log(`Room Button Info: ${info.roomId}`);

  /*
    TO DO :: 현재 한 컴퓨터에서 다중 접속할 때, ready를 공유하는 문제 발생. MyPlayerData를 통해 ready api를 호출하도록 변경 필요.
  */
  const [client] = useState(props.client);
  let [ready, setReady] = useState(info.ready);
  let [setting, setSetting] = useState(true);
  
  /* 희진 : JS 클립보드 API 시작 */
  const roomId= useSelector(state => state.room.currentRoomId); //오픈비두 세션
  let urls = `http://localhost:3000/enter/room/?`+`roomId=`+roomId;

  console.log("생성 url");
  console.log(urls);
  
  const clipBoard = () => {
    navigator.clipboard.writeText(urls);
    alert("클립보드에 URL이 복사되었습니다.");
  }
  /* 희진 : JS 클립보드 API 끝 */

  const sendData = () => {
    router.push(
      {
        pathname: `/game/${info.roomId}`,
        query: { currentName: JSON.stringify(info) },
      },
      /* 희진 : store에 데이터 저장 작업 완료 후 삭제 예정 코드 */
      // `/game/${info.roomId}`
      )
    }

  /* 제정 : 시작 버튼 클릭 시 메인 게임 이동 시작 */
  // const startGame = () => {
  //   const pathname = `/game/${roomInfo.roomId}`
  //   const query = { roomInfo: JSON.stringify(roomInfo) }
  //   window.location.href = `${pathname}?${new URLSearchParams(query).toString()}`
  // }
  /* 제정 : 시작 버튼 클릭 시 메인 게임 이동 끝 */

  /* 유영 : 플레이어 ready 정보 socket 전송 시작 */
  const readyGame = () => {
    setReady(!ready);
    let sendData = {
      "playerId" : info.playerId,
      "ready" : ready,
    };
    client.current.send(`/ready/${info.roomId}`, {}, JSON.stringify(sendData));
  } /* 유영 : 플레이어 ready 정보 socket 전송 끝 */

  return (
    <div>
      <ModeBtn onClick={() => { setSetting(!setting) }}>{ setting == true ? ('기본 모드 ON') : '미니게임 ON' }</ModeBtn>
      <CopyBtn onClick={() => { clipBoard() }}>친구 초대</CopyBtn>
      <ReadyBtn onClick={() => { readyGame() }}>준비</ReadyBtn>
      <StartBtn onClick={sendData}>시작</StartBtn>
    </div>
  )
}
