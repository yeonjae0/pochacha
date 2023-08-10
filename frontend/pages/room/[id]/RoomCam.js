import { OpenVidu } from 'openvidu-browser'
import React, { useState, useEffect } from 'react'
import UserVideoComponent from './UserVideoComponent'
import styles from '@/styles/RoomPage.module.css'
import { useSelector } from "react-redux";

export default function RoomCam() {

  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  let OV = new OpenVidu();
  let session = OV.initSession();

  const token=useSelector(state => state.player.currentPlayerId); //오픈비두 토큰
  const nickname=useSelector(state => state.player.currentNick);

  const [mainStreamManager, setMainStreamManager] = useState(undefined);// 메인비디오
  const [publisher, setPublisher] = useState(undefined); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]);//참여자들

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
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const deleteParticipant = (streamManager) => {
    let tempParticipants=participants;
    let index = tempParticipants.indexOf(streamManager, 0);
    if (index > -1) {
      tempParticipants.splice(index,1);
      setParticipants(tempParticipants);
    }
  }  

  const joinSession = async (token) => {
    try{
    session.on('streamCreated', async(event) => {
      let participant = session.subscribe(event.stream, undefined);
      
      let tempParticipants=participants;
      tempParticipants.push(participant);
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
      }catch(error){
        console.log(error);
      }
  }

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    OV=null;
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setParticipants([]);
  }

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="video-container" className={styles.camList}>
            {publisher !== undefined ? (
                <UserVideoComponent className={styles.cam}
                  streamManager={publisher} nickname={nickname} />
            ) : null}
            {participants.map((sub, i) => (
              <span key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                {console.log(JSON.parse(sub.stream.connection.data.split("%")[0]).clientData)}
                <UserVideoComponent className={styles.cam} streamManager={sub} nickname={JSON.parse(sub.stream.connection.data.split("%")[0]).clientData} />
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
