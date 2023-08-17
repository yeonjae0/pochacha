import { createSlice } from "@reduxjs/toolkit";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const initialState = {
  client: null
};

const stompSlice = createSlice({
  name: "stomp",
  initialState,
  reducers: {
    connectSocket: (state) => {
      state.client = Stomp.over(() => {
        const sock = new SockJS("http://localhost:80/ws");
        return sock;
      });
    },
    subscribeSocket: () => {
      
    }
  }
});



export default stompSlice;
export const { } = stompSlice.actions