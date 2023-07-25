"use client"
import { useEffect, useState, useRef } from 'react';
import './../map.css';

export default function Board() {
  
  let [dice, setDice] = useState(0); // 주사위
  let [pin, setPin] = useState(1); // 현재 위치
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
            setPin(pin+dice)
          )
          : setPin(pin+dice-24)
        }
        
        // 1. 반복문으로 효율성을 높여야 함
        // 2. DOM에 직접 접근이 아닌 방법을 찾아야 함
        // i. curPin ~ pin 으로 이동하는 경로를 하나씩 반복문으로 보여주기

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

      <div className='board'>
        <div id='board-r1' style={{ display: 'flex' }}>
          <div id='block19'>{ pin == 19 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block18'>{ pin == 18 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block17'>{ pin == 17 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block16'>{ pin == 16 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block15'>{ pin == 15 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block14'>{ pin == 14 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block13'>{ pin == 13 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
        <div id='board-r2' style={{ display: 'flex' }}>
          <div id='block20'>{ pin == 20 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block12'>{ pin == 12 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
        <div id='board-r3' style={{ display: 'flex' }}>
          <div id='block21'>{ pin == 21 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block11'>{ pin == 11 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
        <div id='board-r4' style={{ display: 'flex' }}>
          <div id='block22'>{ pin == 22 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block10'>{ pin == 10 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
        <div id='board-r5' style={{ display: 'flex' }}>
          <div id='block23'>{ pin == 23 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block9'>{ pin == 9 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
        <div id='board-r6' style={{ display: 'flex' }}>
          <div id='block24'>{ pin == 24 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block8'>{ pin == 8 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
        <div id='board-r7' style={{ display: 'flex' }}>
          <div id='block1'>{ pin == 1 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block2'>{ pin == 2 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block3'>{ pin == 3 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block4'>{ pin == 4 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block5'>{ pin == 5 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block6'>{ pin == 6 ? ( <img src="./character.png" /> ) : null }</div>
          <div id='block7'>{ pin == 7 ? ( <img src="./character.png" /> ) : null }</div>
        </div>
      </div>

    </div>
  )
}
