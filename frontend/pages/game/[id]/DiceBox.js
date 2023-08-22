import React, { useState, useEffect, useRef } from 'react';
import Dice from './Dice';
import styles from '@/styles/DiceBox.module.css';

export default function DiceBox({ dice }) {
  
  const diceRef = useRef(null);

  return (
    <section className={styles.diceBox} ref={diceRef}>
      <div className={styles.dice_wrap}>
        <Dice face={dice} />
      </div>
    </section>
  )
};
