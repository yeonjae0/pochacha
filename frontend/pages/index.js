import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { useEffect } from "react";
import EnterPage from './enter';
// import { useDispatch } from "react-redux";
// import { enterRoom } from "@/store/reducers/room.js";
// import { resetPlayers } from '@/store/reducers/players';
// import { MyPlayerData } from '@/store/reducers/player';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  /* 혜지 : 현재 오픈비두 토큰을 로컬 스토리지의 players[0] 값에서 받아오므로, 초기 페이지에서는 무조건 storage 초기화하도록 설정 */
  // const dispatch = useDispatch();

  // const doInitialize = () => {
  //   dispatch(enterRoom({ currentRoomId: null, currentProgress: null, currentSecret: null }));
  //   dispatch(resetPlayers([]));
  //   dispatch(MyPlayerData({  currentPlayerId:null,
  //   currentNick: null,
  //   currentReady: null}))
  // };

  // useEffect(() => {
  //   doInitialize();
  // }, []);

  return (
    <div>
      {/* <p>메인 배경색 수정 가능</p>
      <Link href={'/enter'}><h3>🙌대기실 (START 클릭 시 Go To Room)</h3></Link>
      <Link href={'/game'}><h3>🤩메인 게임</h3></Link>
      <Link href={'/game/mini/liar'}><h3>😋라이어 게임</h3></Link>
      <Link href={'/game/mini/mole'}><h3>🦔두더지 게임</h3></Link>
      <Link href={'/game/mini/spell'}><h3>🦄훈민정음 게임</h3></Link>
      <br />
      <hr />
      <br />
      <Link href={'/test2'}><h3>데이터 확인</h3></Link>
      <Link href={'/test3'}><h3>데이터 초기화</h3></Link> */}
      <EnterPage/>
      
    </div>
  )
}
