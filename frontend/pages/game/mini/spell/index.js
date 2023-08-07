'use Client'
// 이 창에 들어오면 초기화 구현, roomID 확인

// import storage from "@/lib/utils/storage";
// import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";

function checkID() {
  const currentRoomAddress = useSelector(state => state.room.currentRoomAddress);

  return (
    <div>
      <h2>roomID:</h2>
      <h1>{currentRoomAddress}</h1>
    </div>
  );
}

export default checkID;