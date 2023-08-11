import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Ready from './MoleReady.js'
import Go from './MoleGo.js'
import styles from '@/styles/MoleGame.module.css';

const getRandomGridPosition = () => ({
  row: Math.floor(Math.random() * 3), // 0, 1, 2
  col: Math.floor(Math.random() * 3), // 0, 1, 2
});

export default function Main({ sec }) {
  return (
    <div>
      <MoleGame sec={sec} />
    </div>
  )
}

/* 희진 : 메인 두더지 게임 시작 */
function MoleGame({ sec }) {

  const [score, setScore] = useState(0);
  const [molePositions, setMolePositions] = useState([]);
  const [showHitMole, setShowHitMole] = useState(false);
  const [hitMolePosition, setHitMolePosition] = useState({ row: 0, col: 0 });
  const [hoveredMoleIndex, setHoveredMoleIndex] = useState(-1);
  const [ready, setReady] = useState('ready')

  const handleMoleClick = (index) => {
    if (molePositions[index]) {
      setScore((prevScore) => prevScore + 1);
      setShowHitMole(true);
      setHitMolePosition(molePositions[index]);
      const newMolePositions = [...molePositions];
      newMolePositions[index] = null;
      setMolePositions(newMolePositions);
      setTimeout(() => {
        setShowHitMole(false);
      }, 1000);
    }
  };

  const handleMoleMouseEnter = (index) => {
    setHoveredMoleIndex(index);
  };

  const handleMoleMouseLeave = () => {
    setHoveredMoleIndex(-1);
  };

  useEffect(() => {
    const generateMole = () => {
      const freshMolePositions = Array(3).fill(null).map(() => getRandomGridPosition());
      setMolePositions(freshMolePositions);
    };

    const moleTimer = setInterval(generateMole, 1000);
    return () => clearInterval(moleTimer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setReady('go')
    }, 3000)

    setTimeout(() => {
      setReady('game')
    }, 5000)

  }, [])

  return (
    <div style={{ marginTop: '20px' }}>
      {ready === 'ready' && (
        <Ready />
      )}
      {ready === 'go' && (
        <Go />
      )}
      {ready === 'game' && sec > 0 && (
        <div style={{ textAlign: 'center' }}>
          <h1>{sec}초 동안 30마리의 두더지를 잡아라!</h1>
          <h2>OH MY GOD~ {score}마리의 두더지를 잡았군요</h2>
          <div
            className={styles.container}
            style={{
              position: 'relative',
              width: '600px',
              height: '600px',
              border: '2px solid #000',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            {molePositions.map((molePosition, index) => (
              molePosition && (
                <img
                  key={index}
                  src="/두더지_업.png"
                  onClick={() => handleMoleClick(index)}
                  style={{
                    position: 'absolute',
                    top: `${molePosition.row * 33.33}%`,
                    left: `${molePosition.col * 33.33}%`,
                    width: '200px',
                    height: '200px',
                    cursor: 'pointer',
                  }}
                />
              )
            ))}
            {showHitMole && (
              <img
                src="/두더지_망치후.png"
                style={{
                  position: 'absolute',
                  top: `${hitMolePosition.row * 33.33}%`,
                  left: `${hitMolePosition.col * 33.33}%`,
                  width: '200px',
                  height: '200px',
                }}
              />
            )}
          </div>
        </div>
      )}
      {ready === 'game' && sec <= 0 && (
        <WinorLose score={score} />
      )}
    </div>
  )
}
/* 희진 : 메인 두더지 게임 끝 */

/* 희진 : 승패 여부 컴포넌트 시작 */
function WinorLose({ score }) {
  return (
    <div>
      {
        score >= 30 ?
          <MissionCompleted score={score} />
          : <Gameover score={score} />
      }
    </div>
  )
}
/* 희진 : 승패 여부 컴포넌트 끝 */

/* 희진 : [승패 여부] Game Over 컴포넌트 시작 */
function Gameover({ score }) {

  const router = useRouter()

  let margin = 30 - score

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>시간 초과</h1>
      <h2>{margin}마리가 부족해요 ~^^~</h2>
      <div
        className={styles.end}
        style={{
          position: 'relative',
          width: '600px',
          height: '600px',
          border: '2px solid #000',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        <img className={styles.slideInEllipticBottomFwd} src="/두더지_X.png" />
      </div>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
    </div>
  )
}
/* 희진 : Game Over 컴포넌트 끝 */

/* 희진 : [승패 여부] Mission Completed 컴포넌트 시작 */
function MissionCompleted({ score }) {

  const router = useRouter()

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>성공</h1>
      <h2>{score}마리나 잡다니 대단해~</h2>
      <div
        className={styles.end}
        style={{
          position: 'relative',
          width: '600px',
          height: '600px',
          border: '2px solid #000',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        <img className={styles.bounceInBottom} src="/두더지_O.png" />
      </div>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
    </div>
  )
}
/* 희진 : Mission Completed 컴포넌트 끝 */
