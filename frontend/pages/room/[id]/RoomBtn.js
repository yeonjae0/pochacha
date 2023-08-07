'use client'

import styled from 'styled-components'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Room 입장시 받은 router.query를 props로 활용
export default function RoomBtn(props) {

  const router = useRouter()

  let ModeBtn = styled.button`
  margin: 10px;
  padding: 5px;
  background-color: black;
  border-radius: 10px;
  color: white;
  width: 80px;
  height: 50px;
  `

  let CopyBtn = styled.button`
  width: 219px;
  height: 158px;
  background: #43BEF2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `

  let ReadyBtn = styled.button`
  width: 325px;
  height: 158px;
  background: #FF285C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `

  let StartBtn = styled.button`
  width: 325px;
  height: 158px;
  background: #FF285C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `

  const info = props.info
  const client = props.client;

  console.log(`Room Button Info: ${info.roomId}`)

  let [ready, setReady] = useState(info.ready);
  let [setting, setSetting] = useState(true)
  
  /* 희진 : JS 클립보드 API 시작 */
  let url = usePathname()
  let urls = `http://localhost:3000${url}`
  
  const clipBoard = () => {
    navigator.clipboard.writeText(urls)
    alert("클립보드에 URL이 복사되었습니다.")
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
      "playerId" : roomInfo.playerId,
      "ready" : ready
    };
    client.current.send(`/player/ready/${roomInfo.roomId}`, {}, JSON.stringify(sendData));
  } /* 유영 : 플레이어 ready 정보 socket 전송 끝 */

  const subscribePlayer = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/player/${roomInfo.roomId}`, (response) => {
        var data = JSON.parse(response.body);
        console.log(data);
      })  // 플레이어 정보 구독
    })
  }

  useEffect(() => {
    subscribePlayer();
  }, []);
  return (
    <div>
      <ModeBtn onClick={() => { setSetting(!setting) }}>{ setting == true ? ('기본 모드 ON') : '미니게임 ON' }</ModeBtn>
      <CopyBtn onClick={() => { clipBoard() }}>친구 초대</CopyBtn>
      <ReadyBtn onClick={() => { readyGame() }}>준비</ReadyBtn>
      <StartBtn onClick={sendData}>시작</StartBtn>
    </div>
  )
}
