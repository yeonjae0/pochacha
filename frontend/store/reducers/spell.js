// 초성게임 정보를 저장해보자
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentConsonant: "",
  currentIdx: null,
  currentPlayerId: ""

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
    setCurrentPlayer: (state, action) => {
      state.currentPlayerId = action.payload.id;
    }
  }
});



export default spellSlice;
export const {
  startGame, losingPlayer, setCurrentPlayer
} = spellSlice.actions