import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "@/styles/SpellGame.module.css";
import SpellGame from "./SpellGame";

export default function SpellTimer() {

// const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // 현재 차례 플레이어 인덱스
let [keepGoing, SetKeepGoing] = useState(true);  // 게임이 진행중인지 멈췄는지
let [sec, setSec] = useState(0);
let time = useRef(30);
const timerId = useRef(null);
const tmpPlayers = useSelector(state => state.players.tmpPlayers);
let currentPlayerId = useSelector(state => state.spell.currentPlayerId);

const resetSec = () => {
  time.current = 30
  setSec(30)
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

function GameOver() {
  const router = useRouter()
  return (
    <>
      <div className={styles.gameOver}>
        {/* <img src="/초성_세종대왕_화남.png" /> */}
        <img src='/초성_게임오버.png' />
        {/* <h1 style= {{top: '10%', left: '60%'}}>{currentIdx} </h1>
        <h2 style= {{top: '10%', left: '60%'}}>  님의 패배입니다.</h2> */}
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
      <SpellGame sec={sec} resetSec={resetSec} />
      </div>
      : <GameOver />
    }
  </div>
)
}
