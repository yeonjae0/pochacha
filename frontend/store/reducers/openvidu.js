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
      setParticipantsData(state,action){
        state.participants.push(action.payload); 
      },
      resetParticipantsData: (state, action) => {
        state.participants =  action.payload
      }
  },
});

export default openViduSlice;
export const { setPublisherData, setParticipantsData, resetParticipantsData } = openViduSlice.actions;