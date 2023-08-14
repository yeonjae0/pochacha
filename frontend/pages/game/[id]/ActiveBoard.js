/* New Board */

'use client'

import React, { useRef, useEffect, useState } from 'react'
import styles from '@/styles/BoardMap.module.css'

export default function ActiveBoard({ pin, cellObj }) {

  const targetRef = useRef(null);
  const [positionStyle, setPositionStyle] = useState({ top: 0, left: 0 });

  /* 희진 : 보드 색 지정 시작 */
  const numMatch = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
    'twenty': 20, 'twentyone': 21, 'twentytwo': 22, 'twentythree': 23, 'twentyfour': 24
  };

  for (const key in numMatch) {
    if (cellObj[key] === 'E') { // 이동 이벤트
      cellObj[key] = '#454545';
    } else if (cellObj[key] === 'G') { // 긍정 이벤트
      cellObj[key] = '#FFE6C7';
    } else if (cellObj[key] === 'B') { // 팀/개인 벌칙
      cellObj[key] = '#FF6000';
    } else if (cellObj[key] === 'P') { // 필터 벌칙
      cellObj[key] = '#FFFFFF';
    } else if (cellObj[key] === 'M') { // 미니게임
      cellObj[key] = '#FFA559';
    }
  }
  /* 희진 : 보드 색 지정 끝 */

  useEffect(() => {
    const targetElement = targetRef.current;
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setPositionStyle({
        top: rect.top - 80, // 위치 값 조정
        left: rect.left - 40 // 위치 값 조정
      });
    }
  }, [pin]);

  return (
    <div>

      <div className={styles.board}>
        <div className={styles.board_wrapper}>
          <div style={{ backgroundColor: 'black' }}>{pin == 18 ? <div ref={targetRef}></div> : null}</div> {/* 19 */}
          <div style={{ backgroundColor: `${cellObj.eighteen}` }}>{pin == 17 ? <div ref={targetRef}></div> : null}</div> {/* 18 */}
          <div style={{ backgroundColor: `${cellObj.seventeen}` }}>{pin == 16 ? <div ref={targetRef}></div> : null}</div> {/* 17 */}
          <div style={{ backgroundColor: `${cellObj.sixteen}` }}>{pin == 15 ? <div ref={targetRef}></div> : null}</div> {/* 16 */}
          <div style={{ backgroundColor: `${cellObj.fifteen}` }}>{pin == 14 ? <div ref={targetRef}></div> : null}</div> {/* 15 */}
          <div style={{ backgroundColor: `${cellObj.fourteen}` }}>{pin == 13 ? <div ref={targetRef}></div> : null}</div> {/* 14 */}
          <div style={{ backgroundColor: 'black' }}>{pin == 12 ? <div ref={targetRef}></div> : null}</div> {/* 13 */}
          <div style={{ backgroundColor: `${cellObj.twenty}` }}>{pin == 19 ? <div ref={targetRef}></div> : null}</div> {/* 20 */}
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div style={{ backgroundColor: `${cellObj.twelve}` }}>{pin == 11 ? <div ref={targetRef}></div> : null}</div> {/* 12 */}
          <div style={{ backgroundColor: `${cellObj.twentyone}` }}>{pin == 20 ? <div ref={targetRef}></div> : null}</div> {/* 21 */}
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div style={{ backgroundColor: `${cellObj.eleven}` }}>{pin == 10 ? <div ref={targetRef}></div> : null}</div> {/* 11 */}
          <div style={{ backgroundColor: `${cellObj.twentytwo}` }}>{pin == 21 ? <div ref={targetRef}></div> : null}</div> {/* 22 */}
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div style={{ backgroundColor: `${cellObj.ten}` }}>{pin == 9 ? <div ref={targetRef}></div> : null}</div> {/* 10 */}
          <div style={{ backgroundColor: `${cellObj.twentythree}` }}>{pin == 22 ? <div ref={targetRef}></div> : null}</div> {/* 23 */}
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div style={{ backgroundColor: `${cellObj.nine}` }}>{pin == 8 ? <div ref={targetRef}></div> : null}</div> {/* 09 */}
          <div style={{ backgroundColor: `${cellObj.twentyfour}` }}>{pin == 23 ? <div ref={targetRef}></div> : null}</div> {/* 24 */}
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div className={`${styles.invisible}`}></div>
          <div style={{ backgroundColor: `${cellObj.eight}` }}>{pin == 7 ? <div ref={targetRef}></div> : null}</div> {/* 08 */}
          <div style={{ backgroundColor: 'black' }}>{pin == 0 ? <div ref={targetRef}></div> : null}</div> {/* 01 */}
          <div style={{ backgroundColor: `${cellObj.two}` }}>{pin == 1 ? <div ref={targetRef}></div> : null}</div> {/* 02 */}
          <div style={{ backgroundColor: `${cellObj.three}` }}>{pin == 2 ? <div ref={targetRef}></div> : null}</div> {/* 03 */}
          <div style={{ backgroundColor: `${cellObj.four}` }}>{pin == 3 ? <div ref={targetRef}></div> : null}</div> {/* 04 */}
          <div style={{ backgroundColor: `${cellObj.five}` }}>{pin == 4 ? <div ref={targetRef}></div> : null}</div> {/* 05 */}
          <div style={{ backgroundColor: `${cellObj.six}` }}>{pin == 5 ? <div ref={targetRef}></div> : null}</div> {/* 06 */}
          <div style={{ backgroundColor: 'black' }}>{pin == 6 ? <div ref={targetRef}></div> : null}</div> {/* 07 */}
        </div>
      </div>

      <img
        src="/character.png"
        style={{
          width: '100px',
          position: 'absolute',
          transition: 'top 0.3s ease, left 0.3s ease',
          ...positionStyle
        }}
      />
    </div>
  )
}
