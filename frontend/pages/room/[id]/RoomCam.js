import { OpenVidu } from 'openvidu-browser'
import React, { useState, useEffect } from 'react'
import UserVideoComponent from './UserVideoComponent'
import styles from '@/styles/RoomPage.module.css'
//import {BsFillCameraVideoFill,BsFillCameraVideoOffFill} from 'react-icons/bs'
import { useSelector } from "react-redux";

export default function RoomCam() {

  const OV = new OpenVidu();
  let session = OV.initSession();

  const roomId= useSelector(state => state.room.currentRoomId); //오픈비두 세션
  const token=useSelector(state => state.player.currentPlayerId); //오픈비두 토큰
  const nickname=useSelector(state => state.player.currentNick);
  const players=useSelector(state=>state.players.players);
  // console.log(players[0].nick);

  const [mainStreamManager, setMainStreamManager] = useState(undefined);// 메인비디오
  const [publisher, setPublisher] = useState(undefined); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]);//참여자들
  //const [devices, setDevices] = useState([]);
  //const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);//현재 비디오장치

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
    // console.log("HANDLE MAIN VIDEO STREAM");
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const deleteParticipant = (streamManager) => {
    // console.log("DELETE PARTICIPANT");
    let tempParticipants=participants;
    let index = tempParticipants.indexOf(streamManager, 0);
    if (index > -1) {
      tempParticipants.splice(index,1);
      setParticipants(tempParticipants);
    }
  }  

  const joinSession = async (token) => {
    // console.log("JOINSESSION");
    console.log("TOKEN");
    console.log(token)

    try{
    // 기존에 정의한 session 변수를 사용하도록 수정
    session.on('streamCreated', async(event) => {
      console.log("스트리밍 시작");
      // OpenVidu는 자체적으로 VIDEO 생성 못함
      console.log(event.stream);
      let participant = session.subscribe(event.stream, undefined);
      
      //let tempParticipants=participants;
      //tempParticipants=[...tempParticipants,participant];
      setParticipants(participants => [...participants, participant]);
    
      console.log("참가자들");
      console.log(participants);
    });

    session.on('streamDestroyed', (event) => {
      console.log("스트리밍 종료");
      deleteParticipant(event.stream.streamManager);
    });

    session.on('exception', (exception) => {
      console.warn(exception);
    });

    /* 혜지 : 모든 사용자 PUBLISHER 지정 필수 */
    await session.connect(token, { clientData: nickname, publisher: true });

        /* 카메라 세팅 */
        let pub= await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // 오디오
          videoSource: undefined, // 비디오
          publishAudio: true, // 오디오 송출
          publishVideo: true, // 비디오 송출
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // 비디오 컨테이너 적재 방식
          mirror: false, // Whether to mirror your local video or not
        });

        await session.publish(pub);

          let deviceList = await OV.getDevices();
          console.log(deviceList);
          var videoDevices = deviceList.filter(device => device.kind === 'videoinput');
          var currentVideoDeviceId = pub.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          setMainStreamManager(pub);
          setPublisher(pub);

          // var updatedParticipants = [...participants]; // 새로운 배열을 만들어서 업데이트
          // updatedParticipants.push(participant);
          // setParticipants(updatedParticipants);
      }catch(error){
        console.log('OPENVIDU ERROR');
        console.log(error);
      }
  }

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setParticipants([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
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
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null} */}
          <div id="video-container" className={styles.camList}>
            {publisher !== undefined ? (
              // <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                <UserVideoComponent className={styles.cam}
                  streamManager={publisher} nickname={nickname} />
              // </div>
            ) : null}
            {participants.map((sub, i) => (
              <span key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                {console.log(sub)}
                <UserVideoComponent className={styles.cam} streamManager={sub} nickname={"닉네임 왜안돼"} />
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
