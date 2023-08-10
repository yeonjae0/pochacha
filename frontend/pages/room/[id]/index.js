'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import RoomCam from './RoomCam.js'
import RoomChat from './RoomChat.js'
import RoomBtn from './RoomBtn.js'
import styles from '@/styles/RoomPage.module.css'
import classNames from 'classnames'
import axios from 'axios'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useDispatch } from "react-redux";
import { addPlayers } from '@/store/reducers/players.js';

export default function RoomPage() {

  const router = useRouter();
  const dispatch = useDispatch();

  let info = JSON.parse(router.query.currentName);
  const [chatHistory, setChatHistory] = useState(`${info.nick}님이 입장하셨습니다.` + '\n')

  /* 유영 : 최초 한 번 사용자 목록 불러오기 시작 */
  const getPlayerList = () => {
    axios({
      url: `http://localhost:80/player/${info.roomId}`,
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      data: {
        "id" : info.playerId,
      }
    }).then((response) => {
      console.log("GET PLAYERLIST");
      console.log(response.data);
      /*
        TO DO :: 사용자 리스트를 players 저장소에 저장
      */
     const arrayLength=response.data.length;

     for(let i=0;i<arrayLength;i++){
      let head=response.data[i].head;
      let id=response.data[i].id;
      let nickname=response.data[i].nickname;
      let ready=response.data[i].ready;

      let obj={
        head:head,
        playerId:id,
        nick:nickname,
        ready:ready,
      };

      dispatch(addPlayers(obj));
     }
      
    }).catch(
      error => console.log(error)
    );
  }; /* 유영 : 최초 한 번 사용자 목록 불러오기 끝 */


  /* 유영 : Socket 함수 시작 */
  let client = {};
  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws");
      return sock;
    });
    // client.current.debug = () => {};
  }
  
  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/chat/${info.roomId}`, (response) => {
        var data = JSON.parse(response.body);
        setChatHistory((prevHistory) => prevHistory + data.playerId + ': ' + data.message + '\n')
      })  // 채팅 구독
      client.current.subscribe(`/topic/player/${info.roomId}`, (response) => {
        var data = JSON.parse(response.body);
        console.log(data);
      })  // 플레이어 정보 구독
    })
  }

  useEffect(() => {
    connectSocket();
    subscribeSocket();
    getPlayerList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.roof}></div>
      <div className={styles.room}>
        <div>
          <RoomCam info={info}/>
        </div>
        <div className={classNames({[styles.chatContainer]: true, [styles.outerChat]: true})}>
          <div className={classNames({[styles.chatContainer]: true, [styles.innerChat]: true})}>
          <RoomChat info={info} client={client} chatHistory={chatHistory} />
          </div>
        </div>
        <RoomBtn info={info} client={client} />
      </div>
    </div>
  )
}