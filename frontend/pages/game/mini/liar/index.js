'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/LiarGame.module.css'

import WordComponent from './WordComponent'
import LiarComponent from './LiarComponent'
import VoteLiarComponent from './VoteLiarComponent'

/*
<구현 로직>
현재 사용자 === liar? (LiarComponent) : (WordComponent)
단어 설명하는 UI 여기서 구현

턴 종료 내지 타임아웃 시에 (VoteLiarComponent)

투표 완료 후 집계 화면 ... -> 컴포넌트화
승패화면 ... -> 컴포넌트화
*/
export default function Liar() {
  //const topics = ['동물', '국가', '가수', '사물', '음식', '스포츠']

  /*
    TO DO :: LIAR 설정 API 호출 후 값 REDIS 저장 후 사용
  */
  let liar = true; //임의의 값으로 liar 설정 (api 연결x)

    /*
    TO DO :: 턴 종료 시 투표 진행 및 집계 API 호출
    */
  let vote = false; //임의의 값으로 투표 여부 설정 (api 연결x)

  const nickname = "엉뚱한 유영"; //임의의 닉네임

/* 혜지 : 임시로 웹캠 화면 띄우기 위한 구현 시작 */
  let videoRef = useRef(null)

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true
    })
      .then((stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((error) => {
        console.log("WEBCAM ERROR")
      })
  }

  useEffect(() => {
    getUserCamera();
  }, [videoRef])
  /* 혜지 : 임시로 웹캠 화면 띄우기 위한 구현 끝 */

  return (
    <div className={styles.container}>
      {
        /*
          TO DO :: OpenVidu 컴포넌트로 변경
        */
      }
      <div className={styles.camComponent1} >
      <video className={styles.cam} ref={videoRef} /> {/* 임시 화상화면 상자 */}
        <div className={styles.nickname}>{nickname}</div>
      </div>
      <div className={styles.camComponent2} >
        <video className={styles.cam} ref={videoRef} /> {/* 임시 화상화면 상자 */}
        <div className={styles.nickname}>{nickname}</div>
      </div>
      <div className={styles.camComponent3} >
      <video className={styles.cam} ref={videoRef} /> {/* 임시 화상화면 상자 */}
        <div className={styles.nickname}>{nickname}</div>
      </div>
      <div className={styles.camComponent4} >
      <video className={styles.cam} ref={videoRef} /> {/* 임시 화상화면 상자 */}
      <div className={styles.nickname}>{nickname}</div>
      </div>
        
        <div className={styles.roof}>
          <img className={styles.title} src="/main/title.png" />
          {/*            
          TO DO :: 라이어 게임 타이틀로 변경
         */}
        </div>
          <div className={styles.boxContainer}>
        <div className={styles.box}>
          {
            liar === true ?
            <LiarComponent />
              : <WordComponent />
          }
          {
            vote === true ?
              <VoteLiarComponent />
              : null
          }
            </div>
          </div>            
      <div>
   
        {/* <p>주제를 선택해주세요!</p>
        {
          topics.map((topic, i) => {
            return (
              <button>{topic}</button>
            )
          })
        } */}
      </div>
      <br/>
    </div>
  )
}
