import React, { useState, useEffect, useRef } from 'react';
import Dice from './Dice';
import styles from '@/styles/DiceBox.module.css';

export default function DiceBox({ dice }) {
  
  const diceRef = useRef(null);
  
  /* 브라우저 고정이므로 임시 주석 처리 */
  // const [diceWidth, setDiceWidth] = useState(0);

  // useEffect(() => {
  //   const updateDiceWidth = () => {
  //     if (diceRef.current) {
  //       setDiceWidth(diceRef.current.clientWidth);
  //     }
  //   };
  //   window.addEventListener('resize', updateDiceWidth);
  //   updateDiceWidth();
  //   return () => {
  //     window.removeEventListener('resize', updateDiceWidth);
  //   };
  // }, [diceWidth]);

  return (
    <section className={styles.diceBox} ref={diceRef}>
      <div className={styles.dice_wrap}>
        <Dice face={dice} />
        {/* <Dice face={dice} diceWidth={diceWidth} /> */}
      </div>
    </section>
  )
};
