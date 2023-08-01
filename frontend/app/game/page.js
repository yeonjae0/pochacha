'use client'

import { useEffect, useState, useRef } from 'react'
import BoardMap from '../../routes/BoardMap'
import DiceBox from '../../routes/DiceBox'
import './../map.css'

export default function Board() {
  
  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin]  = useState(1); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수
  
  return (
    <div>
      <h1>보드게임 화면</h1>

      <button value="innerHTML" onClick={()=>{
        let num = 6;
        let dice = parseInt(Math.random() * num + 1); // 랜덤으로 주사위 숫자 추출
        setDice(dice); // 말 수 변경

        // 한 바퀴 돌 때마다 pin 갱신
        {
          pin+dice <= 24
          ? (
            setTimeout(()=>{ setPin(pin+dice) }, 1000)
            // setPin(pin+dice)
            )
            : setTimeout(()=>{ setPin(pin+dice-24) }, 1000)
          // : setPin(pin+dice-24)
        }

        // 한 바퀴 돌 때마다 lab state 변경
        {
          pin+dice <= 24
          ? (
            null
          )
          : setLab(lab+1);
        }

      }}>주사위 굴리기</button>

      <div>
        <h2>주사위 눈 : { dice }, 현재 { pin }번 블록에 위치</h2> <h2>{ lab }바퀴</h2>
      </div>

      <DiceBox dice={ dice } />
      <BoardMap pin={ pin } />

    </div>
  )
}
