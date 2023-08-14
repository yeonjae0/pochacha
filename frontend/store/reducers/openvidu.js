import { createSlice } from "@reduxjs/toolkit";

/* 
    CONFIRM :: 제대로 동작하지 않음
*/
const initialState = {
  publisher: {},
  session: {},
};

const openViduSlice = createSlice({
  name: "openvidu",
  initialState,
  reducers: {
    setPublisherData: (state, action) => {
        state.publisher = action.payload;
      },
      setSessionData: (state, action) => {
        state.session = action.payload;
      },
  },
});

export default openViduSlice;
export const { setPublisherData, setSessionData } = openViduSlice.actions;