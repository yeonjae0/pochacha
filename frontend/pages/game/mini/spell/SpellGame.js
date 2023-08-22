import React, { useState, useEffect, useInsertionEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "@/styles/SpellGame.module.css";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { startGame, losingPlayer, setCurrentPlayer } from "@/store/reducers/spell";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function MainSpell({ sec, resetSec }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [randomConsonant, setRandomConsonant] = useState("");

  const [inputWords, setInputWords] = useState([]); // 입력한 단어들 저장
  const [client] = useState({}); // 소켓

  const roomId = useSelector((state) => state.room.currentRoomId);
  const tmpPlayers = useSelector((state) => state.players.tmpPlayers);

  // STT를 위한 추가
  let currentPlayerId = useSelector((state) => state.spell.currentPlayerId);
  const playerId = useSelector((state) => state.player.currentPlayerId);
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const router = useRouter();

  // 단어 입력되었을 경우 호출
  const handleSubmit = () => {
    let isAlready = false;
    for (let w of inputWords) {
      // 중복 단어를 걸러서 리스트 업뎃
      if (transcript == w) {
        setShowModal2("이미 입력된 단어입니다.");
        isAlready = true;
        return; // 함수 종료
      }
    }
    if (isAlready) {
      return; // 함수 종료
    } else if (client.current) {
      // 단어 전송
      client.current.send(
        `/mini/spell/confirm/${roomId}`,
        {},
        JSON.stringify({ word: transcript.trim() })
      );
    } else {
      setShowModal2("소켓이 연결되지 않았습니다.");
    }
  };

  // 최초 한 번 단어 받기
  const setConsonant = () => {
    axios({
      url: process.env.NEXT_PUBLIC_API + "/game/mini/spell",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      data: {
        id: roomId,
      },
    })
      .then((response) => {
        let data = response.data;
        resetTranscript();

        dispatch(setCurrentPlayer({ id: data.currentPlayerId }));

        const randomConsonant = data.firstWord + data.secondWord;
        setRandomConsonant(randomConsonant); // 단어 초기화
        dispatch(startGame(randomConsonant));
      })
      .catch((error) => {
        if (error.response) {
          router.push({
            pathname: "/exception",
            query: { msg: error.response.data },
          });
        } else {
          console.log(error);
        }
      });
  };

  // 소켓 연결
  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(process.env.NEXT_PUBLIC_WS + "/ws");
      return sock;
    });
  };

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/mini/spell/${roomId}`, async (response) => {
        var data = JSON.parse(response.body);
        resetTranscript();

        if (data.correct) {
          // 맞았을 경우
          const updatedWords = [...inputWords, data.inputWord];
          setInputWords(prevWords => {
            const updatedWords = [...prevWords, data.inputWord];
            return updatedWords;
          }); // 단어 저장
          dispatch(setCurrentPlayer({ id: data.currentPlayerId }));
          resetSec();
        } else {
          // 틀렸을 경우
          setShowModal2(data.inputWord + " : " + data.msg);
        }
      }); // 훈민정음 구독
    });
  };

  useEffect(() => {
    // 최초 한 번 실행
    connectSocket();
    subscribeSocket();
    setConsonant();
  }, []);

  useEffect(() => {
    // 렌더링 마다 실행
    // 설명 모달 시간 설정
    setTimeout(() => {
      setShowModal(true);
    }, 5000);

    setTimeout(() => {
      setShowModal2(false);
    }, 3000); 
  })

  useEffect(() => {
    if (transcript.trim().length >= 2 && currentPlayerId == playerId) {
      // 값이 입력 되었을 경우
      SpeechRecognition.stopListening();
      setTimeout(() => {
        handleSubmit();
      }, 500);
    }
  }, [transcript]);

  useEffect(() => {
    if (currentPlayerId == playerId) {
      // 본인이 현 순서일 경우
      SpeechRecognition.startListening({ continuous: true }); // 마이크 열기
    } else {
      SpeechRecognition.stopListening(); // 마이크 닫기
    }
  });

  return (
    <>
      {showModal == false ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*두 글자의 단어만 입력 가능합니다.*</p>

            <h4>제시된 초성: {randomConsonant}</h4>
          </div>
        </div>
      ) : null}
      {showModal2 && (
        <div className={styles.modalContainer2}>
          <div className={styles.modalContent2}>
            <p>{showModal2}</p>
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.upperContainer}>
          <div style={{ fontSize: "25px" }}>
            {tmpPlayers[currentPlayerId] && tmpPlayers[currentPlayerId].nickname} 님의 차례입니다.{" "}
            {sec}초 남았습니다.
          </div>
          {currentPlayerId == playerId && (
            <input
              type="text"
              placeholder="단어를 입력하세요"
              value={transcript}
              className={styles.inputContainer}
            />
          )}
          {listening && <span>음성 입력 중..</span>}
          <button type="button" onClick={handleSubmit} style={{ marginLeft: "20px" }}>
            제출
          </button>
          <div>
            <img src="/초성_로고.png" style={{ width: "450px" }} />
          </div>
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
          <h3
            style={{
              fontFamily: "ChosunCentennial",
              position: "absolute",
              left: "170px",
              zIndex: "1",
            }}
          >
            초성은 {randomConsonant}
          </h3>
          <img
            src="/초성_두루마리.png"
            style={{
              position: "absolute",
              width: "700px",
              left: "-130px",
              marginBottom: "-210px",
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
                  marginLeft: "20px",
                  marginTop: "195px",
                  fontFamily: "ChosunCentennial",
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
            <input type="text" value={transcript} />
          </label>
          <button type="button" onClick={handleSubmit}>
            제출
          </button>
        </div>
      </div>
    </>
  );
}
