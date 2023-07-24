"use client"
import { useEffect, useState, useRef } from 'react';
import './../map.css';

export default function Board() {

  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(0); // 현재 위치
  let [lab, setLab] = useState(0); // 바퀴 수

  useEffect(()=>{
    setTimeout(()=>{
      const element = document.getElementById('block'+pin);
      element.innerHTML += '<img src="./character.png" />';
    }, 1000);
  }, [pin])

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
            setPin(pin+dice+1)
          )
          : setPin(pin+dice-23)
        }
        
        // setTimeout(()=>{
        //   const element = document.getElementById('block'+pin);
        //   element.innerHTML += '<img src="./character.png" />';
        // }, 1000);

        // 반복문을 사용하지 않는다면, DOM에 접근할 수 있는 방법이 있어야 함, 방법을 찾아야 함
        // curPin ~ pin 으로 이동하는 경로를 하나씩 반복문으로 보여주기
        // const element = document.getElementById('block'+pin);
        // element.innerHTML += '<img src="./character.png" />';
    
        // setTimeout(()=>{
        // element.innerHTML = '' }, 1000);

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

      <div className='board'>
        <div id='board-r1' style={{ display: 'flex' }}>
          <div id='block19' value="innerHTML">{}</div>
          <div id='block18' value="innerHTML"></div>
          <div id='block17' value="innerHTML"></div>
          <div id='block16' value="innerHTML"></div>
          <div id='block15' value="innerHTML"></div>
          <div id='block14' value="innerHTML"></div>
          <div id='block13' value="innerHTML"></div>
        </div>
        <div id='board-r2' style={{ display: 'flex' }}>
          <div id='block20' value="innerHTML"></div>
          <div id='block12' value="innerHTML"></div>
        </div>
        <div id='board-r3' style={{ display: 'flex' }}>
          <div id='block21' value="innerHTML"></div>
          <div id='block11' value="innerHTML"></div>
        </div>
        <div id='board-r4' style={{ display: 'flex' }}>
          <div id='block22' value="innerHTML"></div>
          <div id='block10' value="innerHTML"></div>
        </div>
        <div id='board-r5' style={{ display: 'flex' }}>
          <div id='block23' value="innerHTML"></div>
          <div id='block9' value="innerHTML"></div>
        </div>
        <div id='board-r6' style={{ display: 'flex' }}>
          <div id='block24' value="innerHTML"></div>
          <div id='block8' value="innerHTML"></div>
        </div>
        <div id='board-r7' style={{ display: 'flex' }}>
          <div id='block1' value="innerHTML"></div>
          <div id='block2' value="innerHTML"></div>
          <div id='block3' value="innerHTML"></div>
          <div id='block4' value="innerHTML"></div>
          <div id='block5' value="innerHTML"></div>
          <div id='block6' value="innerHTML"></div>
          <div id='block7' value="innerHTML"></div>
        </div>

      </div>
    </div>
  )
}
