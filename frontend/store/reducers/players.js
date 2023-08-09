import { createSlice } from "@reduxjs/toolkit";

/* 혜지 : 자기 자신을 포함하여 방 접속 플레이어들의 정보(playerId,nick,ready)들을 저장 */
const initialState = {
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      state.players.push(action.payload); 
    },
    updatePlayers: (state, action) => {
      const { playerId, updates } = action.payload;
      const playerIndex = state.players.findIndex(player => player.playerId === playerId);
      if (playerIndex !== -1) {
        state.players[playerIndex] = { ...state.players[playerIndex], ...updates }; 
      }
    },
    removePlayer: (state, action) => {
      const playerId = action.payload;
      state.players = state.players.filter(player => player.playerId !== playerId); 
    },
    resetPlayer: (state, action) => {
      state.players =  action.payload
    }
  },
});

export default playersSlice;
export const { addPlayers, updatePlayers, removePlayers, resetPlayers } = playersSlice.actions;
