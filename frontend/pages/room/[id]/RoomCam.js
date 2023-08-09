import { OpenVidu } from 'openvidu-browser'
import React, { Component, useState, useEffect } from 'react'
import UserVideoComponent from './UserVideoComponent'
import styles from '@/styles/UserVideo.module.css'
//import {BsFillCameraVideoFill,BsFillCameraVideoOffFill} from 'react-icons/bs'
import { useSelector } from "react-redux";

export default function RoomCam(props) {

  const OV = new OpenVidu();
  let session = OV.initSession();

  /*
    TO DO :: 각각의 환경에 저장된 TOKEN을 받을 수 있도록 props에서 변경
  */
  // const roomId= useSelector(state => state.room.currentRoomID); //오픈비두 세션
  // const token=useSelector(state => state.player.players[0].playerId); //오픈비두 토큰
  // const nickname=useSelector(state => state.player.players[0].nick);

  console.log(props.info)
  const token=props.info.playerId;
  const nickname=props.info.nick;

  const [mainStreamManager, setMainStreamManager] = useState(undefined);// 메인비디오
  const [publisher, setPublisher] = useState(undefined); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]);//참여자들
  const [devices, setDevices] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);//현재 비디오장치

  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession(token);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, []);

  const onbeforeunload = (e) => {
    leaveSession();
  }

  const handleMainVideoStream = (stream) => {
    console.log("HANDLE MAIN VIDEO STREAM");
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const deleteParticipant = (streamManager) => {
    console.log("DELETE PARTICIPANT");
    let index = participants.indexOf(streamManager, 0);
    if (index > -1) {
      setParticipants(participants.splice(index, 1));
    }
  }

  const joinSession = async (token) => {
    console.log("JOINSESSION");
    console.log("TOKEN");
    console.log(token)

    // 기존에 정의한 session 변수를 사용하도록 수정
    session.on('streamCreated', (event) => {
      console.log("STREAM CREATED");
      // OpenVidu는 자체적으로 VIDEO 생성 못함
      var participant = session.subscribe(event.stream, undefined);
      var updatedParticipants = [...participants]; // 새로운 배열을 만들어서 업데이트
      updatedParticipants.push(participant);
      setParticipants(updatedParticipants);
    });

    session.on('streamDestroyed', (event) => {
      console.log("STREAM DESTROYED");
      deleteParticipant(event.stream.streamManager);
    });

    session.on('exception', (exception) => {
      console.warn(exception);
    });

    /* 혜지 : 모든 사용자 PUBLISHER 지정 필수 */
    await session.connect(token, { clientData: nickname, publisher: true })
      .then(() => {
        console.log("CONNECT OPENVIDU");

        /* 카메라 세팅 */
        OV.initPublisherAsync(undefined, {
          audioSource: undefined, // 오디오
          videoSource: undefined, // 비디오
          publishAudio: true, // 오디오 송출
          publishVideo: true, // 비디오 송출
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // 비디오 컨테이너 적재 방식
          mirror: false, // Whether to mirror your local video or not
        }).then((publisher) => {
          session.publish(publisher);

          console.log("GET DEVICES");
          console.log(OV.getDevices());
          let deviceList = OV.getDevices();
          setDevices(deviceList);
          console.log(devices);
          var videoDevices = devices.filter(device => device.kind === 'videoinput');
          var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        }).catch((error) => {
          console.log('OPENVIDU PUBLISHER ERROR: ', error.code, error.message);
          console.log(error);
        });
      })
      .catch((error) => {
        console.log('OPENVIDU CONNECT ERROR: ', error.code, error.message);
        console.log(error);
      });
  }

  const leaveSession = () => {
    console.log("LEAVE SESSION");
    if (session) {
      session.disconnect();
    }

    // setOV(null);
    // setSession({});
    setParticipants([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setCurrentVideoDevice(undefined);
  }

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            {/* 혜지 : leaveSession 버튼 제거 */}
            {/* <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              /> */}

          </div>

          {/* 혜지 : mainStreaming 비디오 제거 (본인 비디오 두 개 열리는 문제 방지!) */}
          {/* {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                {console.log(this.state.mainStreamManager)}
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null} */}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                {console.log("PUBLISHER: ", publisher)}
                <UserVideoComponent
                  streamManager={publisher} nickname={nickname} />
              </div>
            ) : null}
            {participants.map((sub, i) => (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} nickname={nickname} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
