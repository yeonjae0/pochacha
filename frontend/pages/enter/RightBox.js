import React, { useState, useEffect } from "react";
import tip from "../../data/tip";

import styles from "@/styles/EnterPage.module.css";

export default function RightBox() {
  const [currentTipIdx, setCurrentTipIdx] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsHidden(true);
      setTimeout(() => {
        setCurrentTipIdx((prevIdx) => (prevIdx === tip.length - 1 ? 0 : prevIdx + 1));
        setIsHidden(false);
      }, 200);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [currentTipIdx]);

  const togglePrev = () => {
    setIsHidden(true);
    setTimeout(() => {
      setCurrentTipIdx((prevIdx) => (prevIdx === 0 ? tip.length - 1 : prevIdx - 1));
      setIsHidden(false);
    }, 200);
  };

  const toggleNext = () => {
    setIsHidden(true);
    setTimeout(() => {
      setCurrentTipIdx((prevIdx) => (prevIdx === tip.length - 1 ? 0 : prevIdx + 1));
      setIsHidden(false);
    }, 200);
  };

  const currentTip = tip[currentTipIdx];

  return (
    <div className={styles.innerBox}>
      <div className={styles.tipTitle}>{currentTip.title}</div>
      <div className={styles.tipContainer}>
        <button onClick={togglePrev}>
          <img className={styles.arrow} src="/main/leftArrow.png" alt="Left Arrow" />
        </button>
        <div className={`${styles.tipContent} ${isHidden ? styles.hidden : ""}`}>
          <img src={currentTip.pic} alt={currentTip.title} />
          <p>{currentTip.txt1}</p>
          <p>{currentTip.txt2}</p>
        </div>
        <button onClick={toggleNext}>
          <img className={styles.arrow} src="/main/rightArrow.png" alt="Right Arrow" />
        </button>
      </div>
    </div>
  );
}