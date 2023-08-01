import React from 'react';
import '../CSS/Dice.css';

export default function Dice({ face, diceWidth }) {
  
  let newWidth = diceWidth/8
   
  return (
    <div className='dice0'>
      <div className='dice_inner'>
        <div className={`dice face${face}`}>
          <div className="face1" style={{transform: `rotateY(0deg) translateZ(${newWidth}px)`, background: "red"}}><img src="./1.png" /></div>
          <div className="face2" style={{transform: `rotateY(90deg) translateZ(${newWidth}px)`, background: "blue"}}><img src="./2.png" /></div>
          <div className="face3" style={{transform: `rotateX(90deg) translateZ(${newWidth}px)`, background: "green"}}><img src="./3.png" /></div>
          <div className="face4" style={{transform: `rotateX(270deg) translateZ(${newWidth}px)`, background: "pink"}}><img src="./4.png" /></div>
          <div className="face5" style={{transform: `rotateY(270deg) translateZ(${newWidth}px)`, background: "royalblue"}}><img src="./5.png" /></div>
          <div className="face6" style={{transform: `rotateY(180deg) translateZ(${newWidth}px)`, background: "purple"}}><img src="./6.png" /></div>
        </div>
      </div>
    </div>
  )
}
