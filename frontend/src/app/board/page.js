"use client"
import { useEffect, useState, useRef } from 'react';
import DiceBox from '../../routes/DiceBox';
import './../map.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

export default function Board() {  let [dice, setDice] = useState(0); // 주사위
let [pin, setPin] = useState(1); // 현재 위치
let [lab, setLab] = useState(0); // 바퀴 수
let [roomId, setRoomId] = useState("2l8CG5ZaqgmBSaSff3Me");
let [playerId, setPlayerId] = useState(1);

var [socket, setSocket] = useState();
var [stompClient, setStompClient] = useState();

useEffect(() => {
  createMap();
}, []);
useEffect(() => {
  connectSocket();
});

const createMap = () => {
  axios({
    url : "http://localhost:80/board/cell",
    header : {
      "Accept" : "application/json",
      "Content-type" : "aplic ation/json;charset=UTF-8"
    },
    method : "POST",
    data : {
      "id" : roomId,
      "includeMini" : true
    }
  }).then((response) => {
    console.log("Map 정보 :: ", response.data);
  });
}

const leaveGame = () => {
  stompClient.send("/leave/" + roomId, {}, JSON.stringify({"playerId" : playerId}));
  state.stompClient.disconnect();
}

const connectSocket = () => {
  socket = new SockJS("http://localhost:80/ws");

  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};

  stompClient.connect({}, /*Connect Callback*/() => {
    stompClient.subscribe("/topic/move/" + roomId, (response) => {
      const data = JSON.parse(response.body);
      setDice(data.dice);
      setPin(data.pin);
    });

    stompClient.subscribe("/topic/player/" + roomId, (response) => {
      const data = JSON.parse(response.body);
      console.log("한명 나가요~");
      alert("한명 나가요~");
    });
  });
  const listener = () => {
    //console.log("reload");
    leaveGame();
  };

  window.addEventListener('beforeunload', listener);

}
  
  return (
    <div>
      <h1>보드게임 화면</h1>

      <button value="innerHTML" onClick={()=>{
        let num = 6;
        let dice = parseInt(Math.random() * num + 1); // 랜덤으로 주사위 숫자 추출
        stompClient.send("/move/" + roomId, {}, JSON.stringify({"roomId": roomId, "dice" : dice, "pin" : pin, "lab":lab}));

      }}>주사위 굴리기</button>

      <div>
        <h2>주사위 눈 : { dice }, 현재 { pin }번 블록에 위치</h2> <h2>{ lab }바퀴</h2>
      </div>

      <DiceBox />
      <div className='map'>
          <div id='19'>
            <div id="b19-t">{ pin == 19 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b19-r"></div>
          </div>
          <div id='18'>
            <div id="b18-t">{ pin == 18 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b18-l"></div>
          </div>
          <div id='17'>
            <div id="b17-t">{ pin == 17 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b17-l"></div>
          </div>
          <div id='16'>
            <div id="b16-t">{ pin == 16 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b16-l"></div>
          </div>
          <div id='15'>
            <div id="b15-t">{ pin == 15 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b15-l"></div>
          </div>
          <div id='14'>
            <div id="b14-t">{ pin == 14 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b14-l"></div>
          </div>
          <div id='13'>
            <div id="b13-t">{ pin == 13 ? ( <img src="./character.png" /> ) : null }</div>
          </div>
          <div id='20'>
            <div id="b20-t">{ pin == 20 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b20-r"></div>
          </div>
          <div id='12'>
            <div id="b12-t">{ pin == 12 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b12-r"></div>
          </div>
          <div id='21'>
            <div id="b21-t">{ pin == 21 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b21-r"></div>
          </div>
          <div id='11'>
            <div id="b11-t">{ pin == 11 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b11-r"></div>
          </div>
          <div id='22'>
            <div id="b22-t">{ pin == 22 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b22-r"></div>
          </div>
          <div id='10'>
            <div id="b10-t">{ pin == 10 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b10-r"></div>
          </div>
          <div id='23'>
            <div id="b23-t">{ pin == 23 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b23-r"></div>
          </div>
          <div id='9'>
            <div id="b9-t">{ pin == 9 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b9-r"></div>
          </div>
          <div id='24'>
            <div id="b24-t">{ pin == 24 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b24-r"></div>
          </div>
          <div id='8'>
            <div id="b8-t">{ pin == 8 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b8-r"></div>   
          </div>
          <div id='1'>
            <div id="b1-t">{ pin == 1 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b1-l"></div>
            <div id="b1-r"></div>
          </div>
          <div id='2'>
            <div id="b2-t">{ pin == 2 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b2-l"></div>
          </div>
          <div id='3'>
            <div id="b3-t">{ pin == 3 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b3-l"></div>
          </div>
          <div id='4'>
            <div id="b4-t">{ pin == 4 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b4-l"></div>
          </div>
          <div id='5'>
            <div id="b5-t">{ pin == 5 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b5-l"></div>
          </div>
          <div id='6'>
            <div id="b6-t">{ pin == 6 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b6-l"></div>
          </div>
          <div id='7'>
            <div id="b7-t">{ pin == 7 ? ( <img src="./character.png" /> ) : null }</div>
            <div id="b7-l"></div>
          </div>
      </div>

    </div>
  )
}
