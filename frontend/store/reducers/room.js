// 룸 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentRoomId: "",
  currentProgress: false,
  currentSecret: false,
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
  }
});


export default roomSlice;
export const {
  enterRoom
} = roomSlice.actions