import { useState, useEffect } from 'react';
import Ready from './MoleReady';
import Go from './MoleGo';
import styles from '@/styles/MoleGame.module.css';

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from 'react-redux';

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

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const [client, setClient] = useState({});
  const [records, setRecords] = useState([]);

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

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(process.env.NEXT_PUBLIC_WS + "/ws")
      return sock;
    });
    client.current.debug = () => { };
  };

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(`/topic/mole/${roomId}`, (response) => {
        let data = JSON.parse(response.body);
        
        setRecords((prevRecords) => [...prevRecords, data].sort(function(a, b) {
          if(a.second!=b.second) {
            return a.second - b.second;
          } else {
            return a.milliSecond - b.milliSecond;
          }
        }))
        
      });
    });
  };

  useEffect(() => {
    connectSocket();
    subscribeSocket();

    const generateMole = () => {
      const freshMolePositions = Array(3).fill(null).map(() => getRandomGridPosition());
      setMolePositions(freshMolePositions);
    };

    const moleTimer = setInterval(generateMole, 1000);
    return () => clearInterval(moleTimer);
  }, []);

  /* 태훈 : 시간 측정 코드 시작 */
  useEffect(() => {

    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // 10밀리초씩 증가
      }, 10);
      setRunning(true);
    }

    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  }, [running])
  /* 태훈 : 시간 측정 코드 끝 */

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
      <div><img src="/두더지_로고.png" style={{ marginTop: '80px', width: '350px' }} /></div>

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

      {ready === 'game' && (sec <= 0 || score >= 30) && millisec <= 0 (
        <WinorLose score={score} sec={sec} time={time} />
      )}

    </div>
  )
}
/* 희진 : 메인 두더지 게임 끝 */

/* 희진 : 승패 여부 컴포넌트 시작 */
function WinorLose({ score, sec, time }) {

  useSelector(state=>state.player.currentPlayerId)

  return (
    <div>
      {
        score >= 30 ?
          <MissionCompleted score={score} sec={sec} time={time} />
          : <Gameover score={score} />
      }
    </div>
  )
}
/* 희진 : 승패 여부 컴포넌트 끝 */

/* 희진 : [승패 여부] Game Over 컴포넌트 시작 */
function Gameover({ score }) {

  let margin = 30 - score

  useEffect(async () => {
    let sendData = {
      userId: "userId", 
      recordSecond: 30, 
      recordMilliSecond: 0
    }

    setTimeout(() => {
      client.current.send("/mini/mole/time" + roomId, {}, JSON.stringify(sendData));
    }, 100); // 비동기화 문제 (시간 조절)
  }, [])

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
function MissionCompleted({ score, sec, time }) {

  /* 태훈 : 밀리세컨드 단위의 초 계산 함수 시작 */
  const formatTime = (milliseconds) =>  {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    // return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${remainingMilliseconds}`;
    return {second: seconds, milliSecond: remainingMilliseconds}
  };
  /* 태훈 : 밀리세컨드 단위의 초 계산 함수 끝 */

  useEffect(async () => {
    let recordObj = await formatTime(time)
    let sendData = {
      userId: "userId", 
      recordSecond: recordObj["second"], 
      recordMilliSecond: recordObj["milliSecond"]
    }

    setTimeout(() => {
      client.current.send("/mini/mole/time" + roomId, {}, JSON.stringify(sendData));
    }, 100); // 비동기화 문제 (시간 조절)
  }, [])

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
