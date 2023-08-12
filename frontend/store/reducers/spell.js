// 초성게임 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentConsonant: "",
  currentWord: null,

};

const spellSlice = createSlice({
  name: "spell",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.currentConsonant = action.payload.consonant;
    },
    saveWord: (state, action) => {
      return { ...state, currentWord: action.payload }
      // state.currentWord = action.payload.input;
    }
  }
});



export default spellSlice;
export const {
  startGame, saveWord
} = spellSlice.actions