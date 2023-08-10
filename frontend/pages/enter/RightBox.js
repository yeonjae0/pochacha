'use client'

import React, { useState } from 'react'
import tip from '../data/tip.js'
import styles from '@/styles/EnterPage.module.css'

export default function RightBox() {

  const [currentTipIdx, setCurrentTipIdx] = useState(0)
  const toggleNext = () => {
    setCurrentTipIdx((prevIdx) => (prevIdx === tip.length - 1 ? 0 : prevIdx + 1))
  }
  const togglePrev = () => {
    setCurrentTipIdx((prevIdx) => (prevIdx === 0 ? tip.length - 1 : prevIdx - 1))
  }
  const toggle = () => {
    setCurrentTipIdx((prevIdx) =>
      prevIdx === tip.length - 1 ? 0 : prevIdx + 1
    )
  }
  const currentTip = tip[currentTipIdx]

  return (
    <div className={styles.innerBox}>
      <div className={styles.tipTitle}>{currentTip.title}</div>
      <div className={styles.tipContainer}>
        <button onClick={togglePrev}><img className={styles.arrow} src="/main/leftArrow.png " /></button>
        <div className={styles.tipContent}>
          <img src={currentTip.pic} />
          <p>{currentTip.txt1}</p>
          <p>{currentTip.txt2}</p>
        </div>
        <button onClick={toggleNext}><img className={styles.arrow} src="/main/rightArrow.png " /></button>
      </div>
    </div>
  )
}


