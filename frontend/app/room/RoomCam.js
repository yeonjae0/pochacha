//'use client' /* 속도가 느리나, JS 문법 사용 가능*/

import { OpenVidu } from 'openvidu-browser'
import React, { Component, useState, useEffect } from 'react'
import UserVideoComponent from './UserVideoComponent'
//import {BsFillCameraVideoFill,BsFillCameraVideoOffFill} from 'react-icons/bs'

export default function RoomCam(props) {
  const roomInfo = props.info;
  console.log("ROOMINFO: ", roomInfo);

  const OV=new OpenVidu();
  let session=OV.initSession();

  const [nickname, setNickname] = useState(roomInfo.nick); //참여자 닉네임
  // const [OV, setOV] = useState(new OpenVidu());//OpenVidu 객체
  // const [session, setSession] = useState({});//방
  const [roomId, setRoomId] = useState(roomInfo.roomId);//방 세션
  const [token, setToken] = useState(roomInfo.token);//참여자 토큰
  const [mainStreamManager, setMainStreamManager] = useState(undefined);// 메인비디오
  const [publisher, setPublisher] = useState(undefined); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]);//참여자들
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);//현재 비디오장치

  console.log("TOKEN: ", token);
  console.log("SESSION: ", session);
  
  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession();
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  },[]);

  /*
    TO DO :: 현재 렌더링 시마다 호출하나, 상태 변경 시마다 호출로 바꾸기
  */
  // useEffect((session) => {
  //   window.addEventListener('beforeunload', onbeforeunload);
  //   joinSession(session);
  //   return () => {
  //     window.removeEventListener('beforeunload', onbeforeunload);
  //   }
  // });

  const onbeforeunload = (e) => {
    leaveSession();
  }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }



  const deleteParticipant = (streamManager) => {
    let index = participants.indexOf(streamManager, 0);
    if (index > -1) {
      setParticipants(participants.splice(index, 1));
    }
  }

  const joinSession = async() => {
    console.log("JOINSESSION");
    
    let mySession = session;

    console.log("MYSESSION",session);
    // if (mySession.event == 'streamCreated') {
    //   // OpenVidu는 자체적으로 VIDEO 생성 못함
    //   console.log("STREAMCREATED");
    //   var participant = mySession.subscribe(mySession.event.stream, undefined);
    //   var participants = participants;
    //   participants.push(participant);
    //   setParticipants(participants);
    // }else if(mySession.event=='streamDestroyed'){
    //   console.log("STREAMDESTROYED");
    //   deleteParticipant(mySession.event.stream.streamManager);
    // }else if(mySession.event=='exception'){
    //   console.warn(mySession.exception);
    // }
    await mySession.on('streamCreated', (event) => {
      // OpenVidu는 자체적으로 VIDEO 생성 못함
      var participant = mySession.subscribe(event.stream, undefined);
      var participants = participants;
      participants.push(participant);
      setParticipants(participants);
    });

    await mySession.on('streamDestroyed', (event) => {
      deleteParticipant(event.stream.streamManager);
    });

    await mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    /* 혜지 : 모든 사용자 PUBLISHER 지정 필수 */
    await mySession.connect(token, { clientData: nickname, publisher: true })
      .then(async () => {
        console.log("CONNECT OPENVIDU");

        /* 카메라 세팅 */
        let publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // 오디오
          videoSource: undefined, // 비디오
          publishAudio: true, // 오디오 송출
          publishVideo: true, // 비디오 송출
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // 비디오 컨테이너 적재 방식
          mirror: false, // Whether to mirror your local video or not
        });

        mySession.publish(publisher);

        var devices = await OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');
        var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

        setCurrentVideoDevice(currentVideoDevice);
        setMainStreamManager(publisher);
        setPublisher(publisher);
      })
      .catch((error) => {
        console.log('OPENVIDU CONNECT ERROR: ', error.code, error.message);
      });  
  }

  const leaveSession = () => {
    const mySession = session;
      
    if (mySession) {
      mySession.disconnect();
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