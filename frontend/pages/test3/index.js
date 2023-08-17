// 초기화 페이지인 ResetPage 컴포넌트

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enterRoom } from "@/store/reducers/room.js";
import { resetPlayers } from "@/store/reducers/players";
import { setMyData } from "@/store/reducers/player";

function ResetPage() {
  const dispatch = useDispatch();
  
  const doInitialize = () => {
    dispatch(enterRoom({ currentRoomId: null, currentProgress: null, currentSecret: null }));
    dispatch(resetPlayers([]));
    dispatch(setMyData({  currentPlayerId: null,
    currentNick: null,
    currentReady: false,
    currentHead: false,}))
  };

  useEffect(() => {
    doInitialize();
  }, []);

  return (
    <div>
      <h2>초기화 페이지</h2>
    </div>
  );
}

export default ResetPage;
