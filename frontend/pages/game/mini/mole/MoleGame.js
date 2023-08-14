import { useState, useEffect } from 'react'
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
    <div style={{
      textAlign: 'center',
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -20%)'
    }}>
      <div><img src="/두더지_로고.png" style={{ marginTop: '30px', width: '400px' }} /></div>

      {ready === 'ready' && (
        <Ready />
      )}

      {ready === 'go' && (
        <Go />
      )}

      {ready === 'game' && sec > 0 && score < 30 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>{30 - score}마리만 더 잡아주세요! {sec}초 남았습니다!</h3>
          <div className={styles.container}>
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
                    width: '150px',
                    height: '150px',
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
                  width: '150px',
                  height: '150px',
                }}
              />
            )}
          </div>
        </div>
      )}

      {ready === 'game' && (sec <= 0 || score >= 30) && (
        <WinorLose score={score} sec={sec} />
      )}

    </div>
  )
}
/* 희진 : 메인 두더지 게임 끝 */

/* 희진 : 승패 여부 컴포넌트 시작 */
function WinorLose({ score, sec }) {
  return (
    <div>
      {
        score >= 30 ?
          <MissionCompleted score={score} sec={sec} />
          : <Gameover score={score} />
      }
    </div>
  )
}
/* 희진 : 승패 여부 컴포넌트 끝 */

/* 희진 : [승패 여부] Game Over 컴포넌트 시작 */
function Gameover({ score }) {

  let margin = 30 - score

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>{margin}마리가 부족해요 ~^^~</h3>
      <div className={styles.end}>
        <img className={styles.slideInEllipticBottomFwd} src="/두더지_X.png" />
      </div>
    </div>
  )
}
/* 희진 : Game Over 컴포넌트 끝 */

/* 희진 : [승패 여부] Mission Completed 컴포넌트 시작 */
function MissionCompleted({ score, sec }) {

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>성공 (추후 순위 추가 여부 결정)</h3>
      <div className={styles.end}>
        <img className={styles.bounceInBottom} src="/두더지_O.png" />
      </div>
    </div>
  )
}
/* 희진 : Mission Completed 컴포넌트 끝 */
