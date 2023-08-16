import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';



export default function VoteLiarComponent(){
    const [client, setClient] = useState({});
    const [voteStatus, setVoteStatus] = useState(false);
    
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const roomId = useSelector(state => state.room.currentRoomId);
    const currentPlayer = useSelector(state => state.player)
    const players = useSelector(state => state.players.players)
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
        })
      })
    }
    
    useEffect(() => {
      connectSocket();
      subscribeSocket();
    }, [])

    const handleVoteClick = () => {
      console.log('------------------------')
      console.log(selectedPlayer)
      console.log(voteStatus)
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

    return (
        <div>
          <h1>누가 거짓말을 하고 있을까?</h1>
            <fieldset style={{width: '400px'}}>
              <legend style={{backgroundColor: '#000', color: '#fff', padding: '3px 6px'}}>라이어라고 생각되는 사람에게 투표하세요</legend>
              {
                players.map((player, i) => (
                  <label key={player.id}>
                    <input type="radio" id={player.playerId} name="votePlayer" value={player.nick} onChange={handleRadioChange}/>
                    <span>{player.nick}</span><br />
                  </label>
                ))
              }
            </fieldset>
            <button style={{width: '100px', height:'100px', backgroundColor: "black", color:'white'}}onClick={handleVoteClick}>투표하기</button>
        </div>
        )
}


// let sendData = {
//     "playerId": currentPlayer.currentPlayerId,
//     "vote": vote,
//   };
//   if (client.current) {
//     client.current.send(`/mini/liar/set/${roomId}`, {}, JSON.stringify(sendData));
//   } else {
//     alert("소켓 연결 실패!");
//   }