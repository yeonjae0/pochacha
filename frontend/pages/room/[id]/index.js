'use client'

import React, { useEffect, useState } from 'react'; /* React 관련 */
import { useRouter} from 'next/router';
import RoomCam from './RoomCam.js'; /* Component */
import RoomChat from './RoomChat.js';
import RoomBtn from './RoomBtn.js';
import axios from 'axios'; /* API 관련 */
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useDispatch, useSelector } from "react-redux"; /* Store 관련 */
import { addPlayers } from '@/store/reducers/players.js';
import { ready } from '@/store/reducers/player.js';
import { setPublisherData, setParticipantsData, resetParticipantsData } from '@/store/reducers/openvidu.js';
import { OpenVidu } from 'openvidu-browser'; /* OpenVidu 관련 */
import styles from '@/styles/RoomPage.module.css'; /* Style 관련 */

export default function RoomPage() {

  const router = useRouter();
  const dispatch = useDispatch();

  let info = JSON.parse(router.query.currentName);

  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  let OV = new OpenVidu();
  let session = OV.initSession();

  const roomId=useSelector(state=>state.room.currentRoomId);
  const token=useSelector(state => state.player.currentPlayerId); //오픈비두 토큰
  const nickname=useSelector(state => state.player.currentNick);
  const head=useSelector(state => state.player.currentHead);
  const playerReady = useSelector(state => state.player.currentReady);

  const [publisher, setPublisher] = useState({}); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]);//참여자들
  const [chatHistory, setChatHistory] = useState(`${info.nick}님이 입장하셨습니다.` + '\n')

  /* 유영 : 최초 한 번 사용자 목록 불러오기 시작 */
  const getPlayerList = () => {
    axios({
      url: `http://localhost:80/player/${roomId}`,
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      data: {
        "id": token,
      }
    }).then((response) => {
      console.log(response);

      /* 혜지 : 접속 플레이어들 정보를 저장 시작 */
      const arrayLength = response.data.length;
      for (let i = 0; i < arrayLength; i++) {
        let head = response.data[i].head;
        let id = response.data[i].id;
        let nickname = response.data[i].nickname;
        let ready = response.data[i].ready;

        let obj = {
          head: head,
          playerId: id,
          nick: nickname,
          ready: ready,
        };

        dispatch(addPlayers(obj));
      }
    }).catch((error) => {
      if(error.response) {
        router.push({
            pathname: "/exception",
            query: { msg: error.response.data },
          })
      } else { console.log("error ::: ", error) }
    });
  }; /* 유영 : 최초 한 번 사용자 목록 불러오기 끝 */
  
  /* 유영 : 사용자 삭제 시작 */
  const deletePlayer = async() => {
    await client.current.send(`/leave/${roomId}`, {}, JSON.stringify({ "playerId": token }));
  }
  /* 유영 : 사용자 삭제 끝 */

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
      client.current.subscribe(`/topic/chat/${roomId}`, (response) => {
        var data = JSON.parse(response.body);
        setChatHistory((prevHistory) => prevHistory + /*data.playerId + ': ' + */ data.message + '\n');
      })  // 채팅 구독
      client.current.subscribe(`/topic/player/${roomId}`, (response) => {
        var data = JSON.parse(response.body);
        console.log(data);

        if(data.id == token) {
          dispatch(ready(data));
        }
      })  // 플레이어 정보 구독
    })
  }

  /* 혜지 : OpenVidu 연결 관련 메소드 시작 */
  const onbeforeunload = async(e) => {
    leaveSession();
    await deletePlayer();
  }

  const deleteParticipant = (streamManager) => {
    let tempParticipants = participants;
    let index = tempParticipants.indexOf(streamManager, 0);
    if (index > -1) {
      tempParticipants.splice(index, 1);
      setParticipants(tempParticipants);

      dispatch(resetParticipantsData([]));  
      dispatch(setParticipantsData(tempParticipants));   
    }
  }

  const joinSession = async (token) => {
    try {
      session.on('streamCreated', async (event) => {
        let participant = session.subscribe(event.stream, undefined);
        let tempParticipants=[];
        participants.map(par=>{
          console.log("for문 이내의 참가자")
          tempParticipants.push({par});
          dispatch(setParticipantsData(par));
        })
        console.log("조인세션")
        console.log(JSON.parse(participant.stream.connection.data.split("%")[0]).clientData)
        const nick=JSON.parse(participant.stream.connection.data.split("%")[0]).clientData;
        console.log("닉")
        console.log(nick)
        dispatch(setParticipantsData({nick:nick,participant:participant}));
        tempParticipants.push({nick:nick,
                          participant:participant});
        setParticipants(tempParticipants);
      });

      session.on('streamDestroyed', (event) => {
        deleteParticipant(event.stream.streamManager);
      });

      session.on('exception', (exception) => {
        console.warn(exception);
      });

      /* 혜지 : 모든 사용자 PUBLISHER 지정 필수 */
      await session.connect(token, { clientData: nickname, publisher: true });
      /* 카메라 세팅 */
      let pub = await OV.initPublisherAsync(undefined, {
        audioSource: undefined, // 오디오
        videoSource: undefined, // 비디오
        publishAudio: true, // 오디오 송출
        publishVideo: true, // 비디오 송출
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND', // 비디오 컨테이너 적재 방식
        mirror: false,
      });

      await session.publish(pub);
      let deviceList = await OV.getDevices();
      var videoDevices = deviceList.filter(device => device.kind === 'videoinput');
      var currentVideoDeviceId = pub.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
      var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

      setPublisher(pub);
      dispatch(setPublisherData(pub));
    } catch (error) {
      console.log(error);
    }
  }

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    OV = null;
    setPublisher(undefined);
    setParticipants([]);
  }
  /* 혜지 : OpenVidu 연결 관련 메소드 완료 */

  useEffect(() => {
    getPlayerList();
    connectSocket();
    subscribeSocket();
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession(token);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className="roof2"></div>
      <div className={styles.room}>
        <div className={styles.camList}>
          <RoomCam/>
        </div>
        <RoomChat info={info} client={client} chatHistory={chatHistory} />
        {/* <div className={classNames({[styles.chatContainer]: true, [styles.outerChat]: true})}>
          <div className={classNames({[styles.chatContainer]: true, [styles.innerChat]: true})}>
          </div>
        </div> */}
        <RoomBtn info={info} client={client} head={head} ready={playerReady} />
      </div>
    </div>
  )
}