"use client";

import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeMini } from "@/store/reducers/room.js";

// Room 입장시 받은 router.query를 props로 활용
export default function RoomBtn(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  // 추가
  let ModeBtn = styled.button`
    font-family: "LeeSeoyun";

    position: absolute;
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
    font-family: "LeeSeoyun";

    position: absolute;
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

  let ReadyBtn = styled.button`
    font-family: "LeeSeoyun";

    position: absolute;
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
  let StartBtn = styled.button`
    font-family: "LeeSeoyun";

    position: absolute;
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

  const [client] = useState(props.client);
  const ready = useState(props.ready);
  const includeMini = useSelector((state) => state.room.currentIncludeMini);
  let startGame = useSelector((state) => state.cell.startGame);

  /* 희진 : JS 클립보드 API 시작 */
  const roomId = useSelector((state) => state.room.currentRoomId); //오픈비두 세션
  let urls = process.env.NEXT_PUBLIC_PAGE + `/enter/room/?` + `roomId=` + roomId;

  const clipBoard = () => {
    navigator.clipboard.writeText(urls);
    alert("클립보드에 URL이 복사되었습니다.");
  };
  /* 희진 : JS 클립보드 API 끝 */

  const sendData = () => {
    let sendData = {
      includeMini: includeMini,
    };
    /* 게임 시작 신호 전송 */
    console.log("게임 시작 신호 전송 전");
    /*
      CONFIRM :: 타입에러 임시 해결을 위해 PROPS로 받아옴
    */

    props.client.current.send(`/game/${info.roomId}`, {}, JSON.stringify(sendData));
    console.log("게임 시작 신호 전송");
    // router.push(
    //   {
    //     pathname: `/game/${info.roomId}`,
    //     query: { currentName: JSON.stringify(info) },
    //   },
    //   )
  };

  /* 제정 : 시작 버튼 클릭 시 메인 게임 이동 시작 */
  // const startGame = () => {
  //   const pathname = `/game/${roomInfo.roomId}`
  //   const query = { roomInfo: JSON.stringify(roomInfo) }
  //   window.location.href = `${pathname}?${new URLSearchParams(query).toString()}`
  // }
  /* 제정 : 시작 버튼 클릭 시 메인 게임 이동 끝 */

  // 비방장 ready socket 전송
  const readyGame = (ready) => {
    let sendData = {
      playerId: info.playerId,
      ready: ready,
    };
    client.current.send(`/ready/${info.roomId}`, {}, JSON.stringify(sendData));
    console.log(ready);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <ModeBtn
        onClick={() => {
          dispatch(changeMini());
        }}
      >
        {includeMini == true ? "미니게임 모드" : "기본 모드"}
      </ModeBtn>
      <CopyBtn
        onClick={() => {
          clipBoard();
        }}
      >
        초대하기
      </CopyBtn>

      {props.head === true ? (
        // CONFIRM :: 재랜더링이 되지 않아 STARTGAME 값 변경 시 버튼이 활성화되지 않음 (유효성 검사 임시 패스)
        // startGame !== true ? (
        //   <StartBtn /*onClick={alert("모두 준비되지 않았습니다")}*/>시작불가</StartBtn>
        // ) : (
        <StartBtn onClick={sendData}>시 작</StartBtn>
      ) : (
        //)
        <ReadyBtn
          onClick={() => {
            readyGame(props.ready);
          }}
        >
          {" "}
          {props.ready === false ? "준 비" : "준비완료"}
        </ReadyBtn>
      )}
    </div>
  );
}
