"use client"
import { useEffect, useState, useRef } from 'react'
import BoardMap from './../BoardMap.js'
import DiceBox from './../DiceBox.js'
import './../../css/Map.css'
import { styled } from 'styled-components'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import axios from 'axios'
import { Transition } from 'react-transition-group'

///// 임시 작업중 
/// 해야할 것: 모듈 창 꾸미기, 모듈 자동으로 차차 사라지게 하기
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Apply the opacity here */
  display: flex;
  align-items: center;
  justify-content: center;
  /* transition: visibility 0.5s ease-out; */
  `;

const ModalContent = styled.div`
  background-color: white;
  padding: 70px;
  /* transition: visibility 0.5s ease-out; */
  border-radius: 20px;
  `;
  
  
  /////
  
  
  
export default function Board( props ) {
  console.log(props)
  /*
  TO DO :: 방 정보, 플레이어 정보 가져오기
  */
 let [roomId, setRoomId] = useState("Temp"); // 현재 방 ID (임의 삽입)
 let [includeMini, setIncludeMini] = useState(true); // 미니게임 진행 여부
 let [dice, setDice] = useState(0); // 주사위
 let [pin, setPin] = useState(1); // 현재 위치
 let [lab, setLab] = useState(0); // 바퀴 수
 let [client, setClient] = useState({});
 let [currentCell, setCurrentCell] = useState('')
 let [showModal, setShowModal] = useState(false);
 
 /* 제정 : 룸에서 시작버튼 눌렀을 시 데이터 수신 시작 */
 useEffect(() => {
   console.log('Game page')
   const info = JSON.parse(props.searchParams.roomInfo)
   console.log(info)
   roomId = info.roomId
  },[]);
  /* 제정 : 룸에서 시작버튼 눌렀을 시 데이터 수신 끝 */
  
  // 현재 방의 맵 불러오는 함수
  const createMap = () => {
    console.log(`before axios`)
    console.log(roomId)
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
        let data = JSON.parse(response.body);
        let currentCell = data.cell.name
        
        setDice(data.dice);
        setPin(data.pin);
        setLab(data.lab);
        setCurrentCell(data.cell.name)
        
        console.log(data.cell);
        console.log(data.cell.name)
        console.log('*********');
        console.log(data.pin);
      });
    });
  }


  useEffect(() => {
    // 최초 한 번 CellList 불러오기
    createMap();
    connectSocket();
    subscribeSocket();    
  }, []);
  
  /////////////////////    모달 연습 (미완)
  
  let handleRollDiceClick = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000)
    setTimeout(() => {
      setShowModal(false);
    }, 2500)
    // setShowModal(false)
  };
  
  const ModalPage = ({ currentCell, pin }) => {

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [showModal]);


  return (
    <>
      {showModal && (
        <ModalContainer id='modalContainer'>
          <ModalContent id='modalContent'>
            <p>{currentCell}</p>
            <p>{pin}</p>
            {/* <button onClick={onCloseModal}>Close</button> */}
          </ModalContent>
        </ModalContainer>
      )}
      
    </>
  )};

//////////////////////
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
        handleRollDiceClick();
      }}>주사위 굴리기</button>

      <div>

        <h2>주사위 눈 : { dice }, 현재 { pin }번 블록에 위치</h2> <h2>{ lab }바퀴</h2>
      </div>

      <DiceBox dice={ dice } />
      <BoardMap pin={ pin } />

      <>
      <ModalPage currentCell={currentCell} pin={pin} />
      </>
    </div>
  )
}
