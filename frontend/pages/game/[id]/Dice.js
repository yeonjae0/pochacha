import React from 'react';
import styles from '@/styles/Dice.module.css';

export default function Dice({ face }) {

  const newWidth = 30;

return (
  <div className={styles.customDice}>
    <div className={styles.dice_inner}>
      <div className={styles[`dice_face${face}`]}>
        {/* width = 153px -> 60px */}
        <div className={styles.face1} style={{ transform: `rotateY(0deg) translateZ(${newWidth}px)` }}><img src="/1.png" style={{ width: '60px' }}/></div> 
        <div className={styles.face2} style={{ transform: `rotateY(90deg) translateZ(${newWidth}px)` }}><img src="/2.png" style={{ width: '60px' }}/></div>
        <div className={styles.face3} style={{ transform: `rotateX(90deg) translateZ(${newWidth}px)` }}><img src="/3.png" style={{ width: '60px' }}/></div>
        <div className={styles.face4} style={{ transform: `rotateX(270deg) translateZ(${newWidth}px)` }}><img src="/4.png" style={{ width: '60px' }}/></div>
        <div className={styles.face5} style={{ transform: `rotateY(270deg) translateZ(${newWidth}px)` }}><img src="/5.png" style={{ width: '60px' }}/></div>
        <div className={styles.face6} style={{ transform: `rotateY(180deg) translateZ(${newWidth}px)` }}><img src="/6.png" style={{ width: '60px' }}/></div>
      </div>
    </div>
  </div>
);
}
