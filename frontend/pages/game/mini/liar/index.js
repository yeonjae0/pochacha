'use client'

import React, { useState, useEffect, useRef } from 'react';
import LiarGame from './LiarGame';
import styles from '@/styles/LiarGame.module.css';

export default function Liar() {
  const [sec, setSec] = useState(0);
  const time = useRef(14); // 총 룰 설명 시간
  const timerId = useRef(null);
  const [rule, setRule] = useState(null) // 제정 : 빠른 테스트를 위한 rule값 null 설정(기존 값 = 1)
  /* 제정 : 빠른 테스트를 위한 룰 설명 주석 처리 시작 */
  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     setSec(time.current % 60);
  //     time.current -= 1;
  //   }, 1000);
  //   return () => clearInterval(timerId.current);
  // }, []);

  // useEffect(() => {
  //   if (time.current <= -1) {
  //     // console.log('시간 초과')
  //     clearInterval(timerId.current);
  //     setRule(null)
  //   }
  // })

  // // 룰 설명을 위한 3초 간격 Timeout & setRule
  // useEffect(() => {
  //   setTimeout(() => {
  //     setRule(2)
  //   }, 3000)

  //   setTimeout(() => {
  //     setRule(3)
  //   }, 6000)

  //   setTimeout(() => {
  //     setRule(4)
  //   }, 9000)

  //   setTimeout(() => {
  //     setRule(5)
  //   }, 12000)

  //   setTimeout(() => {
  //     setRule(null)
  //   }, 14000)

  // }, [])
  /* 제정 : 빠른 테스트를 위한 룰 설명 주석 처리 끝 */

  return (
    <>
    {/* <div className={styles.title_container}> */}
    <div
    style={{
      textAlign: 'center',
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translate(-50%, -10%)'
    }}>
    <img src='/라이어_로고.png' alt='Liar game Title' style={{ width: '300px', height: '100px' }} />
    </div>
    <div className={styles.game_container}>
      {/* 제정 : 빠른 테스트를 위한 룰 설명 주석 처리 시작 */}
      {/* {
        rule === 1 && (
          <h2>주제를 고르고 한 명씩 제시어를 확인합니다.</h2>
        )
      }
      {
        rule === 2 && (
          <h2 style={{textAlign: 'center'}}>제시어를 확인한 뒤,<br/>
          정해진 순서로 한 명씩 제시어를 설명합니다.</h2>
        )
      }
      {
        rule === 3 && (
          <h2 style={{textAlign: 'center'}}>라이어가 아닌 사람은<br/>
            라이어에게 제시어가 들키지 않도록<br/>
            선을 지켜가면서 설명해야 합니다.</h2>
        )
      }
      {
        rule === 4 && (
          <h2 style={{textAlign: 'center'}}>그리고 라이어는 정체가 들키지 않도록<br/>
          거짓말을 하면 됩니다.</h2>
        )
      }
      {
        rule === 5 && (
          <h2>자 이제 게임을 시작해볼까요!</h2>
        )
      } */}
      {/* 제정 : 빠른 테스트를 위한 룰 설명 주석 처리 끝 */}
      {
        rule === null && (
          <LiarGame />
      )
      }
    </div>
    </>
  )
}
