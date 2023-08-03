'use client' /* 속도가 느리나, JS 문법 사용 가능*/

import { OpenVidu } from 'openvidu-browser'
import React, { Component } from 'react'
import UserVideoComponent from './UserVieoComponent'
import {BsFillCameraVideoFill,BsFillCameraVideoOffFill} from 'react-icons/bs'


class RoomCam extends Component {
  
  constructor(props) {
    super(props);
    const roomInfo = JSON.parse(props.info);
    console.log("ROOMINFO: ",roomInfo);

    this.state = {
      nickname: roomInfo.nick, //참여자 닉네임
      session: undefined, //방
      roomId: roomInfo.roomId, //방 세션
      token: roomInfo.token, //참여자 토큰

      mainStreamManager: undefined,  // 메인비디오
      publisher: undefined, //비디오, 오디오 송신자
      participants: [], //참여자들

    };

    this.joinSession = this.joinSession.bind(this); //CONNECT 연결 및 이벤트 관리
    this.leaveSession = this.leaveSession.bind(this); //CONNECT 종료
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this); //비디오 출력자 관리
    this.onbeforeunload = this.onbeforeunload.bind(this); //페이지 벗어나는 경우 관리

    console.log("TOKEN: ",this.state.token);
    console.log("SESSION: ",this.state.session);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.joinSession(); /* 혜지 : 페이지 렌더링 시에 OPENVIDU CONNECT */
  }

  /*
    TO DO :: 새로 고침 시 OPENVIDU 종료 문제 해결
  */

  componentDidUpdate() {
    // window.addEventListener('beforeunload', this.onbeforeunload);
    // this.joinSession;
    this.forceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession()
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  deleteParticipant(streamManager) {
    let participants = this.state.participants;
    let index = participants.indexOf(streamManager, 0);
    if (index > -1) {
      participants.splice(index, 1);
      this.setState({
        participants: participants,
      });
    }
  }

  joinSession(){
    console.log("JOINSESSION");
    this.OV = new OpenVidu();
    this.setState(
    {
      session: this.OV.initSession(),
    },
    () => {
      var mySession = this.state.session;

      mySession.on('streamCreated', (event) => {
        // OpenVidu는 자체적으로 VIDEO 생성 못함
        var participant = mySession.subscribe(event.stream, undefined);
        var participants = this.state.participants;
        participants.push(participant);

        this.setState({
          participants: participants,
        });
      });

      mySession.on('streamDestroyed', (event) => {

        this.deleteParticipant(event.stream.streamManager);
      });

      mySession.on('exception', (exception) => {
        console.warn(exception);
      });

        /* 혜지 : 모든 사용자 PUBLISHER 지정 필수 */
        mySession.connect(this.state.token, { clientData: this.state.nickname, publisher:true })
          .then(async () => {
            console.log("CONNECT OPENVIDU");

            /* 카메라 세팅 */
            let publisher = await this.OV.initPublisherAsync(undefined, {
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

            var devices = await this.OV.getDevices();
            var videoDevices = devices.filter(device => device.kind === 'videoinput');
            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            this.setState({
              currentVideoDevice: currentVideoDevice,
              mainStreamManager: publisher,
              publisher: publisher,
            });
          })
          .catch((error) => {
            console.log('OPENVIDU CONNECT ERROR: ', error.code, error.message);
          });
      
    },
  );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      participants: [],
      nickname: roomInfo.nick,
      mainStreamManager: undefined,
      publisher: undefined
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.session !== undefined ? (
          
          <div id="session">
            <div id="session-header">
              {/* <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              /> */}

            </div>

            {/* {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                {console.log(this.state.mainStreamManager)}
                <UserVideoComponent streamManager={this.state.mainStreamManager} />

              </div>
            ) : null} */}
            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  {console.log(this.state.publisher)}
                  <UserVideoComponent
                    streamManager={this.state.publisher} nickname={this.state.nickname} />
                </div>     
              ) : null}
              {this.state.participants.map((sub, i) => (
                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} nickname={this.state.nickname}  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

}

export default RoomCam
