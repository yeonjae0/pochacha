import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from '@/styles/LiarGame.module.css';
import Phase2 from './Phase2';

export default function Picktopic() {
  const roomId = useSelector(state => state.room.currentRoomId);
  const currentPlayer = useSelector(state => state.player);

  const [word, setWord] = useState('');
  const [status, setStatus] = useState('ready');
  const [client, setClient] = useState({});
  const [liar, setLiar] = useState(null);

  
  /* 혜지 : 소켓 연결 시작 */
  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(process.env.NEXT_PUBLIC_WS + "/ws");
      return sock;
    });
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/mini/liar/set/${roomId}`, (response) => {
        let data = JSON.parse(response.body);

        setWord(data.word);
        setStatus('checkWord');
        setLiar(data.liar);
      })
    })
  }

  useEffect(() => {
    connectSocket();
    subscribeSocket();
  }, [])
  /* 혜지 : 소켓 연결 완료 */

  //방장 주제 전송
  const handleTopicClick = (topic) => {
    if(currentPlayer.currentHead) {
      let sendData = {
        subject: topic,
      };
      if (client.current) {
        client.current.send(`/mini/liar/set/${roomId}`, {}, JSON.stringify(sendData));
      } else {
        alert("소켓 연결 실패!");
      }
    } else {
      alert("방장이 주제를 선택해주세요.")
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {
        status == 'ready' ?
          (
                <div>
                    <h1>주제를 골라주세요</h1>
                    <br />
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.button}
                        onClick={() => handleTopicClick('animal')}>동물</button>
                      <button
                        className={styles.button}
                        onClick={() => handleTopicClick('country')}>나라</button>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.button}
                        onClick={() => handleTopicClick('food')}>음식</button>
                      <button
                        className={styles.button}
                        onClick={() => handleTopicClick('objects')}>사물</button>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.button}
                        onClick={() => handleTopicClick('singer')}>가수</button>
                      <button
                        className={styles.button}
                        onClick={() => handleTopicClick('sports')}>스포츠</button>
                    </div>
                  </div>
              )
          : <ShowWord word={word} liar={liar} currentPlayer={currentPlayer.currentPlayerId}/>
      }
    </div>
  )
}

function ShowWord(props) {
  let word = props.word
  let isLiar = null
   // false면 일반인, true면 라이어
   if (props.currentPlayer === props.liar) {
    isLiar = true
   } else {
    isLiar = false
   }
  const [invisible, setInvisible] = useState(false)

  setTimeout(() => {
    setInvisible(true)
  }, 7000); // 일반인 & 라이어 단어 확인 시간, 빠른 테스트를 위한 시간 1초 설정(기존 값 = 7000)

  return (
    <div>
      {
        invisible == false ?
          (isLiar == false ? 
            <div className={styles.checkword}>
              <h1>단어를 확인하세요.</h1>
              <div>
                <h3>주어진 단어는 <span style={{fontSize: 'xx-large'}}>{word}</span> 입니다.<br/> 라이어에게 들키지 않게 설명하세요.</h3>
              </div>
            </div>
          : <h1>당신은 라이어입니다.</h1>)
          : <Phase2 />
      }
    </div>
  )
}
