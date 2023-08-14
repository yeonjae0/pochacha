'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import RightBox from './RightBox.js'
import styles from '@/styles/EnterPage.module.css'
import classNames from 'classnames'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { enterRoom } from "@/store/reducers/room.js";
//import { addPlayers } from '@/store/reducers/players.js'
import { MyPlayerData } from '@/store/reducers/player.js'

//방장 입장 페이지
export default function EnterPage() {

  const router = useRouter();
  const dispatch = useDispatch();

  /* 유영 : 소켓 간단 연결 작업 시작 */
  useEffect(() => {
    const socket = new SockJS("http://localhost:80/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, /*Connect Callback*/() => {
      console.log("Socket Connected.");
    });
  }, []);
  /* 유영 : 소켓 간단 연결 작업 끝 */

  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 시작 */
  /* 희진 : axios 렌더링 타이밍 변경 시작 (페이지 로딩 시 최초 1회) */
  let roomId = '';
  let progress = false;
  let secret = false;

  let playerId = '';
  let nick = '';
  let ready = false;

  let obj = {};

  /* 혜지 : 웹캠 화면 띄우기 위한 구현 시작 */
  let videoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
    })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log("WEBCAM ERROR");
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);
  /* 혜지 : 웹캠 화면 띄우기 위한 구현 끝 */

  const [text, setText] = useState('');

  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      gameStart();
    }
  }

  const gameStart = () => {
    axios({
      url: "http://localhost:80/enter",
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        nickname: text,
      }
    }).then((response) => {
      console.log("GAME START");
      console.log('response.data', response.data);

      obj =
      {
        'roomId': response.data.room.id,//오픈비두 세션
        'progress': response.data.room.progress,
        'secret': response.data.room.secret, // 비밀 방인지, 아닌지
        'nick': text || response.data.player.nickname,
        'playerId': response.data.player.id,//오픈비두 토큰
        'ready': response.data.player.ready,
      }
      let playerInfo = {
        playerId: response.data.player.id,  // -> room에서 주기
        nick: text || response.data.player.nickname,  // -> room에서 주기
        ready: response.data.player.ready,
        head: true,//방을 연 사람이므로 방장 true
      }
      console.log(playerInfo);
      const sendData = () => {
        /* 연재 : obj 정보 저장 */
        dispatch(
          enterRoom({
            roomId: response.data.room.id,//오픈비두 세션
            progress: response.data.room.progress,
            secret: response.data.room.secret,
          })
        );
        //dispatch(addPlayers(playerInfo));
        dispatch(MyPlayerData(playerInfo));

        router.push(
          {
            pathname: `/room/${response.data.room.id}`,
            query: { currentName: JSON.stringify(obj) },
          },
          /* 희진 : store에 데이터 저장 작업 완료 후 삭제 예정 코드 */
        )
      }
      sendData();
    }).catch((error) => {
      if (error.response) {
        router.push({
          pathname: "/exception",
          query: { msg: error.response.data },
        })
      } else { console.log(error) }
    });
  }
  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 끝 */
  /* 희진 : axios 렌더링 타이밍 변경 끝 */

  /* 희진 : 추후 삭제 예정 시작 */
  // const tmp = (
  //   <div className="first" >

  //     {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
  //     <div className="title">
  //       {/* <img src="/tent.png" />
  //       <br /> */}
  //       <img src="/main/title.png" />
  //       {/* <br /> */}
  //     </div>

  //     <div style={{ display: 'flex' }}>
  //       <div className='leftBox'>
  //         <div style={{ display: 'flex' }}>
  //           <div className='imgCircle'></div>
  //           <div className='inputNickname'>
  //             <p style={{ fontSize: '20px' }}>캐릭터와 닉네임 선택</p>
  //             <br />
  //             <label htmlFor=""></label>
  //             <input
  //               value={text}
  //               onChange={handleOnChange}
  //               onKeyDown={enterDown}
  //             />
  //           </div>
  //           <button id='startBtn' onClick={gameStart}>START</button>
  //         </div>
  //       </div>

  //       <RightBox />
  //       {/* <p id="bottom">서비스 약관 | 개인정보 취급정보 | 문의</p> */}
  //     </div>
  //   </div>
  // )
  /* 희진 : 추후 삭제 예정 끝 */

  return (
    <div className={styles.container}>

      {/* 타이틀 화면 */}
      <div className="roof">
        <img className={styles.title} src="/main/title.png" />
      </div>

      <div className={styles.boxContainer}>
        {/* 닉네임 입력 상자 */}
        <div className={classNames({ [styles.box]: true, [styles.leftBox]: true })}>
          <video className={styles.cam} ref={videoRef} /> {/* 임시 화상화면 상자 */}
          <div className={styles.inputContainer}>
            <input className={styles.nickname} spellCheck="false"
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
  )
}

EnterPage.useClient = true