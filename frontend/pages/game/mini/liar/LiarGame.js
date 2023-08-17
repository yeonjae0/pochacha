import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
// import styles from '@/styles/LiarGame.module.css';
import styles from '../../../../styles/LiarGame.module.css';
import Phase2 from './Phase2';

export default function Picktopic() {
  const [word, setWord] = useState('');
  const [status, setStatus] = useState('ready');
  const [client, setClient] = useState({});

  const roomId = useSelector(state => state.room.currentRoomId);
  const head = useSelector(state => state.player.currentHead);

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
        console.log("라이어게임 단어");
        console.log(data);

        setWord(data.word);
        setStatus('checkWord');
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
    if(head) {
      let sendData = {
        subject: topic,
      };
      if (client.current) {
        client.current.send(`/mini/liar/set/${roomId}`, {}, JSON.stringify(sendData));
      } else {
        alert("소켓 연결 실패!");
      }
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
          : <ShowWord word={word} />
      }
    </div>
  )
}

function ShowWord(props) {
  let word = props.word
  const [liar, setLiar] = useState(false) // false면 일반인, true면 라이어
  const [invisible, setInvisible] = useState(false)

  setTimeout(() => {
    setInvisible(true)
  }, 1000); // 일반인 & 라이어 단어 확인 시간, 빠른 테스트를 위한 시간 1초 설정(기존 값 = 7000)

  return (
    <div>
      {
        invisible == false ?
          (liar == false ? 
            <div className={styles.checkword}>
              <h1>단어를 확인하세요.</h1>
              <div>
                <h3>주어진 단어는 {word}입니다.<br/> 라이어에게 들기키 않게 설명하세요.</h3>
              </div>
            </div>
          : <div>당신은 라이어입니다.</div>)
          : <Phase2 />
      }
    </div>
  )
}
