import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "@/styles/SpellGame.module.css";
import SpellGame from "./SpellGame";

export default function SpellTimer({ cellObj }) {

// const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // 현재 차례 플레이어 인덱스
let [keepGoing, SetKeepGoing] = useState(true);  // 게임이 진행중인지 멈췄는지
let [sec, setSec] = useState(0);
let time = useRef(15);

const router = useRouter();
const timerId = useRef(null);
const players = useSelector(state => state.players.players);
const currentIdx = useSelector(state => state.spell.currentIdx);
const roomId = useSelector(state => state.room.currentRoomId);

const resetSec = () => {
  // time.current = 10
  // setSec(10)
  // console.log(currentPlayerIndex)
  // setCurrentPlayerIndex((currentPlayerIndex + 1) % 4);
  time.current = 10
  setSec(10)
}

// const tmpFn = () => {''\

//   console.log('tmpFn called');
//   goToNextPlayer();
//   resetSec();
//   // setKeepGoing(true); // Restart the timer
// };


// const goToNextPlayer = () => {
//   const nextPlayerIndex = (currentPlayerIndex + 1) % 4;
//   setCurrentPlayerIndex(nextPlayerIndex);
//   console.log('currentPlayerIndex', currentPlayerIndex);
// };

useEffect(() => {
  timerId.current = setInterval(() => {
    setSec(time.current % 60);
    time.current -= 1;
  }, 1000);


    return () => clearInterval(timerId.current);
  }, []);

useEffect(() => {
  if (time.current <= -1) {
    console.log('시간 초과')
    SetKeepGoing(false)
    clearInterval(timerId.current);
  }
})

function GameOver({cellObj }) {
  const router = useRouter()
  console.log('Spell의 GameOver로 cellobj 들어옴.', cellobj)
  // 게임 오버 후에 넘어가야 함.
  // setTimeout(() => {
  //   router.push('/game/[id]', `/game/${roomId}`);
  // }, 5000);
  return (
    <>
      <div className={styles.gameOver}>
        {/* <img src="/초성_세종대왕_화남.png" /> */}
        <h1>Game Over ㅜㅅㅜ</h1>
        <h2>'{players[currentIdx].nick}' 님의 패배입니다.</h2>
      </div>
    </>
  )
}





return (
  <div className={styles.topSpellCompo}>
    {
      keepGoing ?
      <div>
      <SpellGame sec={sec} resetSec={resetSec} cellObj={cellObj}/>
      </div>
      : <GameOver cellObj={cellObj}/>
    }
  </div>
)
}
