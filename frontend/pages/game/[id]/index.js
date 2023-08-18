'use client'

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import DiceBox from "./DiceBox";
import ActiveBoard from "./ActiveBoard";
import GameSelect from "./GameSelect";
import OpenViduVideoComponent from '@/pages/room/[id]/OvVideo.js';
import FilterVideoComponent from '@/pages/room/[id]/FilterVideo.js';
import styles from "@/styles/GamePage.module.css";
import Videostyles from '@/styles/UserVideo.module.css';
import { styled } from "styled-components";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import GameOverBoard from "./GameOverBoard"

/* 연재 : 모달 시작 */
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

export default function GamePage() {
  const router = useRouter();

  /* 제정 : RoomCam component에서 필요한 정보들 불러오기 시작 */
  const session = useSelector(state => state.openvidu.session);
  const nickname = useSelector(state => state.player.currentNick);
  const publisher = useSelector(state => state.openvidu.publisher);
  const participants = useSelector(state => state.openvidu.participants);
  /* 제정 : RoomCam component에서 필요한 정보들 불러오기 끝 */

  /* 혜지 : OpenVidu 관련 데이터 */
  const token = useSelector((state) => state.player.currentPlayerId);
  const roomId = useSelector((state) => state.room.currentRoomId);

  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(0); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수
  let [client, setClient] = useState({});
  let [currentCell, setCurrentCell] = useState("");
  let [showModal, setShowModal] = useState(false);
  let [prevDice, setPrevDice] = useState(0); // 이전 주사위 값 저장
  let [visible, setVisible] = useState(false)
  let [hideBtn, setHideBtn] = useState(false) // 미니게임 진행 중 주사위 가리기
  let [cnt, setCnt] = useState(0)
  let [cntDice, setCntDice] = useState(0)

  const [facefilterNick, setFacefilterNick] = useState("");
  const [facefilterNum, setFaceFilterNum] = useState(0);

  const data = useSelector((state) => state.cell.currentBoard);
  const tmpPlayers = useSelector(state => state.players.tmpPlayers);
  const setTurns = useSelector(state => state.cell.turns);
  const myId = useSelector(state => state.player.currentPlayerId);
  
  const cellObj = {
    one: data[0].status,
    two: data[1].status,
    three: data[2].status,
    four: data[3].status,
    five: data[4].status,
    six: data[5].status,
    seven: data[6].status,
    eight: data[7].status,
    nine: data[8].status,
    ten: data[9].status,
    eleven: data[10].status,
    twelve: data[11].status,
    thirteen: data[12].status,
    fourteen: data[13].status,
    fifteen: data[14].status,
    sixteen: data[15].status,
    seventeen: data[16].status,
    eighteen: data[17].status,
    nineteen: data[18].status,
    twenty: data[19].status,
    twentyone: data[20].status,
    twentytwo: data[21].status,
    twentythree: data[22].status,
    twentyfour: data[23].status,
  };

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(process.env.NEXT_PUBLIC_WS + "/ws")
      return sock;
    });
    client.current.debug = () => { };
  };

  const addMoving=(move)=>{
    client.current.send("/move/" + roomId, {}, JSON.stringify({"set":true, "move":move}));
  };

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(`/topic/move/${roomId}`, (response) => {
        // 앞선 data 중복으로 변경 data -> position
        let position = JSON.parse(response.body);
        setDice(position.game.dice);
        setPin(position.game.pin);
        setLab(position.game.lab);
        setCurrentCell(position.cell.name);
        handleRollDiceClick();

        /* 말을 움직이는 셀 작동 구현*/
          if (parseInt(position.cell.move) !== 0 &&  parseInt(position.cell.move) !== NaN) {
            addMoving(position.cell.move);

        if (position.cell.name == '페이스 필터 벌칙') {
          callFaceFilter(nickname);
        }

        if (position.cell.name == '두더지 게임' || position.cell.name == '라이어 게임' || position.cell.name == '훈민정음') {
          setVisible(true)
        }
        }

      });
      client.current.subscribe(`/topic/penalty/${roomId}`, (response) => {
        const data = JSON.parse(response);
        setFacefilterNick(data.nickname);
        setFaceFilterNum(data.num);
      });
    }
    );
  };

  const callFaceFilter = (nickname) => {
    client.current.send("/penalty/" + roomId, {}, JSON.stringify({ "nickname": nickname }));
  };

  useEffect(() => {
    connectSocket();
    subscribeSocket();
  }, []);

  let handleRollDiceClick = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };
  useEffect(() => {
    setCnt((prevCnt) => (prevCnt + 1) % 4);
    setCntDice((prevCntDice) => (prevCntDice + 1));
  }, [pin])

  const cellNameGif =
  {
    '한 칸 앞으로 이동': '',
    '한 칸 뒤로 이동': '',
    '두 칸 앞으로 이동': '',
    '벌칙 제거 (없으면 까비)': '',
    '한 턴 영어 금지': '영어금지',
    '한 턴 안주 금지': '안주금지',
    '목소리 변조 벌칙': '목소리',
    '페이스 필터 벌칙': '필터',
    '걸린 사람 빼고 원샷': '원샷',
    '원샷': '원샷',
    '건배사': '건배사',
    '물 1L 마시기': '1L',
    '한 명 지목해서 같이 원샷': '원샷',
    '코끼리코 52바퀴': '코끼리코',
    '웃긴 썰 풀기': '웃썰',
    '파워댄스': '댄스',
    '카메라에 뽀뽀': '뽀뽀',
    '다 함께 원샷': '원샷',
    '성대모사': '성대모사',
    '지금 바로 한잔 마시기': '한잔'
  }

  const cellValue = cellNameGif[currentCell];

  const ModalPage = ({ currentCell, pin }) => {
    return (
      <>
        {showModal && (
          <ModalContainer style={{ animation: 'fadeIn 2s' }}>
            <p>{cellValue && <img style={{ width: '400px' }} src={`/cell/${cellValue}.gif`} />}</p>
            <p style={{ fontFamily: 'LeeSeoyun', fontSize: '50px', color: '#FFFFFF' }}>{currentCell}</p>
          </ModalContainer>
        )}
      </>
    );
  };
  /* 연재 : 모달 끝 */

  /* 희진 : 리랜더링 방지 시작 */
  // 방장 카메라

  const memoRoomCamPub = useMemo(() => {
    return (
      facefilterNick !== null ?
        (facefilterNick === nickname ?
          <FilterVideoComponent className={styles.cam} streamManager={publisher} num={facefilterNum} />
          : <OpenViduVideoComponent className={styles.cam} streamManager={publisher} />
        ) : null
    )
  }, [facefilterNick, facefilterNum]);

  // 참가자 카메라
  const memoVideoFirst = useMemo(() => {
    return (
      facefilterNick !== null ?
        (facefilterNick === participants[0].nick ?
          <FilterVideoComponent className={styles.cam} streamManager={publisher} num={facefilterNum} />
          : <OpenViduVideoComponent className={styles.cam} streamManager={participants[0].participant} />
        ) : null
    )
  }, [facefilterNick, facefilterNum])

  const memoVideoSecond = useMemo(() => {
    return (
      facefilterNick !== null ?
        (facefilterNick === participants[1].nick ?
          <FilterVideoComponent className={styles.cam} streamManager={publisher} num={facefilterNum} />
          : <OpenViduVideoComponent className={styles.cam} streamManager={participants[1].participant} />
        ) : null
    )
  }, [facefilterNick, facefilterNum])

  const memoVideoThird = useMemo(() => {
    return (
      facefilterNick !== null ?
        (facefilterNick === participants[2].nick ?
          <FilterVideoComponent className={styles.cam} streamManager={publisher} num={facefilterNum} />
          : <OpenViduVideoComponent className={styles.cam} streamManager={participants[2].participant} />
        ) : null
    )
  }, [facefilterNick, facefilterNum])
  /* 희진 : 리랜더링 방지 끝 */

  useEffect(() => {
    if (currentCell == "두더지 게임" || currentCell == "라이어 게임" || currentCell == "훈민정음") {
      setHideBtn(true)
    } else {
      setHideBtn(false)
    }
  }, [currentCell])

  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.infobar}>
          <h5>
            주사위 눈 : {dice}, 현재 {pin}번 블록, {lab}바퀴 째
          </h5>
          <h5> {tmpPlayers[setTurns[cnt]].nickname}님의 차례입니다.</h5>
        </nav>

        {/* 미니게임 때 버튼 숨기기 (레이아웃은 유지) */}

        { hideBtn && (
        <div style={{ textAlign: 'center', visibility: 'hidden' }}>
          <button className={styles.btnRolling} style={{ zIndex: '0', visibility: setTurns[cnt] !== myId ? 'hidden' : 'visible' }} value="innerHTML" onClick={() => {
            client.current.send("/move/" + roomId, {}, JSON.stringify({"set":false}));
            //handleRollDiceClick();
          }}>주사위 굴리기</button>
        </div>          
        )}

        { !hideBtn && (
        <div style={{ textAlign: 'center' }}>
          <button className={styles.btnRolling} style={{ zIndex: '0', visibility: setTurns[cnt] !== myId ? 'hidden' : 'visible' }} value="innerHTML" onClick={() => {
            client.current.send("/move/" + roomId, {}, JSON.stringify({"set":false}));
            //handleRollDiceClick();
          }}>주사위 굴리기</button>
        </div>     
        )}

        {/* 제정 :  CSS 적용을 위한 RoomCam Component 분해 적용 시작 */}
        {session !== undefined ? (
          <div id="session">
            <div id="video-container" className={styles.grid_container}>

              {publisher !== undefined ? (
                <span className={Videostyles.streamcomponent} style={{ marginLeft: '50px', gridArea: 'cam1' }}>
                  {memoRoomCamPub}
                  <div className={Videostyles.nickname}>{nickname}</div>
                </span>
              ) : null}

              {participants != null ? (
                <>
                  <span className={Videostyles.streamcomponent} style={{ marginRight: '50px', gridArea: `cam${0 + 2}` }}>
                    {memoVideoFirst}
                    <div className={Videostyles.nickname}>{participants[0].nick}</div>
                  </span>
                  <span className={Videostyles.streamcomponent} style={{ marginLeft: '50px', gridArea: `cam${1 + 2}` }}>
                    {memoVideoSecond}
                    <div className={Videostyles.nickname}>{participants[1].nick}</div>
                  </span>
                  <span className={Videostyles.streamcomponent} style={{ marginRight: '50px', gridArea: `cam${2 + 2}` }}>
                    {memoVideoThird}
                    <div className={Videostyles.nickname}>{participants[2].nick}</div>
                  </span>
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div>
          {currentCell == "두더지 게임" ||
            currentCell == "라이어 게임" ||
            currentCell == "훈민정음" ? (
            <GameSelect currentCell={currentCell} />
          ) : (
            <div>
              {cntDice >= 22 && currentCell !== "두더지 게임" && currentCell !== "라이어 게임" && currentCell !== "훈민정음" && (
                <GameOverBoard />
              )}
              <DiceBox dice={dice} />
              <ActiveBoard pin={pin} cellObj={cellObj} />
            </div>
          )}
        </div>
        <>
          <ModalPage currentCell={currentCell} pin={pin} />
        </>
      </div>
    </div>
  );
}
