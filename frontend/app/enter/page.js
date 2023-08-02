'use client'

import React, { useState, useEffect } from 'react'
import './../css/First.css'
import RightBox from './RightBox.js'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import axios from 'axios'

export default function Room() {

  /* 유영 : 소켓 간단 연결 작업 시작 */
  useEffect(() => {
    const socket = new SockJS("http://localhost:80/ws")
    const stompClient = Stomp.over(socket)

    stompClient.connect({}, /*Connect Callback*/() => {
      console.log("Socket Connected.")
    });
  }, [])
  /* 유영 : 소켓 간단 연결 작업 끝 */

  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 시작 */
  /* 희진 : axios 렌더링 타이밍 변경 시작 (페이지 로딩 시 최초 1회) */
  let roomId = ''
  let progress = false
  let secret = false
  let nick = ''
  let playerId = 0
  let ready = false
  let obj = {}
  // let [roomId, setRoomId] = useState('')
  // let [progress, setProgress] = useState(false)
  // let [secret, setSecret] = useState(false)
  // let [nick, setNick] = useState('')
  // let [playerId, setPlayerId] = useState(0)
  // let [ready, setReady] = useState(false)
  const [text, setText] = useState('')
  
  const handleOnChange = (e) => {
    setText(e.target.value)
  }
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(text)
      gameStart()
    }
  }

  const gameStart = () => {
    axios({
      url: "http://localhost:80/enter",
      header: {
        "Accept": "application/json",
        "Content-type": "aplic ation/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        nickname: text
      }
    }).then((response) => {
      console.log(response.data)
      // setRoomId(response.data.room.id)
      // setProgress(response.data.room.progress)
      // setSecret(response.data.room.secret)
      // setNick(response.data.player.nickname)
      // setPlayerId(response.data.player.id)
      // setReady(response.data.player.ready)

      obj = 
      { 'roomId': response.data.room.id,
        'progress': response.data.room.progress,
        'secret': response.data.room.secret,
        'nick': text || response.data.player.nickname,
        'playerId': response.data.player.id,
        'ready': response.data.player.ready }

      /* response 값 저장 후 room으로 이동 */
        const pathname = `/room/${response.data.room.id}`
        const query = { currentName: JSON.stringify(obj) }
        window.location.href = `${pathname}?${new URLSearchParams(query).toString()}`
    }).catch(error => console.log(error))
  }
  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 끝 */
  /* 희진 : axios 렌더링 타이밍 변경 끝 */

  return (
    <div className="first" >

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/tent.png" />
        <br />
        <img src="/logo.png" />
        <br />
      </div>

      <div style={{ display: 'flex' }}>
        <div className='leftBox'>
          <div style={{ display: 'flex' }}>
            <div className='imgCircle'></div>
            <div className='inputNickname'>
              <p style={{ fontSize: '20px' }}>캐릭터와 닉네임 선택</p>
              <br />
              <label htmlFor=""></label>
              <input
                value={text}
                onChange={handleOnChange}
                onKeyDown={enterDown}
              />
            </div>
            <button id='startBtn' onClick={gameStart}>START</button>
          </div>
        </div>

        <RightBox />
        {/* <p id="bottom">서비스 약관 | 개인정보 취급정보 | 문의</p> */}
      </div>
    </div>
  )
};

Room.useClient = true;