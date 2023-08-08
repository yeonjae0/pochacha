// 초기화 페이지인 ResetPage 컴포넌트

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enterRoom } from "@/store/reducers/room.js";
import { addPlayer, updatePlayer, removePlayer, resetPlayer } from "@/store/reducers/player.js";

function ResetPage() {
  const dispatch = useDispatch();

  const doInitialize = () => {
    dispatch(enterRoom({ currentRoomID: null, currentProgress: null, currentSecret: null }));
    dispatch(resetPlayer([]));

    // dispatch(addPlayer([]));
   
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
