// 셀 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: [],
  turns:[],
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
    setTurns: (state, action) => {
      state.turns = action.payload;
    },
  },
});

export default cellSlice;
export const { setCells, setTurns } = cellSlice.actions;
