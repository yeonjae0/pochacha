import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "@/styles/SpellGame.module.css";
import SpellGame from "./SpellGame";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function SpellTimer(props) {
let [keepGoing, SetKeepGoing] = useState(true);  // 게임이 진행중인지 멈췄는지
let [sec, setSec] = useState(0);
let time = useRef(1);
const timerId = useRef(null);
const tmpPlayers = useSelector(state => state.players.tmpPlayers);
let currentPlayerId = useSelector(state => state.spell.currentPlayerId);

const [end, setEnd] = useState(false);
const roomId = useSelector((state) => state.room.currentRoomId);
let client = {};

const resetSec = () => {
  time.current = 30
  setSec(30)
}

useEffect(() => {
  timerId.current = setInterval(() => {
    setSec(time.current % 60);
    time.current -= 1;
  }, 1000);


    return () => clearInterval(timerId.current);
  }, []);

useEffect(() => {
  if (time.current <= -1) {
    SetKeepGoing(false);
    clearInterval(timerId.current);
  }
})

function GameOver() {
  const router = useRouter();

  return (
    <>
      <div className={styles.gameOver}>
        <img src='/초성_게임오버.png' />
        <h1>'{tmpPlayers[currentPlayerId].nickname}' 님의 패배입니다.</h1>
      </div>
    </>
  )
}


return (
  <div className={styles.topSpellCompo}>
    {
      keepGoing ?
      <div>
      <SpellGame sec={sec} resetSec={resetSec} end={end} />
      </div>
      : <GameOver />
    }
  </div>
)
}
