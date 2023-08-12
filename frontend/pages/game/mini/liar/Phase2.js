import React, { useState, useEffect, useRef } from 'react';
import VoteLiarComponent from './VoteLiarComponent';

export default function Phase2() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
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
          style={{
            position: 'relative',
            width: '600px',
            height: '600px',
            margin: '0 auto',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >  
        {
          status === 'ing' ?
          ((minutes && seconds) ? (<><h1>토론을 해보세요</h1><h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.</h2></>) : ((minutes === 0 && seconds <= 30 ) && (<button onClick={() => handleAddTime()}>시간 추가</button>)))
          : <VoteLiarComponent />
        }
        </div>
  )
}