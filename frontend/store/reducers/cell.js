// 셀 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentBoard: "",
};

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    enterGame: (state, action) => {
      state.currentBoard = action.payload.cellData;
    },
  }
});



export default cellSlice;
export const {
  enterGame
} = cellSlice.actions