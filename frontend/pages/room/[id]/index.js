"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import RoomCam from "./RoomCam";
import RoomChat from "./RoomChat";
import RoomBtn from "./RoomBtn";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { addPlayers, /*removePlayers,*/ resetPlayers } from "@/store/reducers/players.js";
import { ready } from "@/store/reducers/player.js";
import {
  setPublisherData,
  setParticipantsData,
  resetParticipantsData,
} from "@/store/reducers/openvidu.js";
import { setCells, setStartGame } from "@/store/reducers/cell";
import { OpenVidu } from "openvidu-browser";
import styles from "@/styles/RoomPage.module.css";

export default function RoomPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  let info = JSON.parse(router.query.currentName);
  let startGame = false; //게임 시작 불가 상태

  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  let OV = new OpenVidu();
  let session = OV.initSession();

  const roomId = useSelector((state) => state.room.currentRoomId);
  const token = useSelector((state) => state.player.currentPlayerId); //오픈비두 토큰
  const nickname = useSelector((state) => state.player.currentNick);
  const head = useSelector((state) => state.player.currentHead);
  const playerReady = useSelector((state) => state.player.currentReady);

  const [publisher, setPublisher] = useState({}); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]); //참여자들
  const [chatHistory, setChatHistory] = useState(`${info.nick}님이 입장하셨습니다.` + "\n");

  /* 유영 : 최초 한 번 사용자 목록 불러오기 시작 */
  const getPlayerList = () => {
    axios({
      url: `http://localhost:80/player/${roomId}`,
      header: {
        Accept: "application/json",
        "Content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      data: {
        id: token,
      },
    })
      .then((response) => {
        console.log("플레이어들 정보 받아오기");
        console.log(response);
        dispatch(resetPlayers([]));

        startGame = true; //이후의 유효성 검사에서 모두 통과 시에 게임 시작 가능

        /* 혜지 : 접속 플레이어들 정보를 저장 시작 */
        const arrayLength = response.data.length;
        if (arrayLength < 4) startGame = false; //[유효성 검사] 현재 접속 플레이어 수가 4명 이하일 때 게임 시작 불가

        for (let i = 0; i < arrayLength; i++) {
          let head = response.data[i].head;
          let id = response.data[i].id;
          let nickname = response.data[i].nickname;
          let ready = response.data[i].ready;

          if (ready === false) startGame = false; //[유효성 검사] 현재 접속 플레이어 중 한 명이라도 ready 상태가 아닐 때 게임 시작 불가

          let obj = {
            head: head,
            playerId: id,
            nick: nickname,
            ready: ready,
          };

          dispatch(addPlayers(obj));
          console.log("받아온 데이터 결과 stargame");
          console.log(startGame);
          dispatch(setStartGame(startGame));
        }
      })
      .catch((error) => {
        if (error.response) {
          router.push({
            pathname: "/exception",
            query: { msg: error.response.data },
          });
        } else {
          console.log("error ::: ", error);
        }
      });
  }; /* 유영 : 최초 한 번 사용자 목록 불러오기 끝 */

  /* 유영 : 사용자 삭제 시작 */
  const deletePlayer = async () => {
    await client.current.send(`/leave/${roomId}`, {}, JSON.stringify({ playerId: token }));
    /*
      TO DO :: 해당 playerId redux에서 삭제 필요
    */
  };
  /* 유영 : 사용자 삭제 끝 */

  /* 유영 : Socket 함수 시작 */
  let client = {};
  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws");
      return sock;
    });
    // client.current.debug = () => {};
  };

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/chat/${roomId}`, (response) => {
        var data = JSON.parse(response.body);
        setChatHistory(
          (prevHistory) => prevHistory + /*data.playerId + ': ' + */ data.message + "\n"
        );
      }); // 채팅 구독
      client.current.subscribe(`/topic/player/${roomId}`, (response) => {
        var data = JSON.parse(response.body);

        console.log("레디 변경 감지");
        console.log(data);

        /*
          CONFIRM :: 현재 지금까지의 사용자 리스트만 받아오는 문제 있으므로, READY 변경 감지마다 리스트 새로 받는 것으로 임시 처리
        */
        getPlayerList();
        if (data.id == token) {
          //본인일 경우 변경
          dispatch(ready(data));
        }
      }); // 플레이어 정보 구독
      client.current.subscribe(`/topic/game/${roomId}`, (response) => {
        var data = JSON.parse(response.body);

        if(data.error == undefined || data.error == null ) {
          dispatch(setCells(data));

          router.push({
            pathname: `/game/${roomId}`,
            query: { currentName: JSON.stringify(info) },
          });
        } else {
          alert("알림 : " + data.error);
        }
      }); // 게임 시작 신호 수신
    });
  };

  /* 혜지 : OpenVidu 연결 관련 메소드 시작 */
  const onbeforeunload = async (e) => {
    leaveSession();
    await deletePlayer();
  };

  const deleteParticipant = (streamManager) => {
    let tempParticipants = participants;
    let index = tempParticipants.indexOf(streamManager, 0);
    if (index > -1) {
      tempParticipants.splice(index, 1);
      setParticipants(tempParticipants);

      dispatch(resetParticipantsData([]));
      dispatch(setParticipantsData(tempParticipants));
    }
  };

  const joinSession = async (token) => {
    try {
      session.on("streamCreated", async (event) => {
        let participant = session.subscribe(event.stream, undefined);
        let tempParticipants = [];
        participants.map((par) => {
          tempParticipants.push({ par });
          dispatch(setParticipantsData(par));
        });
        const nick = JSON.parse(participant.stream.connection.data.split("%")[0]).clientData;
        dispatch(setParticipantsData({ nick: nick, participant: participant }));
        tempParticipants.push({ nick: nick, participant: participant });
        setParticipants(tempParticipants);
      });

      session.on("streamDestroyed", (event) => {
        deleteParticipant(event.stream.streamManager);
      });

      session.on("exception", (exception) => {
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
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND", // 비디오 컨테이너 적재 방식
        mirror: false,
      });

      await session.publish(pub);
      let deviceList = await OV.getDevices();
      var videoDevices = deviceList.filter((device) => device.kind === "videoinput");
      var currentVideoDeviceId = pub.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      var currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId
      );

      setPublisher(pub);
      dispatch(setPublisherData(pub));
    } catch (error) {
      console.log(error);
      router.push({
        pathname: "/exception",
        query: { msg: "화상 연결에 문제가 있어요!" },
      });
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    OV = null;
    setPublisher(undefined);
    setParticipants([]);
  };
  /* 혜지 : OpenVidu 연결 관련 메소드 완료 */

  useEffect(() => {
    getPlayerList();
    connectSocket();
    subscribeSocket();
    window.addEventListener("beforeunload", onbeforeunload);
    joinSession(token);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  /* 희진 : 리랜더링 방지 시작 */
  const memoRoomCam = useMemo(() => {
    return <RoomCam />;
  }, []);

  const memoRoomChat = useMemo(() => {
    return <RoomChat info={info} client={client} chatHistory={chatHistory} />;
  }, [chatHistory]);

  const memoRoonBtn = useMemo(() => {
    return (
      <RoomBtn info={info} client={client} head={head} ready={playerReady} startGame={startGame} />
    );
  }, [playerReady]);
  /* 희진 : 리랜더링 방지 끝 */

  return (
    <div className={styles.container}>
      <div className="roof2"></div>
      <div className={styles.room}>
        <div className={styles.camList}>
          {memoRoomCam}
          {/* <RoomCam/> */}
        </div>
        {memoRoomChat}
        {/* <RoomChat info={info} client={client} chatHistory={chatHistory} /> */}

        {/* <div className={classNames({[styles.chatContainer]: true, [styles.outerChat]: true})}>
          <div className={classNames({[styles.chatContainer]: true, [styles.innerChat]: true})}>
          </div>
        </div> */}
        {memoRoonBtn}
        {/* <RoomBtn info={info} client={client} head={head} ready={playerReady} /> */}
      </div>
    </div>
  );
}
