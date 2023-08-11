'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeMini } from "@/store/reducers/room.js";

// Room 입장시 받은 router.query를 props로 활용
export default function RoomBtn(props) {

  const router = useRouter();
  const dispatch = useDispatch();
  
  // 추가
  let ModeBtn = styled.button`
  font-family: 'LeeSeoyun';

  position:absolute;
  bottom: 16px;
  left: 220px;

  background: url("/room/bowl.png") no-repeat center/cover !important; 
  width: 160px;
  height: 120px;
  cursor: pointer;

  font-weight: bold;
  font-size: 24px;
  color: #000; /* 텍스트 색상 */
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(10deg); /* X축으로 20도만큼 기울임 */
    font-size: 26px;
  }
  `;
  let CopyBtn = styled.button`
  font-family: 'LeeSeoyun';

  position:absolute;
  bottom: 16px;
  right: 450px;

  background: url("/room/chapstick.png") no-repeat center/cover !important; 
  width: 180px;
  height: 40px;
  cursor: pointer;

  font-weight: bold;
  font-size: 24px;
  color: #000; /* 텍스트 색상 */
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(-10deg); /* X축으로 20도만큼 기울임 */
    font-size: 26px;
  }
  `;

  let ReadyBtn = styled.button `
  font-family: 'LeeSeoyun';

  position:absolute;
  bottom: 16px;
  right: 260px;

  background: url("/room/pot.png") no-repeat center/cover !important; 
  width: 180px;
  height: 120px;
  cursor: pointer;

  font-weight: bold;
  font-size: 36px;
  color: #000; /* 텍스트 색상 */
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(-10deg); /* X축으로 20도만큼 기울임 */
    font-size: 40px;
  }
`;
let StartBtn = styled.button `
  font-family: 'LeeSeoyun';

  position:absolute;
  bottom: 16px;
  right: 260px;

  background: url("/room/pot.png") no-repeat center/cover !important; 
  width: 180px;
  height: 120px;
  cursor: pointer;

  font-weight: bold;
  font-size: 36px;
  color: #000; /* 텍스트 색상 */
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(-10deg); /* X축으로 20도만큼 기울임 */
    font-size: 40px;
  }
`;

  const info = props.info;

  /*
    TO DO :: 현재 한 컴퓨터에서 다중 접속할 때, ready를 공유하는 문제 발생. MyPlayerData를 통해 ready api를 호출하도록 변경 필요.
  */
  const [client] = useState(props.client);
  const ready = useState(props.ready);
  console.log("ready ::: ", ready);
  const includeMini = useSelector(state => state.room.currentIncludeMini);
  
  /* 희진 : JS 클립보드 API 시작 */
  const roomId= useSelector(state => state.room.currentRoomId); //오픈비두 세션
  let urls = process.env.NEXT_PUBLIC_PAGE + `/enter/room/?`+`roomId=`+roomId;

  console.log("생성 url");
  console.log(urls);
  
  const clipBoard = () => {
    navigator.clipboard.writeText(urls);
    alert("클립보드에 URL이 복사되었습니다.");
  }
  /* 희진 : JS 클립보드 API 끝 */

  // 방장 game start (유효성 필요)
  const sendData = () => {
    /*
      1. players가 4명 미만일 경우 alert 후 return
      2. players 중 하나라도 ready가 false면 alert 후 return
    */
    router.push(
      {
        pathname: `/game/${info?.roomId}`,
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

  // 비방장 ready socket 전송
  const readyGame = () => {
    let sendData = {
      "playerId" : info.playerId,
      "ready" : ready
    };
    client.current.send(`/ready/${info.roomId}`, {}, JSON.stringify(sendData));
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <ModeBtn onClick={() => {dispatch(changeMini())}}>{ includeMini == true ? "미니게임 모드" : "기본 모드" }</ModeBtn>
      <CopyBtn onClick={() => { clipBoard() }}>초대하기</CopyBtn>
      
      {props.head===true?
      <StartBtn onClick={sendData}>시 작</StartBtn>
      :<ReadyBtn onClick={() => { readyGame() }}> {(props.ready === false)? "준 비":"준비완료"}</ReadyBtn>}
      </div>
  )
}
