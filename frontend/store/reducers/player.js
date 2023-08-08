import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload); 
    },
    updatePlayer: (state, action) => {
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

export default playerSlice;
export const { addPlayer, updatePlayer, removePlayer, resetPlayer } = playerSlice.actions;
