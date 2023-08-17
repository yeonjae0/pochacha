import { createSlice } from "@reduxjs/toolkit";
import { OpenVidu } from "openvidu-browser";

const initialState = {
  OV: null,
  session: undefined,
  publisher: undefined,
  participants: [],
  //devices: undefined,
  currentVideoDevice: undefined,
};

const openViduSlice = createSlice({
  name: "openvidu",
  initialState,
  reducers: {
    createOpenVidu: (state, { payload }) => {
      if (!state.OV) {
        state.OV = payload.OV;//new OpenVidu();
        state.session = payload.session;//state.OV.initSession();
        //state.devices = payload.devices;//state.OV.getDevices();
      }
    },
    resetOpenvidu: (state) => {
      Object.assign(state, initialState);
    },
    createPublisher: (state, { payload }) => {
      state.session.publish(payload.publisher);
      state.currentVideoDevice = payload.currentVideoDevice;
      state.publisher = payload.publisher;
    },
    enteredParticipant: (state, action) => {
      const participant = state.session.subscribe(action.payload, undefined);
      const nick = JSON.parse(participant.stream.connection.data.split("%")[0]).clientData;
      state.participants.push({nick:nick, participant:participant});
    },
    deleteParticipant: (state, action) => {
      let index = state.participants.indexOf(action.payload, 0);
      if (index > -1) {
        state.participants.splice(index, 1);
      }
    },
    leaveSession(state, { payload }) {
      const mySession = state.session;
      if (mySession) {
        mySession.disconnect();
      }

      state.OV = null;
      state.session = undefined;
      state.participants = [];
      state.publisher = undefined;
      state.devices = undefined;
      state.currentVideoDevice = undefined;
    },
  },
});

export const openViduActions =
  openViduSlice.actions;
  export const { resetOpenvidu } = openViduSlice.actions;
export default openViduSlice;

