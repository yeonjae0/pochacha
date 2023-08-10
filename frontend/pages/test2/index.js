'use client'
import React, { useState } from "react";
import { useSelector } from "react-redux";



function OtherPage() {
  const fruits = useSelector(state => state.fruit.fruits);
  const playerInfo = useSelector(state => state.players.players);
  const roomInfo = useSelector(state => state.room.currentRoomId);

  return (
    <div>
      {/* <h2>Fruit List</h2>
      {fruits} */}
      <hr />
      <h2>플레이어 정보</h2>
      {playerInfo && playerInfo.length > 0 ? (
        <ul>
          {playerInfo.map(player => (
            <li key={player.playerId}>
              <p>Player ID: {player.playerId}</p>
              <p>Nick: {player.nick}</p>
              <p>Ready: {player.ready ? "Ready" : "Not Ready"}</p>
              {/* Display other player properties as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players available</p>
      )}
      <hr />
      <h2>방정보</h2>
      <h3>{roomInfo}</h3>
    </div>
  );
}

export default OtherPage;