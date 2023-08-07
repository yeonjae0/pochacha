// player 정보를 저장해보자
// 이렇게 저장하는건 싱글 플레이

import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentNick: "",
  currentPlayerId: "",
  currentReady: False,
  currentToken: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerInRoom: (state, action) => {
      state.currentNick = action.payload.nick;
      state.currentPlayerId = action.payload.playerId
      state.currentReady = action.payload.ready
      state.currentToken = action.payload.token
    },
  }
});


export default playerSlice;
export const {
  playerInRoom
} = playerSlice.actions