import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// 슬라이스들 import
import roomSlice from "./room";
import playersSlice from "./players";
import playerSlice from "./player";
import spellSlice from "./spell";
import cellSlice from "./cell";
import openViduSlice from "./openvidu";
import stompSlice from "./stomp";

const rootReducer = (state, action) => {
  switch (action.type) {
    // ▼없으면 ssr이 안되는 듯
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        // 여기에 slice들 추가해서 묶어주기
        room: roomSlice.reducer,
        player: playerSlice.reducer,
        players: playersSlice.reducer,
        spell: spellSlice.reducer,
        cell: cellSlice.reducer,
        openvidu: openViduSlice.reducer,
        stomp: stompSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
