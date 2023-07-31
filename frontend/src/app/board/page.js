"use client"
import { useEffect, useState, useRef } from 'react';
import BoardMap from '../../routes/BoardMap';
import DiceBox from '../../routes/DiceBox';
import './../map.css';
import { styled } from 'styled-components';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

export default function Board() {
  
  let [roomId, setRoomId] = useState("Temp"); // 현재 방 ID (임의 삽입)
  let [includeMini, setIncludeMini] = useState(true); // 미니게임 진행 여부
  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(1); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수

  // 현재 방의 맵 불러오는 함수
  const createMap = () => {
    axios({
      url : "http://localhost:80/board/cell",
      header : {
        "Accept" : "application/json",
        "Content-type" : "application/json;charset=UTF-8"
      },
      method : "POST",
      data : {
        "id" : roomId, // RoomRequestDto에 id 삽입
        "includeMini" : includeMini // 미니게임 여부
      }
    }).then((response) => {
      console.log(response.data);
      /*
        TO DO :: Cell 색에 맞춰 배합
      */
    });
  };

  useEffect(() => {
    // 최초 한 번 CellList 불러오기
    createMap();
  }, []);
  
  return (
    <div>
      <h1>보드게임 화면</h1>

      <button value="innerHTML" onClick={()=>{
        let num = 6;
        let dice = parseInt(Math.random() * num + 1); // 랜덤으로 주사위 숫자 추출
        setDice(dice); // 말 수 변경

        // 한 바퀴 돌 때마다 pin 갱신
        {
          pin+dice <= 24
          ? (
            setTimeout(()=>{ setPin(pin+dice) }, 1000)
            // setPin(pin+dice)
            )
            : setTimeout(()=>{ setPin(pin+dice-24) }, 1000)
          // : setPin(pin+dice-24)
        }

        // 한 바퀴 돌 때마다 lab state 변경
        {
          pin+dice <= 24
          ? (
            null
          )
          : setLab(lab+1);
        }

      }}>주사위 굴리기</button>

      <div>
        <h2>주사위 눈 : { dice }, 현재 { pin }번 블록에 위치</h2> <h2>{ lab }바퀴</h2>
      </div>

      <DiceBox dice={ dice } />
      <BoardMap pin={ pin } />

    </div>
  )
}
