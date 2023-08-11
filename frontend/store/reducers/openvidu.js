import { createSlice } from "@reduxjs/toolkit";

/* 
    CONFIRM :: 제대로 동작하지 않음
*/
const initialState = {
  publisher: {},
  participants:[],
};

const openViduSlice = createSlice({
  name: "openvidu",
  initialState,
  reducers: {
    setPublisherData: (state, action) => {
        state.publisher = action.payload;
      },
    addParticipants: (state, action) => {
      state.participants.push(action.payload); 
    },
    // updatePlayers: (state, action) => {
    //   const { playerId, updates } = action.payload;
    //   const playerIndex = state.players.findIndex(player => player.playerId === playerId);
    //   if (playerIndex !== -1) {
    //     state.players[playerIndex] = { ...state.players[playerIndex], ...updates }; 
    //   }
    // },
    // removeParticipants: (state, action) => {
    //   const playerId = action.payload;
    //   state.participants = state.participants.filter(participant => participant.playerId !== playerId); 
    // },
    resetParticipants: (state, action) => {
      state.participants =  action.payload
    }
  },
});

export default openViduSlice;
export const { setPublisherData, addParticipants, resetParticipants } = openViduSlice.actions;