"use client"
import MapComponent from '@/routes/MapComponent';
import { useState } from 'react';

export default function Board() {

  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(0); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수
  let road = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  return (
    <div>
      <h1>보드게임 화면</h1>
      <button onClick={()=>{
        let num = 6;
        let dice = parseInt(Math.random() * num + 1); // 랜덤으로 주사위 숫자 추출
        setDice(dice); // 말 수 변경

        // 한 바퀴 돌 때마다 pin 갱신
        {
          pin+dice <= 24
          ? (
            setPin(pin+dice)
          )
          : setPin(pin+dice-24);
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
        주사위 눈은 { dice }가 나왔습니다.
      </div>
      
      <div>
        { dice }칸 이동하여 현재 { pin }번 블록에 있습니다.
      </div>
      
      <div>
        { lab }바퀴 돌았습니다.
      </div>

    </div>
  )
}
