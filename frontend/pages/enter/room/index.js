"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import RightBox from "../RightBox";
import styles from "@/styles/EnterPage.module.css";
import classNames from "classnames";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { enterRoom } from "@/store/reducers/room.js";
import { setMyData } from "@/store/reducers/player";

/* 비방장 입장 페이지 */
export default function EnterRoomPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const roomId = router.query.roomId;

  /* 유영 : 소켓 간단 연결 작업 시작 */
  useEffect(() => {
    const socket = new SockJS(process.env.NEXT_PUBLIC_WS + "/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => { });
  }, []);
  /* 유영 : 소켓 간단 연결 작업 끝 */

  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 시작 */
  /* 희진 : axios 렌더링 타이밍 변경 시작 (페이지 로딩 시 최초 1회) */
  /*
    TO DO :: progress와 secret 정보 api 통해 받아올 수 있게 처리
  */
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

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);
  /* 혜지 : 웹캠 화면 띄우기 위한 구현 끝 */

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
      url: process.env.NEXT_PUBLIC_API + "/player/create",
      header: {
        Accept: "application/json",
        "Content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      data: {
        nickname: text,
        roomId: roomId,
      },
    })
      .then((response) => {
        obj = {
          roomId: roomId, //오픈비두 세션

          /* 혜지 : setPlayer API에서는 Room 값을 받아오지 않으므로, progress와 secret 임시로 false 부여 */
          progress: false,
          secret: false, // 비밀 방인지, 아닌지

          nick: text || response.data.nickname,
          playerId: response.data.id, //오픈비두 토큰
          ready: response.data.ready,
        };
        let playerInfo = {
          playerId: response.data.id,
          nick: text || response.data.nickname,
          ready: response.data.ready,
          head: false, //초대받은 플레이어이므로 방장 false
        };

        const sendData = () => {
          /* 연재 : obj 정보 저장 */
          dispatch(
            enterRoom({
              roomId: roomId,

              /* 혜지 : setPlayer API에서는 Room 값을 받아오지 않으므로, progress와 secret 임시로 false 부여 */
              progress: false,
              secret: false,
            })
          );
          //dispatch(addPlayers(playerInfo));
          dispatch(setMyData(playerInfo));

          /* 희진 : URL 숨김 시작 */
          router.push({
            pathname: `/room/${roomId}`,
            query: { currentName: JSON.stringify(obj) },
          },
            `/room/${roomId}`
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
          (error) => console.log(error);
        }
      });
  };

  return (
    <div className={styles.container}>
      {/* 타이틀 화면 */}
      <div className="roof">
        <img className={styles.title} src="/main/title.png" />
      </div>

      <div className={styles.boxContainer}>
        {/* 닉네임 입력 상자 */}
        <div className={classNames({ [styles.box]: true, [styles.leftBox]: true })}>
          <h3 style={{ paddingTop: "0", marginBottom: "10px" }}>초대 코드로 입장하셨습니다</h3>
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
            <img className={styles.startBtn} src="/main/startBtn.png" />
          </button>
        </div>
        <div className={styles.box}>
          <RightBox />
        </div>
      </div>
    </div>
  );
}
