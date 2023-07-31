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
  
  /*
    TO DO :: 방 정보, 플레이어 정보 가져오기
  */
  let [roomId, setRoomId] = useState("Temp"); // 현재 방 ID (임의 삽입)
  let [includeMini, setIncludeMini] = useState(true); // 미니게임 진행 여부
  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(1); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수
  let [client, setClient] = useState({});

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

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws")
      return sock;
    });
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(`/topic/move/${roomId}`, (response) => {
        var data = JSON.parse(response.body);

        setDice(data.dice);
        setPin(data.pin);
        setLab(data.lab);

        console.log(data.cell);
      });
    });
  }

  useEffect(() => {
    // 최초 한 번 CellList 불러오기
    createMap();
    connectSocket();
    subscribeSocket();
  }, []);
  
  return (
    <div>
      <h1>보드게임 화면</h1>

      <button value="innerHTML" onClick={()=>{
        var sendData = {
          "dice" : dice,
          "pin" : pin,
          "lab" : lab,
        };

        client.current.send("/move/" + roomId, {}, JSON.stringify(sendData));

      }}>주사위 굴리기</button>

      <div>
        <h2>주사위 눈 : { dice }, 현재 { pin }번 블록에 위치</h2> <h2>{ lab }바퀴</h2>
      </div>

      <DiceBox dice={ dice } />
      <BoardMap pin={ pin } />

    </div>
  )
}
