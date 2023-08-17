import { createSlice } from "@reduxjs/toolkit";

/* 혜지 : 자기 자신을 포함하여 방 접속 플레이어들의 정보(playerId,nick,ready,head)들을 저장 */
const initialState = {
  players: [],
  tmpPlayers: {},
  canStart: false
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
    
    removePlayers: (state, action) => {
      const playerId = action.payload;
      state.players = state.players.filter(player => player.playerId !== playerId); 
    },
    resetPlayers: (state, action) => {
      state.players =  action.payload
    },
    resetTmpPlayers: (state) => {
      Object.assign(state, initialState);
    },
    addTmpPlayer: (state, action) => {
      let player = action.payload;
      state.tmpPlayers[player.id] = player;  // 플레이어 정보 초기화 (id, nickname, head, ready)
    },
    updateTmpPlayer: (state, action) => {
      let player = action.payload;

      if(state.tmpPlayers[player.id]) {  // 플레이어 존재 시
        state.tmpPlayers[player.id].ready = player.ready;  // ready 상태 변경
      } else {  // 플레이어 존재하지 않을 시
        state.tmpPlayers[player.id] = player;  // 플레이어 정보 초기화 (id, nickname, head, ready)
      }
    },
    deleteTmpPlayer: (state, action) => {
      let player = action.payload;

      if(state.tmpPlayers[player.id]) {
        delete state.tmpPlayers[player.id];  // 플레이어 삭제
      }
    },
    checkReady: (state) => {
      let readyCnt = 0;
      for(const player in state.tmpPlayers) {  // 각 플레이어 ready인지 count
        if(state.tmpPlayers[player].ready) {
          readyCnt++;
        }
      }
      if(readyCnt == 4) {
        state.canStart = true;
      } else {
        state.canStart = false;
      }
    }
  },
});

export default playersSlice;
export const { addPlayers, updatePlayers, removePlayers, resetPlayers, resetTmpPlayers, addTmpPlayer, updateTmpPlayer, deleteTmpPlayer, checkReady } = playersSlice.actions;
