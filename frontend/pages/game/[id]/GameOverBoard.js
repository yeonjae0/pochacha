import React, { useEffect, useState, useMemo } from "react";
import Link from 'next/link';
import styles from "@/styles/GamePage.module.css";

export default function GameOverBoard() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

return (
  <>
    <div 
    className={`${styles.gameOver} ${isVisible ? styles.visible : ''}`}
    style={{ 
      textAlign: "center", 
      top: "-5%", 
      fontSize: "24px", 
      zIndex:'5', 
      width: '800px', 
      height:'450px', 
      background:'#A1824F', 
      position:'absolute', 
      left:'50%', 
      transform: 'translate(-50%, 50%)', 
      borderRadius: '30px',
      }}>
    <img src="/close.png" />
    <h2>게임이 종료되었습니다.</h2>
    <br />
    <Link href={'/'}>
    <img src="/START.png" />
    </Link>
    </div>
  </>
);
}