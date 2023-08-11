// 룸 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentRoomId: "",
  currentProgress: false,
  currentSecret: false,
  currentIncludeMini: true,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      state.currentRoomId = action.payload.roomId;
      state.currentProgress = action.payload.progress;
      state.currentSecret = action.payload.secret;
    },
    changeMini: (state) => {
      state.currentIncludeMini = !state.currentIncludeMini;
    }
  }
});


export default roomSlice;
export const {
  enterRoom,
  changeMini
} = roomSlice.actions