import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Ready from './MoleReady';
import Go from './MoleGo';
import styles from '@/styles/MoleGame.module.css';

const getRandomGridPosition = () => ({
  row: Math.floor(Math.random() * 3), // 0, 1, 2
  col: Math.floor(Math.random() * 3), // 0, 1, 2
});

export default function Main({ sec }) {

  return (
    <div>
      <MoleGame sec={sec}/>
    </div>
  )
}

/* 희진 : 메인 두더지 게임 시작 */
function MoleGame({ sec }) {
  const roomId = useSelector(state => state.room.currentRoomId);
  const currentPlayer = useSelector(state => state.player);

  const [client, setClient] = useState({});

  const [score, setScore] = useState(0);
  const [molePositions, setMolePositions] = useState([]);
  const [showHitMole, setShowHitMole] = useState(false);
  const [hitMolePosition, setHitMolePosition] = useState({ row: 0, col: 0 });
  const [hoveredMoleIndex, setHoveredMoleIndex] = useState(-1);
  const [ready, setReady] = useState('ready')
  const [result, setResult] = useState(null)

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws");
      return sock;
    });
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/mini/mole/${roomId}`, (response) => {
        let data = JSON.parse(response.body);
        if (data.finish) {
          setReady('done')
          setResult(data.result)
        }
      })
    })
  }
  
  useEffect(() => {
    connectSocket();
    subscribeSocket();
  }, [])

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

  const handleOnClick = () => {
    let sendData = {
      "playerId": currentPlayer.currentPlayerId,
      "score": score,
    };
    if (client.current) {
      client.current.send(`/mini/mole/${roomId}`, {}, JSON.stringify(sendData));
    } else {
      alert("소켓 연결 실패!");
    }
  }

  return (
    <div style={{
      textAlign: 'center',
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -20%)'
    }}>
      <div><img src="/두더지_로고.png" style={{ marginTop: '20px', width: '400px' }} /></div>

      {ready === 'ready' && (
        <Ready />
      )}

      {ready === 'go' && (
        <Go />
      )}

      {/* 30초 동안 가장 많이 잡는 사람 순으로 랭킹 */}
      {ready === 'game' && sec > 0 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>{score}마리를 잡았어요! {sec}초 남았습니다!</h3>
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

      {ready === 'game' && sec <= 0 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>{score}마리 잡기 성공!</h3>
          <h3>화면을 클릭해 친구들의 점수를 확인하세요!</h3>
          <div className={styles.end}>
            <img className={styles.bounceInBottom} src="/두더지_O.png" onClick={handleOnClick}/>
          </div>
        </div>
      )}
      {
        ready === 'done' && result != null && (
          <Result result={result}/>
        )
      }

    </div>
  )
}
/* 희진 : 메인 두더지 게임 끝 */

/* 희진 : 결과 컴포넌트 시작 */
function Result(props) {
  const players = useSelector(state => state.players.tmpPlayers)
  let result = props.result

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>순위 결과</h2>
      <div className={styles.resultContainer}>
        <div className={styles.scoreBoard}>
          {
            result.map((player, i) => (
            <div key={i} className={styles.resultRow}>{players[player.playerId].nickname}
              <span>:</span>
              <span style={{fontSize: 'xx-large'}}>{player.score}</span>
            </div> 
            ))
          }
        </div>
      </div>
    </div>
  )
}
