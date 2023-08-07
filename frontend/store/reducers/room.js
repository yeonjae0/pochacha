
// 연습용
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  currentRoomAddress: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      state.currentRoomAddress = action.payload.address;

    },
  }
});

// const applySetFruits = (state, action) => ({
//   ...state,
//   fruits: action.fruits
// });

// function fruitReducer(state = INITIAL_STATE, action) {
//   switch(action.type) {
//     case 'FRUITS_SET' : {
//       return applySetFruits(state, action);
//     }
//     default : return state;
//   }
// }
// export default fruitReducer;

export default roomSlice;
export const {
  enterRoom
} = roomSlice.actions