import React from 'react'
import styles from '@/styles/Dice.module.css'

export default function Dice({ face, diceWidth }) {

  let newWidth = diceWidth / 8
  
  /* 희진 : 주사위 CSS 적용 중 */
  return (
    <div className='dice0'>
      <div className={styles.dice_inner}>
        <div className={`dice face${face}`}>
          <div className={styles.face1} style={{ transform: `rotateY(0deg) translateZ(${newWidth}px)`, background: "red" }}><img src='/1.png' /></div>
          <div className={styles.face2} style={{ transform: `rotateY(90deg) translateZ(${newWidth}px)`, background: "blue" }}><img src='/2.png' /></div>
          <div className={styles.face3} style={{ transform: `rotateX(90deg) translateZ(${newWidth}px)`, background: "green" }}><img src='/3.png' /></div>
          <div className={styles.face4} style={{ transform: `rotateX(270deg) translateZ(${newWidth}px)`, background: "pink" }}><img src='/4.png' /></div>
          <div className={styles.face5} style={{ transform: `rotateY(270deg) translateZ(${newWidth}px)`, background: "royalblue" }}><img src='/5.png' /></div>
          <div className={styles.face6} style={{ transform: `rotateY(180deg) translateZ(${newWidth}px)`, background: "purple" }}><img src='/6.png' /></div>
        </div>
      </div>
    </div>
  )
}
