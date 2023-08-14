import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import styles from "@/styles/SpellGame.module.css";
import SpellGame from "./SpellGame.js";

export default function SpellTimer() {

  const [sec, setSec] = useState(0);
  const time = useRef(30);
  const timerId = useRef(null);

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
      clearInterval(timerId.current);
    }
  })

  return (
    <div>
    {/* <div style={{ backgroundColor: 'blue', height: '100vh' }}> */}
      <SpellGame sec={sec} />
    </div>
  )
}
