'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import DiceBox from './DiceBox.js'
import ActiveBoard from './ActiveBoard.js'
import styles from '@/styles/GamePage.module.css'
import { styled } from 'styled-components'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import axios from 'axios'
import { useSelector } from "react-redux";
import { OpenVidu } from 'openvidu-browser'; /* OpenVidu 관련 */
import RoomCam from '@/pages/room/[id]/RoomCam.js'

/* 연재 : 모달 시작 */
// 해야할 것: 모달 창 꾸미기
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Apply the opacity here */
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const ModalContent = styled.div`
  background-color: white;
  padding: 70px;
  /* transition: visibility 0.5s ease-out; */
  border-radius: 20px;
  `;

export default function GamePage() {

  const router = useRouter()

  /* 혜지 : OpenVidu 관련 데이터 시작 */
  const publisher=useSelector(state=>state.openvidu.publisher);
  const [participants, setParticipants] = useState([]);//참여자들
  //let participants=useSelector(state=>state.openvidu.participants);
  const deleteParticipant = (streamManager) => {
    let tempParticipants = participants;
    let index = tempParticipants.indexOf(streamManager, 0);
    if (index > -1) {
      tempParticipants.splice(index, 1);
      setParticipants(tempParticipants);
    }
  }

  const onbeforeunload = (e) => {
    leaveSession();
  }

  const session=useSelector(state=>state.openvidu.session);
  console.log("세션")
  console.log(session)

  const joinSession = async (token) => {
    try {
      session.on('streamCreated', async (event) => {
        let participant = session.subscribe(event.stream, undefined);
        let tempParticipants = participants;
        tempParticipants.push(participant);
        setParticipants(tempParticipants);
        
        console.log(participants);
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

      console.log(publisher);
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
 /* 혜지 : OpenVidu 관련 데이터 끝 */

  let roomId = useSelector(state => state.room.currentRoomId)
  let includeMini = useSelector(state => state.room.currentIncludeMini) // 미니게임 진행 여부
  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(0); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수
  let [client, setClient] = useState({});
  let [currentCell, setCurrentCell] = useState('')
  let [showModal, setShowModal] = useState(false);
  let [cellObj, setCellObj] = useState({});

  // 현재 방의 맵 불러오는 함수
  const createMap = async () => {
    axios({
      url: "http://localhost:80/game/start",
      header: {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      data: {
        "id": roomId, // RoomRequestDto에 id 삽입
        includeMini  // 미니게임 여부
      }
    }).then((response) => {
      setCellObj(
        {
          'one': response.data[0].status,
          'two': response.data[1].status,
          'three': response.data[2].status,
          'four': response.data[3].status,
          'five': response.data[4].status,
          'six': response.data[5].status,
          'seven': response.data[6].status,
          'eight': response.data[7].status,
          'nine': response.data[8].status,
          'ten': response.data[9].status,
          'eleven': response.data[10].status,
          'twelve': response.data[11].status,
          'thirteen': response.data[12].status,
          'fourteen': response.data[13].status,
          'fifteen': response.data[14].status,
          'sixteen': response.data[15].status,
          'seventeen': response.data[16].status,
          'eighteen': response.data[17].status,
          'nineteen': response.data[18].status,
          'twenty': response.data[19].status,
          'twentyone': response.data[20].status,
          'twentytwo': response.data[21].status,
          'twentythree': response.data[22].status,
          'twentyfour': response.data[23].status,
        }
      )
      console.log('RoomId', roomId)
      console.log('Cell Data', response.data)
    }).catch((error) => {
      if(error.response) {
        router.push({
            pathname: "/exception",
            query: { msg: error.response.data },
          })
      } else { console.log(error) }
    });
    /*
      TO DO :: Cell 색에 맞춰 배합
    */
  };

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws")
      return sock;
    });
    client.current.debug = () => { };
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(`/topic/move/${roomId}`, (response) => {
        let data = JSON.parse(response.body)
        let currentCell = data.cell.name

        setDice(data.game.dice)
        setPin(data.game.pin)
        setLab(data.game.lab)
        setCurrentCell(data.cell.name)
        {currentCell == '두더지 게임' ? (window.location.href = 'http://localhost:3000/game/mini/mole') : null}
        {currentCell == '훈민정음' ? (window.location.href = 'http://localhost:3000/game/mini/spell') : null}
        {currentCell == '라이어 게임' ? (window.location.href = 'http://localhost:3000/game/mini/liar') : null}
        // console.log(data.game)
        // console.log(data.cell)
        // console.log(data.game.pin)
      })
    })
  }

  useEffect(() => {
    // 최초 한 번 CellList 불러오기
    createMap()
    connectSocket()
    subscribeSocket()

    joinSession(token);
    return()=>{
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, [])

  let handleRollDiceClick = () => {
    setTimeout(() => {
      setShowModal(true)
    }, 1000)
    setTimeout(() => {
      setShowModal(false)
    }, 2500)
    // setShowModal(false)
  }

  const ModalPage = ({ currentCell, pin }) => {

    useEffect(() => {
      if (showModal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    }, [showModal])

    return (
      <>
        {showModal && (
          <ModalContainer id='modalContainer'>
            <ModalContent className={styles.modalContent} style={{ zIndex: '1' }}>
              <p>{currentCell}</p>
              {/* {
                currentCell == '두더지 게임' ?
                (window.location.href = 'http://localhost:3000/game/mini/mole')
                : null
              }
              {
                currentCell == '훈민정음' ?
                (window.location.href = 'http://localhost:3000/game/mini/spell')
                : null
              }
              {
                currentCell == '라이어 게임' ?
                (window.location.href = 'http://localhost:3000/game/mini/liar')
                : null
              } */}
              {/* <button onClick={onCloseModal}>Close</button> */}
            </ModalContent>
          </ModalContainer>
        )}
      </>
    )
  }

  /* 연재 : 모달 끝 */

  return (
    <div className={styles.container}>
      <nav className={styles.infobar}>
        <h5>주사위 눈 : {dice}, 현재 {pin}번 블록에 위치, {lab}바퀴</h5>
      </nav>
      <button className={styles.btnRolling} value="innerHTML" onClick={() => {
        var sendData = {
          "dice": dice,
          "pin": pin,
          "lab": lab,
        };

        client.current.send("/move/" + roomId, {}, JSON.stringify(sendData));
        handleRollDiceClick();
      }}>주사위 굴리기</button>
      <div>
        {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}> */}

        {/* <div className={styles.upper_container}>
          <video className={styles.cam} style={{ float: 'left' }} ref={videoRef} /> 
          <video className={styles.cam} style={{ float: 'right' }} ref={videoRef} /> 
        </div> */}

        <div className={styles.camList}>
          <RoomCam publisher={publisher} participants={participants}/>
        </div>

        {/* <div style={{ position: "relative" }}> */}
        <div>
          <DiceBox dice={dice} />
          <ActiveBoard pin={pin} cellObj={cellObj} />
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
          </div> */}

          {/* <div style={{ position: "absolute" }}>
            <BoardMap pin={pin} style={{ bottom: "0" }} />
          </div> */}
        </div>
        {/* <div className={styles.lower_container}>
          <video className={styles.cam} style={{ float: 'left' }} ref={videoRef} />
          <video className={styles.cam} style={{ float: 'right' }} ref={videoRef} />
        </div> */}
      </div>
      <>
        <ModalPage currentCell={currentCell} pin={pin} />
      </>
    </div>
  )
}
