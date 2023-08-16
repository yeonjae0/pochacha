import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "@/styles/SpellGame.module.css";
import SpellGame from "./SpellGame";

export default function SpellTimer() {
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // 현재 차례 플레이어 인덱스
  let [keepGoing, SetKeepGoing] = useState(true);  // 게임이 진행중인지 멈췄는지
  let [sec, setSec] = useState(0);
  let time = useRef(15);
  const timerId = useRef(null);
  const players = useSelector(state => state.players.players);

  const resetSec = () => {
    // time.current = 10
    // setSec(10)
    setCurrentPlayerIndex((currentPlayerIndex + 1) % 4);
    time.current = 10
    setSec(10)
    console.log('reset 되고 있음 reset 되고 있음 reset 되고 있음 reset 되고 있음')
  }

  // const tmpFn = () => {
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
        <div>
          <h1>Game Over ㅜㅅㅜ</h1>
          <h2>한글 공부를 더 해야겠네요</h2>
        </div>
      </>
    )
  }

  return (
    <div className={styles.topSpellCompo}>
      {
        keepGoing ?
          <div>
            <SpellGame sec={sec} resetSec={resetSec} currentPlayerIndex={currentPlayerIndex} />
          </div>
          : <GameOver />
      }
    </div>
  )
}
