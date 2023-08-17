import React, { useState, useEffect, useInsertionEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "@/styles/SpellGame.module.css";
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { startGame, losingPlayer } from '@/store/reducers/spell';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function MainSpell({ sec, resetSec, currentPlayerIndex }) {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [randomConsonant, setRandomConsonant] = useState("");
  const [inputWords, setInputWords] = useState([]);  // 입력한 단어들 저장
  const [inputValue, setInputValue] = useState("");  // 유저 입력값 저장
  const [client, setClient] = useState({});
  // const [shouldGoToNextPlayer, setShouldGoToNextPlayer] = useState(0);
  const [cnt, setCnt] = useState(0)
  const roomId = useSelector(state => state.room.currentRoomId);
  const players = useSelector(state => state.players.players);
  const tmpPlayers = useSelector(state => state.players.tmpPlayers);
  const currentIdx = useSelector(state => state.spell.currentIdx);

  let updatedWords = []
  const router = useRouter()


  // Input창 단어 관련
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() && client.current) {
      let sendData = {
        "word": inputValue,
      }
      // setInputValue(sendData)
      console.log('inputValue', inputValue)
      console.log('sendData', sendData)
      // console.log('여기까지..?', data.correct) 
      client.current.send(`/mini/spell/confirm/${roomId}`, {}, JSON.stringify(sendData));
    } else {
      alert("소켓이 연결되지 않았습니다.");
    }
    // setInputWords((prevWords) => [...prevWords, inputValue]);
    // setInputValue("");

  }

  const setConsonant = () => {
    axios({
      url: "http://localhost:80/game/mini/spell",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        "id": roomId
      }
    }).then((response) => {
      let data = response.data;
      console.log('response.data', data)
      console.log('순서!!!!!', data.playerIdList)

      const randomConsonant = data.firstWord + data.secondWord;
      setRandomConsonant(data.firstWord + data.secondWord);
      dispatch(startGame(randomConsonant))
    }
    ).catch((error) => {
      if (error.response) {
        router.push({
          pathname: "/exception",
          query: { msg: error.response.data },
        })
      } else { console.log(error) }
    });
  }

  // 소켓 연결
  // const client = {};
  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws");
      return sock;
    });
    // client.current.debug = () => {};
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/game/${roomId}`, (response) => {
        // console.log('inputValues------------->', inputValue)
        var data = JSON.parse(response.body);
        console.log(data);
        console.log('틀렸or맞았', data.correct);
        // {data.correct ? setInputWords((prevWords) => [...prevWords, inputValue]): alert(data.msg)}
        if (data.correct) {   // 전달받은 값이 true면
          let newInputWord = data.inputWord;
          setInputWords((prevWords) => {
            let inList = false;
            console.log('updatedWords:', updatedWords);
            console.log('inputWords:', inputWords)
            console.log(prevWords)
            for (let i = 0; i < updatedWords.length; i++) {  // 중복 단어를 걸러서 리스트 업뎃
              // console.log('!!!!!!!!!!!!', updatedWords[i])
              if (newInputWord == updatedWords[i]) {
                setShowModal2(('이미 입력된 단어입니다.'))
                // alert('이미 입력된 단어입니다.')

                inList = true;
                break
              }
            };
            // 유효성 검사 최종 통과
            if (!inList) {
              updatedWords = [...prevWords, data.inputWord];
              console.log('players 정보', players)
              // tmpFn()
              console.log('updatedWords.length------>', updatedWords.length)

              setCnt((prevCnt) => (prevCnt + 1) % 4);
              // setCnt((cnt+1)%4);
              console.log('cnt!!!!!!!!!!!!!!!', cnt)
              console.log('currentIdx!!!!!!!!!', currentIdx)

              resetSec();
              // goToNextPlayer()
              // console.log('players 정보', players[0].nick)
              // goToNextPlayer()
              // console.log('현재 인덱스', currentPlayerIndex )
              // resetSec()
            //   setShouldGoToNextPlayer(shouldGoToNextPlayer+1); // 플레이어 전환을 위한 플래그 설정
          }
            return updatedWords;
          });
        } else {
          console.log('data.correct', data.correct);
          setShowModal2((data.msg))
          // alert(data.msg);
        }
        setInputValue("");


        // console.log('store저장2---------->', currentRandomConsonant)
      })  // 채팅 구독
    })
  }
 
  let playersIdList = Object.keys(tmpPlayers)  // tmpPlayers ID 값들 리스트로 받음
  useEffect(() => {
    connectSocket();
    subscribeSocket();
    setConsonant();
    console.log('tmpPlayers', tmpPlayers)
    // console.log(tmpPlayers[playersIdList[0]].nickname) 
    // console.log(tmpPlayers[playersIdList[1]].nickname) 
    // console.log(tmpPlayers[playersIdList[2]].nickname) 
    // console.log(tmpPlayers[playersIdList[3]].nickname) 
    console.log('tmpPlayers 확인', playersIdList)
  }, []);


  useEffect(()=>{
    setTimeout(() => {
      setShowModal(true);
      // return () => {
      //   clearTimeout(timeout);
      // };
    }, 5000);  // 설명 모달 시간 설정! 5초 정도? 임시로 1초
  })

  useEffect(()=>{
    setTimeout(() => {
      setShowModal2(false);
      // return () => {
      //   clearTimeout(timeout);
      // };
    }, 2000); 
  })



  useEffect(() => {   
    dispatch(losingPlayer(tmpPlayers[playersIdList[cnt]].nickname))

  }, [inputWords]);

  // useEffect(() => {
  //   goToNextPlayer()
  //   resetSec()
  //   // setShouldGoToNextPlayer(false);
  // }, [tmpFn])

  return (
    <>
      { (showModal == false) ?
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            {/* <img className="logoImg" src="/로고_훈민정음.png" /> */}
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*두 글자의 단어만 입력 가능합니다.*</p>

            <h4>제시된 초성: {randomConsonant}</h4>
          </div>
        </div>
    : null }
      {showModal2 && (
        <div className={styles.modalContainer2}>
          <div className={styles.modalContent2}>
            <p>{showModal2}</p>
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.upperContainer}>
      <div style={{ fontSize: '25px' }}>{tmpPlayers[playersIdList[cnt]].nickname}님의 차례입니다. {sec}초 남았습니다.</div>
      {/* <h4>{cnt}</h4> */}
          <input
            type="text"
            placeholder="단어를 입력하세요"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className={styles.inputContainer}
            // disabled={cnt !== currentPlayerIndex} // -> 이 부분은 멀티플레이 실행 후 계산
             />
          <button type="button" onClick={handleSubmit} style={{ marginLeft: '20px' }}>제출</button>
          <div><img src="/초성_로고.png" style={{ width: '450px' }} /></div>
        </div>

        <br />
        <div className={styles.redBlock}>
          <img
            src="/초성_세종대왕_기본.png"
            style={{
              position: "absolute",
              left: "60px",
              width: "350px",
              marginTop: "-300px",
            }}
          />
          <div className={styles.miniBlock1}></div>
          <div className={styles.miniBlock2}></div>
          <h3 style={{ fontFamily: 'ChosunCentennial', position: "absolute", left: "170px", zIndex: "1" }}>초성은 {randomConsonant}</h3>
          <img
            src="/초성_두루마리.png"
            style={{
              position: "absolute",
              width: "700px",
              left: "-130px",
              marginBottom: "-210px",
              zIndex: "0",
            }} />
          <div className={styles.wordsContainer}>
            {inputWords.map((word, index) => (
              <div
                key={index}
                className={styles.word}
                style={{
                  position: "absolute",
                  marginLeft: '20px',
                  marginTop: '195px',
                  fontFamily: 'ChosunCentennial',
                  left: `${(index % 8) * 50}px`,
                  top: `${Math.floor(index / 8) * 30}px`,
                }}
              >
                {word}
              </div>
            ))}
          </div>
          <h1>{sec}</h1>
          <label>
            단어를 입력하세요:
            <input type="text" value={inputValue} onChange={handleInput} onKeyDown={handleKeyDown} />
          </label>
          <button type="button" onClick={handleSubmit} >
            제출
          </button>
        </div>
      </div>
    </>
  );
}

// export default SpellGame;