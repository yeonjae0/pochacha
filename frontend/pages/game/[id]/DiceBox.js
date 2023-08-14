import React, { useState, useEffect, useRef } from 'react';
import Dice from './Dice.js';
import styles from '@/styles/DiceBox.module.css';

export default function DiceBox({ dice }) {

  const [diceWidth, setDiceWidth] = useState(0);

  const diceRef = useRef(null);

  useEffect(() => {

    /* 브라우저 width 값 변화할 때 */
    const updateDiceWidth = () => {
      if (diceRef.current) {
        setDiceWidth(diceRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', updateDiceWidth);
    updateDiceWidth();
    return () => {
      window.removeEventListener('resize', updateDiceWidth);
    };

  }, [diceWidth]);

  return (
    <section className={styles.diceBox} ref={diceRef}>
      <div className={styles.dice_wrap}>
        <Dice face={dice} diceWidth={diceWidth} />
      </div>
    </section>
  )
};
