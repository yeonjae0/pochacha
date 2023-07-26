import React, { useState, useEffect, useRef } from 'react';
import Dice from '../routes/Dice.js';
import '../app/DiceBox.css';

export default function DiceBox() {

  const [diceWidth, setDiceWidth] = useState(0); // 
  const [dice1, setDice1] = useState(1); //

  const diceRef = useRef(null);
  
  useEffect(() => {

    /* 브라우저 width 값 변화할 때 */
    const updateDiceWidth = () => {
      if (diceRef.current) {
        setDiceWidth(diceRef.current.clientWidth);
        console.log(diceWidth);
      }
    };
    
    window.addEventListener('resize', updateDiceWidth);
    updateDiceWidth();
    return () => {
      window.removeEventListener('resize', updateDiceWidth);
    };
    
  }, [diceWidth]);
  
  const rolling = () => {
    let ranNum = Math.floor(Math.random() * 6) + 1
    setDice1(ranNum);
    // console.log(ranNum);
  };

    return (
    <section id="diceBox" ref={diceRef}>
      <div className="dice_wrap">
        <Dice face={dice1} diceWidth={diceWidth} />
      </div>
      <button id="btnRolling" onClick={rolling}>
        주사위 굴리기
      </button>
    </section>
    )

};
