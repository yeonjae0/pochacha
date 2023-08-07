'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/router'
import RoomCam from './RoomCam.js'
import RoomChat from './RoomChat.js'
import RoomBtn from './RoomBtn.js'
import styles from '@/styles/RoomPage.module.css'
import classNames from 'classnames'
import axios from 'axios'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function RoomPage() {

  const router = useRouter()
  let info = JSON.parse(router.query.currentName)

  /* 유영 : 최초 한 번 사용자 목록 불러오기 시작 */
  const getPlayerList = () => {
    axios({
      url: `http://localhost:80/player/${info.roomId}`,
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        "id" : info.playerId
      }
    }).then((response) => {
      console.log(response.data);
    }).catch(
      error => console.log(error)
    );
  }; /* 유영 : 최초 한 번 사용자 목록 불러오기 끝 */

  let client = {};

  /* 유영 : Socket 함수 시작 */
  const connectSocket = async() => {
    client.current = await Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws")
      return sock;
    });
  }

  const subscribeSelf = () => {
    // client.current.connect({}, () => {
    //   client.current.subscribe(`/queue/${info.playerId}`, (response) => {
    //     var data = JSON.parse(response.body);
    //     console.log(data);
    //   })  // 채팅 구독
    // })
  } /* 유영 : Socket 함수 끝 */
  
  connectSocket();


  useEffect(() => {
    subscribeSelf();
    getPlayerList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.roof}></div>
      <div className={styles.room}>
        <div className={styles.camList}>
          <div className={styles.cam}></div>
          <div className={styles.cam}></div>
          <div className={styles.cam}></div>
          <div className={styles.cam}></div>
        </div>
        <div className={classNames({[styles.chatContainer]: true, [styles.outerChat]: true})}>
          <div className={classNames({[styles.chatContainer]: true, [styles.innerChat]: true})}>
          <RoomChat info={info} client={client} />
          </div>
        </div>
        <RoomCam info={info} />
        <RoomBtn info={info} client={client} />
      </div>
    </div>
  )
}