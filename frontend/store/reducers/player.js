import { createSlice } from "@reduxjs/toolkit";

/* 혜지 : 자기 자신의 아이디, 닉네임, 레디 상태 저장 */
const initialState = {
  currentPlayerId: "",
  currentNick: "",
  currentReady: false,
  currentHead: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setMyData: (state, action) => {
      state.currentPlayerId = action.payload.playerId;
      state.currentNick = action.payload.nick;
      state.currentReady = action.payload.ready;
      state.currentHead = action.payload.head;
    },
    ready: (state, action) => {
      if (action.payload.ready != null) state.currentReady = action.payload.ready;
    },
  },
});

export default playerSlice;
export const { setMyData, ready } = playerSlice.actions;
