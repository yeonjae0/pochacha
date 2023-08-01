import React, { useState, useEffect, useRef } from 'react'
import Dice from '../routes/Dice.js'
import '../CSS/DiceBox.css'

export default function DiceBox(props) {

  const [diceWidth, setDiceWidth] = useState(0) // 주사위 가로 길이
  const [dice, setDice] = useState(1) // 주사위 눈 값

  const diceRef = useRef(null);
  
  useEffect(() => {

    /* 브라우저 width 값 변화할 때 */
    const updateDiceWidth = () => {
      if (diceRef.current) {
        setDiceWidth(diceRef.current.clientWidth);
        console.log(diceWidth)
      }
    }
    
    window.addEventListener('resize', updateDiceWidth);
    updateDiceWidth()
    return () => {
      window.removeEventListener('resize', updateDiceWidth);
    };
    
  }, [diceWidth])
  
  const rolling = (props) => {
    // let ranNum = Math.floor(Math.random() * 6) + 1
    setDice(props.dice)
  }

    return (
    <section id="diceBox" ref={diceRef}>
      <div className="dice_wrap">
        <Dice face={props.dice} diceWidth={diceWidth} />
      </div>
      {/* <button id="btnRolling" onClick={rolling}>
        주사위 굴리기
      </button> */}
    </section>
    )
}
