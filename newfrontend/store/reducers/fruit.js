// 연습용
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  fruits: [],
};

const fruitSlice = createSlice({
  name: "fruit",
  initialState,
  reducers: {
    makeFruitList: (state, action) => {
      // return { ...state, fruit: action.payload };
      return { fruits: state.fruit + action.payload };
    },
  },
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

export default fruitSlice;
export const {
  makeFruitList,
} = fruitSlice.actions