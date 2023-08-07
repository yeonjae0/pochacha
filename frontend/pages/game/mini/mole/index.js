import { useState, useEffect } from 'react';

export default function MoleGame () {
  const [score, setScore] = useState(0);
  const [moleUp, setmoleUp] = useState(false);

  // 두더지가 나타나는 빈도와 게임 진행 간격을 설정합니다.
  const moleInterval = 2000; // 깜빡이 빈도, 2초
  const gameTime = 20000; // 게임 진행 시간, 20초

  // 게임 시작 후 일정 시간마다 두더지를 보이게 하거나 숨기는 함수
  useEffect(() => {
    const moleTimer = setInterval(() => {
      setmoleUp(true);
      setTimeout(() => {
        setmoleUp(false);
      }, moleInterval * 0.5) // 두더지가 보이는 시간 (1초)
    }, moleInterval)

    setTimeout(() => {
      clearInterval(moleTimer)
      alert('Game Over! Your score: ' + score);
    }, gameTime)

    return () => {
      clearInterval(moleTimer)
    }
  }, [score])

  // 두더지를 클릭했을 때 점수를 올리는 함수
  const handleMoleClick = () => {
    if (moleUp) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  return (
    <div>
      <h1>두더지 게임</h1>
      <p>Score: {score}</p>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: moleUp ? 'brown' : 'transparent',
          cursor: moleUp ? 'pointer' : 'default',
        }}
        onClick={handleMoleClick}
      />
    </div>
  )
}
