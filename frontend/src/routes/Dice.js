import React from 'react';
import '../app/Dice.css';

export default function Dice({ face, diceWidth }) {
  
  let newWidth = diceWidth/8
   
  return (
    <div className='dice0'>
      <div className='dice_inner'>
        <div className={`dice face${face}`}>
          <div className="face1" style={{transform: `rotateY(0deg) translateZ(${newWidth}px)`, background: "red"}}>1</div>
          <div className="face2" style={{transform: `rotateY(90deg) translateZ(${newWidth}px)`, background: "blue"}}>2</div>
          <div className="face3" style={{transform: `rotateX(90deg) translateZ(${newWidth}px)`, background: "green"}}>3</div>
          <div className="face4" style={{transform: `rotateX(270deg) translateZ(${newWidth}px)`, background: "pink"}}>4</div>
          <div className="face5" style={{transform: `rotateY(270deg) translateZ(${newWidth}px)`, background: "royalblue"}}>5</div>
          <div className="face6" style={{transform: `rotateY(180deg) translateZ(${newWidth}px)`, background: "purple"}}>6</div>
        </div>
      </div>
    </div>
  );
};
