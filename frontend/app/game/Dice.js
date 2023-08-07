import React from 'react';
import './../css/Dice.css';

export default function Dice({ face, diceWidth }) {
  
  let newWidth = diceWidth/8
   
  return (
    <div className='dice0'>
      <div className='dice_inner'>
        <div className={`dice face${face}`}>
          <div className="face1" style={{transform: `rotateY(0deg) translateZ(${newWidth}px)`, background: "rgba(0,0,0,1)"}}><img src='/1.png' /></div>
          <div className="face2" style={{transform: `rotateY(90deg) translateZ(${newWidth}px)`, background: "rgba(0,0,0,1)"}}><img src="/2.png" /></div>
          <div className="face3" style={{transform: `rotateX(90deg) translateZ(${newWidth}px)`, background: "rgba(0,0,0,1)"}}><img src="/3.png" /></div>
          <div className="face4" style={{transform: `rotateX(270deg) translateZ(${newWidth}px)`, background: "rgba(0,0,0,1)"}}><img src="/4.png" /></div>
          <div className="face5" style={{transform: `rotateY(270deg) translateZ(${newWidth}px)`, background: "rgba(0,0,0,1)"}}><img src="/5.png" /></div>
          <div className="face6" style={{transform: `rotateY(180deg) translateZ(${newWidth}px)`, background: "rgba(0,0,0,1)"}}><img src="/6.png" /></div>
        </div>
      </div>
    </div>
  )
}
