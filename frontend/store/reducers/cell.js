// 셀 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: [],
  startGame: false,
};

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    /*
      CONFIRM :: REDUX 메소드명이 모호함 (startGame은 게임 진행 가능 여부 체크 메소드)
    */
    setCells: (state, action) => {
      state.currentBoard = action.payload;
    },
    setStartGame: (state, action) => {
      state.startGame = action.payload.startGame;
    },
  },
});

export default cellSlice;
export const { setCells, setStartGame } = cellSlice.actions;
