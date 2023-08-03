'use client'

import React, { useState } from 'react'
import '../../styles/EnterPage.module.css'
import tip from '../data/tip.js'

export default function RightBox() {

  const [currentTipIdx, setCurrentTipIdx] = useState(0);
  const toggleNext = () => {
    setCurrentTipIdx((prevIdx) => (prevIdx === tip.length - 1 ? 0 : prevIdx + 1))
  }
  const togglePrev = () => {
    setCurrentTipIdx((prevIdx) => (prevIdx === 0 ? tip.length - 1 : prevIdx - 1))
  }
  const toggle = () => {
    setCurrentTipIdx((prevIdx)=>
    prevIdx === tip.length -1 ? 0 : prevIdx +1
    )
  }
  const currentTip = tip[currentTipIdx]
  
  /* 우측 화면 자동 전환 잠금 시작 */
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTipIdx((prevIdx) => (prevIdx === tip.length - 1 ? 0 : prevIdx + 1));
  //   }, 2000)

  //   return () => clearInterval(interval);
  // }, [])
  /* 우측 화면 자동 전환 잠금 끝 */
  /* 우측 Box 화면 전환 끝 */
  
  return (
    <div className="innerBox">
      <div id="tipTitle">{currentTip.title}</div>
      <div id="tipContainer">
        <button className="arrow leftArrow" onClick={togglePrev}><img src="/main/leftArrow.png "/></button>
        <div id="tipContent">
          <img src={currentTip.pic} />
          <p>{currentTip.txt1}</p>
          <p>{currentTip.txt2}</p>
        </div>
        <button className="arrow rightArrow" onClick={toggleNext}><img src="/main/rightArrow.png "/></button>
      </div>
  
    {/* <div className='rightBox'>
    <p id="tipTitle">{currentTip.title}</p>
    <img src={currentTip.pic} />
    <p>{currentTip.txt1}</p>
    <p>{currentTip.txt2}</p>
      
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button className="arrowButton" onClick={togglePrev}>
          <span>&#8592;</span>
      </button>
      <button className="arrowButton" onClick={toggleNext}>
        <span>&#8594;</span>
      </button>
    </div> */}
    </div>
  )
}