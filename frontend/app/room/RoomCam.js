'use client'
/* 속도가 느리나, JS 문법 사용 가능*/

import { OpenVidu } from 'openvidu-browser'

import axios from 'axios'
import React, { Component } from 'react'
import UserVideoComponent from './UserVieoComponent'

/* 
    TO DO :: 백엔드 서버로 호출
*/
//const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const APPLICATION_SERVER_URL = 'http://localhost:80/'

class RoomCam extends Component {
  constructor(props) {
    super(props);

    //값이 바뀔 때마다 RE-RENDER 하기 위한 STATE 요소
    this.state = {
      /*
           TO DO :: SessionId를 UUID로 구성
                    RoomId를 그대로 활용하는 방법도 고려
       */
      mySessionId: 'abcd', //세션ID
      session: undefined, //방

      /*
          TO DO :: 백엔드 닉네임 받아와야 함
      */
      myUserName: '랜덤닉네임' + Math.floor(Math.random() * 100), //닉네임 생성

      mainStreamManager: undefined,  // 메인비디오
      publisher: undefined, //방장
      subscribers: [], //참여자들
    };

    this.joinSession = this.joinSession.bind(this); //세션 참여
    this.leaveSession = this.leaveSession.bind(this); //세션 떠나기
    this.switchCamera = this.switchCamera.bind(this); //카메라 전환 (MainStreamManager 변경)
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this); //세션 이름 변경
    this.handleChangeUserName = this.handleChangeUserName.bind(this); //닉네임 변경
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this); //MainStreamManager 변경
    this.onbeforeunload = this.onbeforeunload.bind(this); //페이지 벗어나는 경우의 이벤트
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession(); //페이지 벗어나는 경우 '세션 떠나기'로 처리
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) { //현재 스트리밍하는 사람이 아닐 경우
      this.setState({
        mainStreamManager: stream //스트리머 변경해주기
      });
    }
  }

  deleteSubscriber(streamManager) { //참여자 리스트에서 제거
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() { //세션 참여

    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        //세션 내 이벤트 발생 시, 액션 특정

        // 스트리밍 생성마다
        mySession.on('streamCreated', (event) => {
          // OpenVidu는 자체적으로 VIDEO 생성 못함
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // 참여자 리스트 UPDATE
          this.setState({
            subscribers: subscribers,
          });
        });

        // 스트리밍 삭제마다
        mySession.on('streamDestroyed', (event) => {

          // 참여자 리스트 CLEAR
          this.deleteSubscriber(event.stream.streamManager);
        });

        // 예외 발생마다
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // 유효한 토큰 가진 세션 연결

        // OpenVidu 서버에서 생성된 토큰 받기
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession.connect(token, { clientData: this.state.myUserName })
            .then(async () => {

              // 자신의 카메라 스트리밍하기

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // 방 열기

              mySession.publish(publisher);

              // 현재 사용중인 비디오
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(device => device.kind === 'videoinput');
              var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

              // 메인비디오 설정
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
      },
    );
  }

  leaveSession() {

    // 세션 떠나기

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // 모든 값 비우기
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'abcd',
      myUserName: '랜덤닉네임' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {

        var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

        if (newVideoDevice.length > 0) {
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });

          await this.state.session.unpublish(this.state.mainStreamManager)

          await this.state.session.publish(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={this.switchCamera}
                value="Switch Camera"
              />
            </div>

            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                {console.log(this.state.mainStreamManager)}
                <UserVideoComponent streamManager={this.state.mainStreamManager} />

              </div>
            ) : null}
            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  {console.log(this.state.publisher)}
                  <UserVideoComponent
                    streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /*
      CONFIRM :: 백엔드 서버를 통하도록 설정
  */

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json', },
    });
    console.log("CREATE SESSION : " + response.data);
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    console.log("CREATE TOKEN : ", response.data);
    return response.data; // The token
  }
}

export default RoomCam
