'use client'

import React, { useRef, useEffect, useState } from 'react'
import styles from '@/styles/BoardMap.module.css'

export default function ActiveBoard({ pin }) {

  const targetRef = useRef(null);
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  useEffect(() => {
    const targetElement = targetRef.current;
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setTop(rect.top - 320) // 위치 값 조정
      setLeft(rect.left - 50) // 위치 값 조정
  }}, [pin]);

  return (
    <div>
      <div className={styles.board}>
        <div className={styles.board_wrapper}>
          <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}>{ pin == 19 ? <div ref={targetRef}></div> : null}</div> {/* 19 */}
          <div className={styles.even_row_cell}>{ pin == 18 ? <div ref={targetRef}></div> : null}</div> {/* 18 */}
          <div className={styles.odd_row_cell}>{ pin == 17 ? <div ref={targetRef}></div> : null}</div> {/* 17 */}
          <div className={styles.odd_row_cell}>{ pin == 16 ? <div ref={targetRef}></div> : null}</div> {/* 16 */}
          <div className={styles.odd_row_cell}>{ pin == 15 ? <div ref={targetRef}></div> : null}</div> {/* 15 */}
          <div className={styles.odd_row_cell}>{ pin == 14 ? <div ref={targetRef}></div> : null}</div> {/* 14 */}
          <div className={styles.odd_row_cell} style={{ backgroundColor: 'black' }}>{ pin == 13 ? <div ref={targetRef}></div> : null}</div> {/* 13 */}
          <div className={styles.odd_row_cell}>{ pin == 20 ? <div ref={targetRef}></div> : null}</div> {/* 20 */}
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={styles.even_row_cell}>{ pin == 12 ? <div ref={targetRef}></div> : null}</div> {/* 12 */}
          <div className={styles.even_row_cell}>{ pin == 21 ? <div ref={targetRef}></div> : null}</div> {/* 21 */}
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={styles.odd_row_cell}>{ pin == 11 ? <div ref={targetRef}></div> : null}</div> {/* 11 */}
          <div className={styles.odd_row_cell}>{ pin == 22 ? <div ref={targetRef}></div> : null}</div> {/* 22 */}
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={styles.even_row_cell}>{ pin == 10 ? <div ref={targetRef}></div> : null}</div> {/* 10 */}
          <div className={styles.even_row_cell}>{ pin == 23 ? <div ref={targetRef}></div> : null}</div> {/* 23 */}
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={styles.odd_row_cell}>{ pin == 9 ? <div ref={targetRef}></div> : null}</div> {/* 09 */}
          <div className={styles.odd_row_cell}>{ pin == 24 ? <div ref={targetRef}></div> : null}</div> {/* 24 */}
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={styles.odd_row_cell}>{ pin == 8 ? <div ref={targetRef}></div> : null}</div> {/* 08 */}
          <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}>{ pin == 1 ? <div ref={targetRef}></div> : null}</div> {/* 01 */}
          <div className={styles.even_row_cell}>{ pin == 2 ? <div ref={targetRef}></div> : null}</div> {/* 02 */}
          <div className={styles.even_row_cell}>{ pin == 3 ? <div ref={targetRef}></div> : null}</div> {/* 03 */}
          <div className={styles.even_row_cell}>{ pin == 4 ? <div ref={targetRef}></div> : null}</div> {/* 04 */}
          <div className={styles.even_row_cell}>{ pin == 5 ? <div ref={targetRef}></div> : null}</div> {/* 05 */}
          <div className={styles.even_row_cell}>{ pin == 6 ? <div ref={targetRef}></div> : null}</div> {/* 06 */}
          <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}>{ pin == 7 ? <div ref={targetRef}></div> : null}</div> {/* 07 */}
        </div>
      </div>
      <img
        src="/character.png"
      style={{
        width: '100px',
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        // marginLeft: '-50px', /* width의 50% */
        // marginTop: '180px', /* height의 50% */
        zIndex: '1'}}
      />
    </div>
  )
}
