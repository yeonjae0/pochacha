'use client'

import React from "react";
import { useSelector } from "react-redux";

function OtherPage() {
  const playersInfo = useSelector(state => state.players.players);
  const roomInfo = useSelector(state => state.room.currentRoomId);
  const playerInfo = useSelector(state=>state.player.currentNick);

  return (
    <div>
      <h2>플레이어들 정보</h2>
      {playersInfo && playersInfo.length > 0 ? (
        <ul>
          {playersInfo.map(player => (
            <div key={player.playerId}>
              <p>Player ID: {player.playerId}</p>
              <p>Head: {player.head}</p>
              <p>Nick: {player.nick}</p>
              <p>Ready: {player.ready ? "Ready" : "Not Ready"}</p>
            </div>
          ))}
        </ul>
      ) : (
        <p>No players available</p>
      )}
      <hr />
      <h2>방정보</h2>
      <h3>{roomInfo}</h3>
      <hr/>
      <h2>내정보</h2>
      <h3>{playerInfo}</h3>
    </div>
  );
}

export default OtherPage;