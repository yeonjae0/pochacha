"use client"
import { useState, useNavigate } from "react"

export default function RoomBtn() {

  let [setting, setSetting] = useState(true);
  let [mode, setMode] = useState(true);

  return (
    <div>
      
      <button className="setting-btn" onClick={()=>{ setSetting(!setting); }}>
      {
        setting == true
        ? (
          '기본 모드 ON'
          )
        : '미니게임 ON'
      }
      </button>

      <button className="copy-url" onClick={()=>{ alert('클립보드에 url이 복사되었습니다.'); }}>
        친구 초대
      </button>
      <button className="startBtn" onClick={()=>{
        let navigate = useNavigate();
        navigate("/board");
      }}>
        시작
      </button>
    </div>
  )
}