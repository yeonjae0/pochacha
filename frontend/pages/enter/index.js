'use client'

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import RightBox from "./RightBox.js";
import MusicPlayer from "../data/MusicPlayer.js";
import styles from "@/styles/EnterPage.module.css";
import classNames from "classnames";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { enterRoom } from "@/store/reducers/room.js";
import { setMyData } from "@/store/reducers/player.js";
import { addPlayers, resetPlayers } from "@/store/reducers/players.js";

/* 방장 입장 페이지 */
export default function EnterPage() {

  const router = useRouter();
  const dispatch = useDispatch();

  /* 유영 : 소켓 간단 연결 작업 시작 */
  useEffect(() => {
    const socket = new SockJS("http://localhost:80/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      /*Connect Callback*/() => {
        console.log("Socket Connected.");
      }
    );
  }, []);
  /* 유영 : 소켓 간단 연결 작업 끝 */

  /* 유영 배경음악 임시 주석 */
  // const audio = new Audio('/music/enter_bgm.mp3');

  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 시작 */
  /* 희진 : axios 렌더링 타이밍 변경 시작 (페이지 로딩 시 최초 1회) */
  let roomId = "";
  let progress = false;
  let secret = false;

  let playerId = "";
  let nick = "";
  let ready = false;

  let obj = {};

  /* 혜지 : 웹캠 화면 띄우기 위한 구현 시작 */
  let videoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);
  /* 혜지 : 웹캠 화면 띄우기 위한 구현 끝 */

  /* 유영 배경음악 임시 주석 */
  // useEffect(() => {
  //     playBGM();
  //     window.addEventListener("beforeunload", onbeforeunload);
  // }, []);

  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  const enterDown = (e) => {
    if (e.key === "Enter") {
      gameStart();
    }
  };

  const gameStart = () => {
    axios({
      url: "http://localhost:80/enter",
      header: {
        Accept: "application/json",
        "Content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      data: {
        nickname: text,
      },
    })
      .then((response) => {
        // console.log("GAME START");
        // console.log("response.data", response.data);

        obj = {
          roomId: response.data.room.id, //오픈비두 세션
          progress: response.data.room.progress,
          secret: response.data.room.secret, // 비밀 방인지, 아닌지
          nick: text || response.data.player.nickname,
          playerId: response.data.player.id, //오픈비두 토큰
          ready: response.data.player.ready,
        };
        let playerInfo = {
          playerId: response.data.player.id, // -> room에서 주기
          nick: text || response.data.player.nickname, // -> room에서 주기
          ready: response.data.player.ready,
          head: true, //방을 연 사람이므로 방장 true
        };
        // console.log(playerInfo);
        const sendData = () => {
          /* 연재 : obj 정보 저장 */
          dispatch(
            enterRoom({
              roomId: response.data.room.id, //오픈비두 세션
              progress: response.data.room.progress,
              secret: response.data.room.secret,
            })
          );
          // dispatch(addPlayers(playerInfo));
          dispatch(setMyData(playerInfo));
          console.log()

          /* 희진 : URL 숨김 시작 */
          router.push(
            {
              pathname: `/room/${response.data.room.id}`,
              query: { currentName: JSON.stringify(obj) },
            },
            `/room/${response.data.room.id}`
          );
        };
        sendData();
      })
      /* 희진 : URL 숨김 끝 */

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
  /* 희진 : axios 렌더링 타이밍 변경 끝 */

  /* 유영 배경음악 임시 주석 */
  // const playBGM = async() => {
  //   /*
  //     ✔ Music provided by 셀바이뮤직
  //     🎵 Title : 배달은 자신있어 by 배달의민족
  //     https://sellbuymusic.com/md/micwcfw-jcncnhn
  //   */
  //   await audio.play();
  // };

  // const onbeforeunload = (e) => {
  //   audio.pause();
  //   audio.currentTime = 0;
  // };

  const [audio, setAudio] = useState(null);

  const playPop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio('/music/pop.mp3');
    newAudio.play();
    setAudio(newAudio);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'none' }}>
        <MusicPlayer />
      </div>
      {/* 타이틀 화면 */}
      <div className="roof">
        <img className={styles.title} src="/main/title.png" />
      </div>

      <div className={styles.boxContainer}>
        {/* 닉네임 입력 상자 */}
        <div className={classNames({ [styles.box]: true, [styles.leftBox]: true })}>
          <video className={styles.cam} ref={videoRef} /> {/* 임시 화상화면 상자 */}
          <div className={styles.inputContainer}>
            <input
              className={styles.nickname}
              spellCheck="false"
              placeholder="닉네임을 입력해주세요."
              value={text}
              onChange={handleOnChange}
              onKeyDown={enterDown}
            />
          </div>
          <button className={styles.startContainer} onClick={gameStart}>
          <img className={styles.startBtn} onClick={playPop} src="/main/startBtn.png" />
        </button>
      </div>
      <div className={styles.box}>
        <RightBox />
      </div>
    </div>
    </div >
  );
}

EnterPage.useClient = true;
