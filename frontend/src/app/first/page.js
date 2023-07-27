"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import './../first.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

const tipData = [
  {
    tip:'즐거운 게임을 위한 TIP!',
    pic: '/TIP 아이콘1.png',
    txt1:'카메라 ON 모드로 입장하면',
    txt2:'다양한 사람들의 표정을 즐길 수 있어요',
  },
  {
    tip:'즐거운 게임을 위한 TIP!',
    pic: '/TIP 아이콘2.png',
    txt1:'불쾌감을 유발하는 언행을 하면',
    txt2:'강제 퇴장 당할 수 있음에 유의하세요',
  },
  {
    tip:'즐거운 게임을 위한 TIP!',
    pic: '/TIP 아이콘3.png',
    txt1:'미니게임 ON/OFF를 통해',
    txt2:'모두의 포차차를 다채롭게 즐겨보세요',
  },
  {
    tip:'즐거운 게임을 위한 TIP!',
    pic: '/TIP 아이콘4.png',
    txt1:'메뉴판으로 여러분이 좋아하는',
    txt2:'다양한 음식을 즐겨보세요.',
  },
];

export default function Room() {

  // 닉네임 입력
  const [text, setText] = useState('')
  const handleOnChange = (e)=> {
    setText(e.target.value)
  };
  const enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(text)
    }
  };

  // 우측 Box 화면 전환
  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  // 랜덤 닉네임 & room ID 저장할 state
  let [name, setName] = useState('');
  let [roomId, setRoomId] = useState(0);

  const toggleNext = () => {
    setCurrentTipIdx((prevIdx) => (prevIdx === tipData.length - 1 ? 0 : prevIdx + 1));
  };

  const togglePrev = () => {
    setCurrentTipIdx((prevIdx) => (prevIdx === 0 ? tipData.length - 1 : prevIdx - 1));
  };

  const toggle = () => {
      setCurrentTipIdx((prevIdx)=>
        prevIdx === tipData.length -1 ? 0 : prevIdx +1
      );
    };

  const currentTip = tipData[currentTipIdx];

  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 시작 */
  const start = () => {
    axios({
      url : "http://localhost:80/enter",
      header : {
        "Accept" : "application/json",
        "Content-type" : "aplic ation/json;charset=UTF-8"
      },
      method : "POST",
      data : {
        nickname : text
      }
    }).then((response) => {
      console.log(response.data);

      // 랜덤 닉네임 & room ID 저장
      setRoomId(response.data.room.id);
      setName(response.data.player.nickname);
    });
  };
  /* 유영 : axios를 통한 닉네임 생성 및 방 생성 끝 */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIdx((prevIdx) => (prevIdx === tipData.length - 1 ? 0 : prevIdx + 1));
    }, 2000);

    /* 유영 : 소켓 간단 연결 작업 시작 */
    const socket = new SockJS("http://localhost:80/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, /*Connect Callback*/() => {
      console.log("Socket Connected.");
    });
    /* 유영 : 소켓 간단 연결 작업 끝 */

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="first" >

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/천막.png" />
        <br />
        <img src="/logo.png" />
        <br />
      </div>

      <div style={{ display: 'flex' }}>

        <div className='leftBox'>
          <div style={{ display: 'flex' }}>
            <div className='imgCircle'></div>
            <div className='inputNickname'>
              <p style={{fontSize: '20px'}}>캐릭터와 닉네임 선택</p>
              <br />
              <label htmlFor=""></label>
              {/* <input type="text" /> */}
              <input 
                value = {text}
                onChange = {handleOnChange}
                onKeyDown = {enterDown}
              />
            </div>
            <Link href="/room"><button id='startBtn' onClick={start}>START</button></Link>
          </div>
        </div>

        <div className='rightBox'>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <br />
            <br />
            <p id="tip">{currentTip.tip}</p>
            <img src={currentTip.pic} />
            <p>{currentTip.txt1}</p>
            <p>{currentTip.txt2}</p>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="arrowButton" onClick={togglePrev}>
                  <span>&#8592;</span>
              </button>
              <button className="arrowButton" onClick={toggleNext}>
                <span>&#8594;</span>
              </button>
            </div>

          </div>
        </div>
        {/* <p id="bottom">서비스 약관 | 개인정보 취급정보 | 문의</p> */}
      </div>
    </div>
  )
};

Room.useClient = true;
