'use client'
import React, { useState, useEffect, useRef } from 'react';
import LiarGame from './LiarGame';
import styles from '@/styles/LiarGame.module.css';


export default function Liar() {
  const [sec, setSec] = useState(0);
  const time = useRef(14);
  const timerId = useRef(null);
  const [rule, setRule] = useState(1)


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
      setRule(null)
    }
  })

  // 룰 설명을 위한 3초 간격 Timeout & setRule
  useEffect(() => {
    setTimeout(() => {
      setRule(2)
    }, 3000)

    setTimeout(() => {
      setRule(3)
    }, 6000)

    setTimeout(() => {
      setRule(4)
    }, 9000)

    setTimeout(() => {
      setRule(5)
    }, 12000)

  }, [])

  return (
    <>
    <div className={styles.title_container}>
    <img src='' alt='Liar game Title' width={300} height={100} />
    </div>
    <div className={styles.game_container}>
      {
        rule === 1 && (
          <h2>주제를 고르고 한 명씩 제시어를 확인합니다.</h2>
        )
      }
      {
        rule === 2 && (
          <h2>제시어를 확인한 뒤,<br/>
          정해진 순서로 한 명씩 제시어를 설명합니다.</h2>
        )
      }
      {
        rule === 3 && (
          <h2>라이어가 아닌 사람은<br/>
            라이어에게 제시어가 들키지 않도록<br/>
            선을 지켜가면서 설명해야 합니다.</h2>
        )
      }
      {
        rule === 4 && (
          <h2>그리고 라이어는 정체가 들키지 않도록<br/>
          거짓말을 하면 됩니다.</h2>
        )
      }
      {
        rule === 5 && (
          <h2>자 이제 게임을 시작해볼까요!</h2>
        )
      }
      {
        rule === null && (
          <LiarGame/>
      )
      }
    </div>
    </>
  )
}
