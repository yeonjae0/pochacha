'use client'

import styled from 'styled-components'
import { useState, useNavigate } from "react"
import { useLocation } from "react-router-dom";

export default function RoomBtn() {

  let CopyBtn = styled.button`
  width: 219px;
  height: 158px;
  background: #43BEF2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `

  let StartBtn = styled.button`
  width: 325px;
  height: 158px;
  background: #FF285C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  `

  let [setting, setSetting] = useState(true);

  // const location = useLocation();
  // console.log(location)

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

      <CopyBtn className="copy-url" onClick={()=>{ alert('클립보드에 url이 복사되었습니다.'); }}>
        친구 초대
      </CopyBtn>
      <StartBtn className="startBtn" onClick={()=>{
        let navigate = useNavigate();
        navigate("/board");
      }}>
        시작
      </StartBtn>
    </div>
  )
}
