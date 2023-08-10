'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import SockJS from 'sockjs-client';
import styles from '@/styles/SpellGame.module.css';
import { useDispatch, useSelector } from "react-redux";


function getConsonant() {
  const dispatch = useDispatch();
  
  let randomConsonant = 'ㄱ ㅅ'

  let [showModal, setShowModal] = useState(false);
  const roomInfo = useSelector(state => state.room.currentRoomId);
  // const [randomConsonant, setRandomConsonant] = useState([]);
  // const [userInput, setUserInput] = useState("");

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


  // Axios를 사용하여 초성 가져오기
  // useEffect(() => {
  //   // subscribeSelf();
  //   getRandomConsonant();
  //   console.log(roomInfo)
  // }, []);

  const getRandomConsonant = () => {
  axios({
    url: process.env.NEXT_PUBLIC_API + `/game/mini/spell`,  // 여기 변경해야함!
    header: {
      "Accept": "application/json",
      "Content-type": "application/json;charset=UTF-8"
    },
    method: "POST",
    data: {
      "id" : roomInfo
    }
  }).then(response => {
    setRandomConsonant(response.data);
    })
    .catch(error => {
      console.error("에러났당", error);
      console.error(roomInfo);
    });
    
    // const handleInputChange = e => {
      //   setUserInput(e.target.value);
      // };
      
      // 새고 방지
      // const handleSubmit = e => {
        //   e.preventDefault();
        
        useEffect(() => {
          setShowModal(true);
          const timeout = setTimeout(() => {
            setShowModal(false);
          }, 3000);
      
          return () => {  // 재렌더링 될 떄 메모리 누수 방지
            clearTimeout(timeout);
          };
        }, []);
        
        const ModalPage = () => {
          if (showModal) {
            document.body.style.overflow = 'hidden'
            return(
              <>
        {showModal && (
          <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*세종대왕님이 보고 계십니다*</p>
            <p>*사전에 등재된 단어만 입력해주세요.*</p>
            <h4>제시된 초성: {randomConsonant}</h4>
            {/* <button onClick={onCloseModal}>Close</button> */}
          </div>
        </div>
        )}
        </>
      );
    } else {
      document.body.style.overflow = 'initial';
      return null;
      }
    }
    
    
    
    return (
      <>
      <ModalPage />
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
          <h3 style={{
            position: 'absolute',
            backgroundColor: 'Yellow',
            // textAlign: 'center',
            left: '250px',
            zIndex:'1'
            
          }}
          >초성: {randomConsonant} </h3>
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
    {/* <ModalPage/> */}
    </>
  );
}
}
export default getConsonant;