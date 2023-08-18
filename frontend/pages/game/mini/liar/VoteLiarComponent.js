import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from '@/styles/LiarGame.module.css';


export default function VoteLiarComponent() {
  const roomId = useSelector(state => state.room.currentRoomId);
  const currentPlayer = useSelector(state => state.player)
  const players = useSelector(state => state.players.tmpPlayers)

  const [client, setClient] = useState({});
  const [stageStatus, setStageStatus] = useState('voting');
  const [voteStatus, setVoteStatus] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [liar, setLiar] = useState(null);
  const [word, setWord] = useState('');
  const [playerList, setPlayerList] = useState(Object.keys(players))

  const handleRadioChange = (event) => {
    setSelectedPlayer(event.target.id);
  }

  const connectSocket = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:80/ws");
      return sock;
    });
  }

  const subscribeSocket = () => {
    client.current.connect({}, () => {
      client.current.subscribe(`/topic/mini/liar/vote/${roomId}`, (response) => {
        let data = JSON.parse(response.body);
        if (data.total === 4) {
          //모두 투표 완료
          if (data.tiebreak === false) {
            //승패 결정
            setLiar(data.liar)
            setWord(data.word)
            if (data.winner === true) {
              //라이어 승
              setStageStatus('liarWin');
              // status >> liarWin으로 설정하여 멘트 표시
            }
            else {
              //세명의 승
              setStageStatus('liarLose');
              // status >> liarLose으로 설정하여 멘트 표시
            }
          }
          else {
            alert("동률이 나왔습니다. 재투표 해주세요!")
            setStageStatus('voting')
            setVoteStatus(false)
            setPlayerList(data.tiebreaker)
            //재투표
            //투표 대상 : tiebreaker
            //투표 대상 인원 : tiebreaker.length()
          }
        }
      })
    })
  }

  useEffect(() => {
    connectSocket();
    subscribeSocket();
  }, [])

  const handleVoteClick = () => {
    if (!voteStatus) {
      if (selectedPlayer) {
        let sendData = {
          "playerId": currentPlayer.currentPlayerId,
          "vote": selectedPlayer,
        };
        if (client.current) {
          client.current.send(`/mini/liar/vote/${roomId}`, {}, JSON.stringify(sendData));
          setVoteStatus(true)
        } else {
          alert("소켓 연결 실패!");
        }
      } else {
        alert('플레이어를 선택해주세요!')
      }
    }
  }

  const handleVoteComplete = () => {
    if (voteStatus) {
      alert('이미 투표에 참여하셨습니다.')
    }
  }

  return (
    <>
      {
        stageStatus === 'voting' ?
          (<>
            <h1 style={{ marginBottom: '30px' }}>누가 거짓말을 하고 있을까?</h1>
            <div className={styles.voteContainer}>
              <fieldset className={styles.fieldSet}>
                <legend className={styles.legend}>라이어라고 생각되는 사람에게 투표하세요</legend>
                <div>
                  {
                    playerList.map((player, i) => (
                      <label key={i}>
                        <input style={{ marginTop: '20px' }} type="radio" id={players[player].id} name="votePlayer" value={players[player].nickname} onChange={handleRadioChange} />
                        <span style={{ fontSize: '18px' }}>{players[player].nickname}</span><br />
                      </label>
                    ))
                  }
                </div>
              </fieldset>
              {
                voteStatus == false ?
                  (<button className={styles.beforeVotebtn} onClick={handleVoteClick}>투표하기</button>)
                  : (<button className={styles.voteCompletebtn} onClick={handleVoteComplete}>투표완료</button>)

              }
            </div>
          </>)
          : <LiarResult stageStatus={stageStatus} liar={liar} currentPlayer={currentPlayer.currentPlayerId} word={word} />
      }
    </>
  )
}

function LiarResult(props) {
  const players = useSelector(state => state.players.tmpPlayers)
  let word = props.word;
  let stageStatus = props.stageStatus;
  let isLiar = null
  // false면 일반인, true면 라이어
  if (props.currentPlayer === props.liar) {
    isLiar = true
  } else {
    isLiar = false;
  }
  let liarNick = players[props.liar].nickname;


  return (
    <div className={styles.resultContainer}>
      {
        stageStatus === 'liarWin' ?
          (
            (isLiar == true) ?
              (
                <div>
                  <h1>축하합니다.<br />당신의 승리입니다.</h1><br />
                  <h2>제시 단어는 <span style={{ fontSize: 'xx-large' }}>{word}</span> 입니다.</h2>
                </div>
              )
              : (
                <div>
                  <h1>아쉽네요.<br /> 라이어의 승리입니다.</h1>
                  <div>
                    <h2>라이어는<br /> <span style={{ fontSize: 'xx-large' }}>{liarNick}</span><br /> 입니다.</h2>
                  </div>
                </div>)
          )
          : (
            (isLiar == true) ?
              (
                <div>
                  <h1>아쉽네요.<br />당신의 패배입니다.</h1><br />
                  <h2>제시 단어는 <span style={{ fontSize: 'xx-large' }}>{word}</span> 입니다.</h2>
                </div>
              )
              : (
                <div>
                  <h1>축하합니다.<br /> 당신의 승리입니다.</h1>
                  <div>
                    <h2>라이어는<br /> <span style={{ fontSize: 'xx-large' }}>{liarNick}</span><br /> 입니다.</h2>
                  </div>
                </div>)
          )
      }
    </div>
  )
}