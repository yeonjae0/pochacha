"use client"
import MapComponent from '@/routes/MapComponent';
import { useState } from 'react';
import './../map.css';

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

      <div class='board' >
        <div id='board-r1' style={{ display: 'flex' }}>
          <div id='block1'></div>
          <div id='block2'></div>
          <div id='block3'></div>
          <div id='block4'></div>
          <div id='block5'></div>
          <div id='block6'></div>
          <div id='block7'></div>
        </div>
        <div id='board-r2' style={{ display: 'flex' }}>
          <div id='block8'></div>
          <div id='block9'></div>
        </div>
        <div id='board-r3' style={{ display: 'flex' }}>
          <div id='block10'></div>
          <div id='block11'></div>
        </div>
        <div id='board-r4' style={{ display: 'flex' }}>
          <div id='block12'></div>
          <div id='block13'></div>
        </div>
        <div id='board-r5' style={{ display: 'flex' }}>
          <div id='block14'></div>
          <div id='block15'></div>
        </div>
        <div id='board-r6' style={{ display: 'flex' }}>
          <div id='block16'></div>
          <div id='block17'></div>
        </div>
        <div id='board-r7' style={{ display: 'flex' }}>
          <div id='block1'></div>
          <div id='block2'></div>
          <div id='block3'></div>
          <div id='block4'></div>
          <div id='block5'></div>
          <div id='block6'></div>
          <div id='block7'></div>
        </div>

    </div>
    </div>
  )
}