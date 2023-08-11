import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import axios from "axios";
import styles from '@/styles/LiarGame.module.css';
import WordComponent from './WordComponent';


export default function Main() {
  console.log('LiarGame')
  return (
    <div>
      <LiarGame />
    </div>
  )
}

function LiarGame() {
  const [status, setStatus] = useState('ready')
  
  useEffect(() =>{
    setStatus('ready')
    // console.log('picktopic')
  },[])
  
  // useEffect(() => {
    //   setStatus('playing')
    //   console.log('word change?')
    // }, [word])
    
  return (
    <div>
      {
        status === 'ready' && (
          <Picktopic />
        )
      }
      {
        status === 'checkWord' && (
          <Checkword />  
        )
      }
    </div>
  )
}

function Picktopic() {
  const [word, setWord] = useState('abc')
  const [status, setStatus] = useState('ready')

  let [client, setClient] = useState({});
  
  const roomId = useSelector(state => state.room.currentRoomId );
  
  const handleTopicClick = (topic) => {
    console.log('topic', topic)
    axios({
      url: `http://localhost:80/game/mini/liar/set/${roomId}`,
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        "subject": topic
      }
    })
    .then((response) => {
      let data = response.data;
      console.log(data)
      setWord(data.word)
      setStatus('checkWord')
    })
    .catch(e => console.log('error!!!!!!!!!!', e));
  }
  
  console.log("setWord 성공?", word)
  
  // const connectSocket = () => {
  //   client.current = Stomp.over(() => {
  //     const sock = new SockJS("http://localhost:80/ws")
  //     return sock;
  //   });
  //   client.current.debug = () => { };
  // }
  
  // const subscribeSocket = (topic) => {
  //   client.current.connect({}, () => {
  //     // callback 함수 설정, 대부분 여기에 sub 함수 씀
  //     client.current.subscribe(`/mini/liar/set/${roomId}`, {topic}, (response) => {
  //       let data = JSON.parse(response.body)
  //       console.log(data)
  //     })
  //   })
  // }



  // useEffect(() => {
  //   connectSocket()
  //   subscribeSocket()
  // }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>주제를 골라주세요</h1>
      <div
        className="pickTopic"
        style={{
          position: 'relative',
          width: '600px',
          height: '600px',
          border: '2px solid #000',
          margin: '0 auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
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
    </div>
  )
}

function Checkword() {
    return (
      <div>asldjaslkdjlasdjaklsjd</div>
    )
}