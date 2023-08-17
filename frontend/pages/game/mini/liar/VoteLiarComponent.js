import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from '@/styles/LiarGame.module.css';



export default function VoteLiarComponent(){
    const [client, setClient] = useState({});
    const [stageStatus, setStageStatus] = useState('voting');
    const [voteStatus, setVoteStatus] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const roomId = useSelector(state => state.room.currentRoomId);
    const currentPlayer = useSelector(state => state.player)
    let players = useSelector(state => state.players.players)
    // console.log('플레이어', currentPlayer)
    // console.log('플레이어들', players)

    const handleRadioChange = (event) => {
      setSelectedPlayer(event.target.id)
      console.log(selectedPlayer)
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
          console.log(data);
          if(data.total===4){
            //모두 투표 완료
            if(data.tiebreak===false) {
              //승패 결정
              if(data.winner===true) {
                //라이어 승
                setStageStatus('liarWin')
                // status >> liarWin으로 설정하여 멘트 표시
              }
              else {
                //세명의 승
                setStageStatus('liarLose')
                // status >> liarLose으로 설정하여 멘트 표시
              }
            }
            else {
              setStageStatus('voting')
              players = data.tiebreaker
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
      console.log('------------------------')
      console.log('투표하기 클릭 시 선택된 플레이어', selectedPlayer)
      console.log('send 처리 전 voteStatus', voteStatus)
      console.log('------------------------')
      if(!voteStatus) {
        if(selectedPlayer){
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
       } else {
        alert('이미 투표에 참여하셨습니다.')
       }
    }

    const handleVoteComplete = () => {
      if(voteStatus) {
        alert('이미 투표에 참여하셨습니다.')
        }
    }

    return (
      <>
      {
        stageStatus === 'voting' ?
        (<>
          <h1 style={{marginBottom: '30px'}}>누가 거짓말을 하고 있을까?</h1>
        <div className={styles.vote_container}>
            <fieldset className={styles.fieldSet}>
              <legend className={styles.legend}>라이어라고 생각되는 사람에게 투표하세요</legend>
              <div>
              {
                players.map((player, i) => (
                  <label key={player.id}>
                    <input style={{marginTop:'20px'}} type="radio" id={player.playerId} name="votePlayer" value={player.nick} onChange={handleRadioChange}/>
                    <span style={{fontSize: '18px'}}>{player.nick}</span><br />
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
        : null
      }
        </>
        )
}

function LiarResult() {
  const [liar, setLiar] = useState(false) // false면 일반인, true면 라이어

  return (
    <div>
      {
        stageStatus === 'liarWin' ?
          (liar == false ? 
            <div className={styles.checkword}>
              <h1>아쉽네요. 라이어의 승리입니다.</h1>
              <div>
                <h3>라이어는 {} 입니다.</h3>
              </div>
            </div>
          : <div>축하합니다. 당신의 승리입니다.</div>)
          : null
      }
    </div>
  )
}