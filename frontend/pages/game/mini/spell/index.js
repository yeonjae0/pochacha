'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import SockJS from 'sockjs-client';
import styles from '@/styles/SpellGame.module.css';


function getConsonant() {
//   const roomInfo = useSelector(state => state.room.currentRoomID);
//   const [randomConsonant, setRandomConsonant] = useState([]);
//   const [userInput, setUserInput] = useState("");
  // const [result, setResult] = useState("");
  // const [myTurn, setMyTurn] = useState(false);

  // // socket 연결하기
  // let client = {};
  // const connectSocket = async() => {
  //   client.current = await Stomp.over(() => {
  //     const sock = new SockJS("http://localhost:80/ws")
  //     return sock;
  //   });
  //   client.current.debug = () => {};
  // }

  // const subscribeSelf = () => {
  //   client.current.connect({}, () => {
  //     client.current.subscribe(`/topic/game/${roomInfo}`, (response) => {
  //       var data = JSON.parse(response.body);
  //       console.log(data);
  //     })  // 채팅 구독
  //   })
  // } 
  
  // connectSocket();


  // // Axios를 사용하여 초성 가져오기
  // useEffect(() => {
  //   subscribeSelf();

  //   axios.get("/api")
  //     .then(response => {
  //       setConsonant(response.data);
  //     })
  //     .catch(error => {
  //       console.error("에러났당", error);
  //     });
  // }, []);

  // const handleInputChange = e => {
  //   setUserInput(e.target.value);
  // };

  // 새고 방지
  // const handleSubmit = e => {
  //   e.preventDefault();




  return (
    <>
    <div
      className={styles.wrapper}> 
      <div className={styles.text}>
      <h1>초성 게임</h1>
      <label>
        단어를 입력하세요:
        <input type="text" 
        />
      </label>
      <button type="submit">제출</button>
      </div>
      <br />
      <div 
        className={styles.redBlock}>
          <img src='/세종대왕_기본.png'
            style={{
              position: 'absolute',
              // justifyContent: 'center',
              left: '125px',
              width: '350px',
              marginTop: '-350px'
              
            }}>
            </img>
          <div className={styles.miniBlock1}></div>
          <div className={styles.miniBlock2}></div>
          <img src='/두루마리.png' 
            style={{
              position: 'absolute',
              width:'600px',
              left:'0px',
              marginBottom:'-150px',
              zIndex: '0',
            }}></img>
      </div>
      {/* <h2>{randomConsonant}</h2>
        <label>
        단어를 입력하세요:
        <input type="text" value={userInput} onChange={handleInputChange} 
        // disabled={!myTurn}
        />
        </label>
        <button type="submit"
        // disabled={!myTurn}
      >제출</button> */}
    </div>
    </>
  );
}
export default getConsonant;
