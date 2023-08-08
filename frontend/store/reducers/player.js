// player 정보를 저장해보자
// 이렇게 저장하는건 싱글 플레이

import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  players: [],
  // currentNick: "",
  // currentPlayerId: "",
  // currentReady: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    updatePlayer: (state, action) => {
      let {playerId, updates} = action.payload
      let playerIdx = state.players.findIndex(player => player.currentPlayerId=== playerId)
      if (playerIdx !== -1) {
        state.players[playerIndex] = { ...state.players[playerIdx], ...updates };
      }
    }
    // playerInRoom: (state, action) => {
    //   state.currentNick = action.payload.nick;
    //    state.currentPlayerId = action.payload.playerId //오픈비두 토큰
    //   state.currentReady = action.payload.ready
    // },
  }
});


export default playerSlice;
export const {
  // playerInRoom
  addPlayer,
  updatePlayer
} = playerSlice.actions