import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import styles from "@/styles/SpellGame.module.css";
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { startGame } from '@/store/reducers/spell'

const getConsonant = () => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [randomConsonant, setRandomConsonant] = useState("");
  const [inputWords, setInputWords] = useState([]);  // 입력한 단어들 저장
  const [inputValue, setInputValue] = useState("");  // 유저 입력값 저장
  const [client, setClient] = useState({});

  // const [sejong, setSejong] = usestate<string>("/초성_세종대왕_기본.png")
  const roomId = useSelector(state => state.room.currentRoomId);
  const currentRandomConsonant = useSelector(state => state.spell.currentConsonant)
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
      const randomConsonant = data.firstWord + data.secondWord;
      setRandomConsonant(data.firstWord + data.secondWord);
      dispatch(startGame(randomConsonant))
      // console.log('store저장1---------->', currentRandomConsonant)
    }
    ).catch((error) => {
      if(error.response) {
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
            for(let i = 0; i < updatedWords.length; i++) {  // 중복 단어를 걸러서 리스트 업뎃
              // console.log('!!!!!!!!!!!!', updatedWords[i])
              if(newInputWord == updatedWords[i]){
                alert('이미 입력된 단어입니다.')
                inList = true;
                break }};
            if (!inList) {
              updatedWords = [...prevWords, data.inputWord];
            }
              
            return updatedWords;
            
          });
        } else {
          console.log('data.correct', data.correct);
          alert(data.msg);
        }
        setInputValue(""); 


        // console.log('store저장2---------->', currentRandomConsonant)
      })  // 채팅 구독
    })
  }
  // useEffect(() => {

  // },[setInputWords] )

  useEffect(() => {
    connectSocket();
    subscribeSocket();
    setConsonant();
    // let updatedWords = null
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 1000);  // 설명 모달 시간 설정! 7초 정도? 임시로 1초

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const ModalPage = () => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            {/* <img className="logoImg" src="/로고_훈민정음.png" /> */}
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*두 글자의 단어만 입력 가능합니다.*</p>

            <h4>제시된 초성: {randomConsonant}</h4>
          </div>
        </div>
      );
    } else {
      document.body.style.overflow = "initial";
      return null;
    }
  };

  return (
    <>
      <ModalPage />

      <div className={styles.wrapper}>
        <div className={styles.upperContainer}>
          {/* 뒤로 가기 버튼 */}
          {/* <button type="button" onClick={() => router.back()}>Click here to go back</button> */}
          <input
            type="text"
            placeholder="단어를 입력하세요"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className={styles.inputContainer} />
          <button type="button" onClick={handleSubmit} style={{ marginLeft: '20px' }}>제출</button>
          <div><img src="/초성_로고.png" style={{ width: '450px' }} /></div>
        </div>

        <br />
        <div className={styles.redBlock}>
          <img
            src="/초성_세종대왕_기본.png"
            style={{
              position: "absolute",
              left: "125px",
              width: "350px",
              marginTop: "-350px",
            }}
          />
          <div className={styles.miniBlock1}></div>
          <div className={styles.miniBlock2}></div>
          <h3 style={{ fontFamily: 'ChosunCentennial', position: "absolute", left: "250px", zIndex: "1" }}>초성은 {randomConsonant}</h3>
          <img
            src="/초성_두루마리.png"
            style={{
              position: "absolute",
              width: "700px",
              left: "-50px",
              marginBottom: "-200px",
              zIndex: "0",
            }} />
          <div className={styles.wordsContainer}>
            {inputWords.map((word, index) => (
              <div
                key={index}
                className={styles.word}
                style={{
                  position: "absolute",
                  marginLeft: '100px',
                  marginTop: '250px',
                  fontFamily: 'ChosunCentennial',
                  left: `${(index % 8 ) * 50}px`,
                  top: `${Math.floor(index / 8) * 30}px`,
                }}
              >
                {word}
              </div>
            ))}
          </div>
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

export default getConsonant;
