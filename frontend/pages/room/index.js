'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/router'
import RoomCam from './RoomCam.js'
import RoomChat from './RoomChat.js'
import RoomBtn from './RoomBtn.js'
import styles from '@/styles/RoomPage.module.css'
import classNames from 'classnames'
import axios from 'axios'

export default function RoomPage() {

  const router = useRouter()
  let info = router.query.currentName ? JSON.parse(router.query.currentName) : ''
  // 상단 코드에서 Undefined 에러 발생하면 서버 재실행

  /* 혜지 : ERROR 발생으로 주석 처리 */
  // const getPlayerList = (roomId, playerId) => {
  //   axios({
  //     url: process.env.NEXT_PUBLIC_HOST + `/api/player/${roomId}`,
  //     header: {
  //       "Accept": "application/json",
  //       "Content-type": "application/json;charset=UTF-8"
  //     },
  //     method: "POST",
  //     data: {
  //       "id" : playerId
  //     }
  //   }).then((response) => {
  //     console.log(response.data);
  //   }).catch(
  //     error => console.log(error)
  //   );
  // };

  // useEffect(() => {
  //   getPlayerList(info.roomId, info.playerId);
  // }, []);

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
          <RoomChat info={info} />
          </div>
        </div>
        <RoomCam info={info}/>
        <RoomBtn info={info} />
      </div>
    </div>
  )
}
