import React, { useState, useEffect, useRef } from 'react';
import VoteLiarComponent from './VoteLiarComponent';
// import styles from '@/styles/LiarGame.module.css';
import styles from '../../../../styles/LiarGame.module.css';


export default function Phase2() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1); // 빠른 테스트를 위한 시간 1초 설정(기존 값 : minutes = 2, seconds = 0)
  const [status, setStatus] = useState('ing')

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          setStatus('done')
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const handleAddTime = () => {
    setSeconds(seconds + 30);
  };
  
  return (
    <div
          className="discuss"
        >  
        {
          (status === 'ing' && minutes >= 0 && seconds > 0) && (<><h1>토론을 해보세요</h1><h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.</h2></>)
        }
        {
          (status === 'ing' && minutes === 0 && seconds <= 30 && seconds >= 1 ) && (<button className={styles.addTimebtn} onClick={() => handleAddTime()}>시간 추가</button>)
        }
        {
          status === 'done' && (<VoteLiarComponent/>)
        }
        </div>
  )
}