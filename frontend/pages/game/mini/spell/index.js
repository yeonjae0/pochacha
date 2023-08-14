import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import styles from "@/styles/SpellGame.module.css";
import SpellGame from "./SpellGame.js";

export default function SpellTimer() {

let [keepGoing, SetKeepGoing] = useState(true);
let [sec, setSec] = useState(0);
let time = useRef(15);
const timerId = useRef(null);

const resetSec = () => {
  time.current = 10
  setSec(10)
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
        <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
      </div>
    </>
  )
}


return (
  <div>
    {
      keepGoing ?
      <div style={{ backgroundColor: 'blue', height: '100vh' }}>
      <SpellGame sec={sec} resetSec={resetSec}  />
      </div>
      : <GameOver />
    }
  </div>
)
}
