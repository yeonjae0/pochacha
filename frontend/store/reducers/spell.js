// 초성게임 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentConsonant: "",
  currentIdx: null,

};

const spellSlice = createSlice({
  name: "spell",
  initialState,
  reducers: {
    startGame: (state, action) => {
      return {...state, currentConsonant: action.payload}
    },
    losingPlayer: (state, action) => {
      return {...state, currentIdx: action.payload}
    },
    // startGame: (state, action) => {
    //   state.currentConsonant = action.payload.consonant;
    // },
  }
});



export default spellSlice;
export const {
  startGame, losingPlayer,
} = spellSlice.actions