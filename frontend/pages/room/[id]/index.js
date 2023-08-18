"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import RoomCam from "./RoomCam";
import RoomChat from "./RoomChat";
import RoomBtn from "./RoomBtn";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { addPlayers, resetPlayers, addTmpPlayer, resetTmpPlayers, updateTmpPlayer, deleteTmpPlayer, checkReady } from "@/store/reducers/players.js";
import { ready } from "@/store/reducers/player.js";
import { openViduActions } from "@/store/reducers/openvidu";
import { setCells, setTurns } from "@/store/reducers/cell";
import styles from "@/styles/RoomPage.module.css";
import { OpenVidu } from "openvidu-browser";

export default function RoomPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  let info = router.query.currentName ? JSON.parse(router.query.currentName) : '';

  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  let OV=new OpenVidu()
  let session=OV.initSession({sessionTimeout: 3600,}); // 1시간 후 세션 만료
  dispatch(openViduActions.createOpenVidu({OV,session/*,devices*/}));

  let subGame = null;

  const roomId = useSelector((state) => state.room.currentRoomId);
  const token = useSelector((state) => state.player.currentPlayerId); //오픈비두 토큰
  const nickname = useSelector((state) => state.player.currentNick);
  const head = useSelector((state) => state.player.currentHead);
  const playerReady = useSelector((state) => state.player.currentReady);
  const startGame = useSelector((state) => state.players.canStart);

  const [chatHistory, setChatHistory] = useState(`${info.nick}님이 입장하셨습니다.` + "\n");


  /* 유영 : 최초 한 번 사용자 목록 불러오기 시작 */
  const getPlayerList = () => {
    axios({
      url: process.env.NEXT_PUBLIC_API + `/player/${roomId}`,
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
        dispatch(resetPlayers([]));

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
          dispatch(addTmpPlayer({ id, nickname, ready, head }));
        }
        dispatch(checkReady());
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
    dispatch(deleteTmpPlayer({id: token}));  // redux에서 플레이어 삭제
    await client.current.send(`/leave/${roomId}`, {}, JSON.stringify({ playerId: token }));
  };
  /* 유영 : 사용자 삭제 끝 */

  /* 유영 : Socket 함수 시작 */
  let client = {};
  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(process.env.NEXT_PUBLIC_WS + "/ws");
      return sock;
    });
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

        // 플레이어 정보 업데이트 / 추가 후 ready 체크
        dispatch(updateTmpPlayer(data));
        dispatch(checkReady());

        if (data.id == token) {
          dispatch(ready(data));  // 본인일 경우 변경
        }
      }); // 플레이어 정보 구독

      subGame = client.current.subscribe(`/topic/game/${roomId}`, (response) => {
        var data = JSON.parse(response.body);

        if (data.error == undefined || data.error == null) {
          dispatch(setCells(data.cellList));
          dispatch(setTurns(data.playerIdList));

          router.push({
            pathname: `/game/${roomId}`,
            query: { currentName: JSON.stringify(info) },
            },
            `/game/${roomId}`
            );
        } else {
          alert("알림 : " + data.error);
        }
      }); // 게임 시작 신호 수신
    });
  };

  /* 혜지 : OpenVidu 연결 관련 메소드 시작 */
  const onbeforeunload = async (e) => {
    await deletePlayer();
  };

  const joinSession = async (token) => {
    try {
      session.on("streamCreated", async (event) => {
        //let participant = session.subscribe(event.stream, undefined);
        dispatch(openViduActions.enteredParticipant(event.stream));
      });

      session.on("streamDestroyed", (event) => {
        //deleteParticipant(event.stream.streamManager);
        dispatch(openViduActions.deleteParticipant(event.stream.streamManager));
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
        sessionTimeout: 3600, // 1시간 후 세션 만료
      });

      //await session.publish(pub);

      let devices = await OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");
      var currentVideoDeviceId = pub.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      var currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId
      );

      dispatch(openViduActions.createPublisher({publisher:pub,currentVideoDevice:currentVideoDevice}));
    } catch (error) {
      router.push({
        pathname: "/exception",
        query: { msg: "화상 연결에 문제가 있어요!" },
      });
    }
  };

  const leaveSession = () => {
    dispatch(openViduActions.leaveSession({}));
  };
  /* 혜지 : OpenVidu 연결 관련 메소드 완료 */

  useEffect(() => {
    joinSession(token);
    dispatch(resetTmpPlayers());  // redux players 삭제
    getPlayerList();
    connectSocket();
    subscribeSocket();

    window.addEventListener("beforeunload", onbeforeunload);

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      if (subGame) {
        subGame.unsubscribe();
      }
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
  }, [playerReady, startGame]);
  /* 희진 : 리랜더링 방지 끝 */

  return (
    <div className={styles.container}>
      <div className="roof2"></div>
      <div className={styles.room}>
        <div className={styles.camList} style={{ marginTop: '50px', marginBottom: '10px', textAlign: 'center' }} >
            {memoRoomCam} 

        </div>
        {memoRoomChat}
        {memoRoonBtn}
      </div>
    </div>
  );
}
