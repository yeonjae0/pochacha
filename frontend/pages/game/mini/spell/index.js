import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/SpellGame.module.css";
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { useSelector } from "react-redux";

// let randomConsonant = 'ㄱ ㅅ

const getConsonant = () => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [randomConsonant, setRandomConsonant] = useState("");
  const [inputWords, setInputWords] = useState([]);  // 입력한 단어들 저장
  const [inputValue, setInputValue] = useState("");  // 유저 입력값 저장
  const roomId = useSelector(state => state.room.currentRoomId );
  const [client, setClient] = useState({});

  // Input창 단어 관련
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }};

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      if(client.current) {
        let sendData = {
          "word" : inputValue,
          
        }
        client.current.send(`/mini/spell/confirm/${roomId}`, {}, JSON.stringify(sendData));
      } else {
        alert("소켓이 연결되지 않았습니다.");
      }
      setInputWords((prevWords) => [...prevWords, inputValue]);
      setInputValue("");
    }
  };

  const setConsonant = () => {
    axios({
      url: "http://localhost:80/game/mini/spell",
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        "id" : roomId
      }
    }).then((response) => {
      let data = response.data;
      setRandomConsonant(data.firstWord + data.secondWord);
    }
    ).catch(e => console.log(e));
  }

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
        var data = JSON.parse(response.body);
        console.log(data);
      })  // 채팅 구독
    })
  }

  useEffect(() => {
    connectSocket();
    subscribeSocket();
    setConsonant();
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 7000);

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
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*세종대왕님이 보고 계십니다*</p>
            <p>*사전에 등재된 단어만 입력해주세요.*</p>
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
        <div className={styles.text}>
          <h1>초성 게임</h1>
          <label>
            단어를 입력하세요:
            <input type="text" value={inputValue} onChange={handleInput} onKeyDown={handleKeyDown} />
          </label>
          <button type="button" onClick={handleSubmit} >
            제출
          </button>
        </div>
        <br />
        <div className={styles.redBlock}>
          <img
            src="/세종대왕_기본.png"
            style={{
              position: "absolute",
              left: "125px",
              width: "350px",
              marginTop: "-350px",
            }}
          />
          <div className={styles.miniBlock1}></div>
          <div className={styles.miniBlock2}></div>
          <h3
            style={{
              position: "absolute",
              backgroundColor: "Yellow",
              left: "250px",
              zIndex: "1",
            }}
          >
            초성: {randomConsonant}
          </h3>
          <img
            src="/두루마리.png"
            style={{
              position: "absolute",
              width: "600px",
              left: "0px",
              marginBottom: "-150px",
              zIndex: "0",
            }}
          />
           <div className={styles.wordsContainer}>
          {inputWords.map((word, index) => (
            <div
              key={index}
              className={styles.word}
              style={{
                position: "absolute",
                left: `${(index % 4) * 150}px`,
                top: `${Math.floor(index / 4) * 50}px`,
              }}
            >
              {word}
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default getConsonant;
