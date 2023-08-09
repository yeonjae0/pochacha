import React from 'react';
import styles from '@/styles/Dice.module.css';

export default function Dice({ face, diceWidth }) {
  
  console.log('face props', face)
  const newWidth = diceWidth/8
  const classDice = `dice face${face}`

  return (
    <div className={styles.dice0}>
      <div className={styles.dice_inner}>
        <div className={styles.classDice}
        style={
          {width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: '1s',
          position: 'relative'}
        }>
          <div className={styles.face1} style={{transform: `rotateY(0deg) translateZ(${newWidth}px)`, background: "red"}}><img src='/1.png' /></div>
          <div className={styles.face2} style={{transform: `rotateY(90deg) translateZ(${newWidth}px)`, background: "blue"}}><img src="/2.png" /></div>
          <div className={styles.face3} style={{transform: `rotateX(90deg) translateZ(${newWidth}px)`, background: "green"}}><img src="/3.png" /></div>
          <div className={styles.face4} style={{transform: `rotateX(270deg) translateZ(${newWidth}px)`, background: "pink"}}><img src="/4.png" /></div>
          <div className={styles.face5} style={{transform: `rotateY(270deg) translateZ(${newWidth}px)`, background: "royalblue"}}><img src="/5.png" /></div>
          <div className={styles.face6} style={{transform: `rotateY(180deg) translateZ(${newWidth}px)`, background: "purple"}}><img src="/6.png" /></div>
        </div>
      </div>
    </div>
  )
}
