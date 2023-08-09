// import styles from '@/styles/BoardMap.module.css'

// export default function ActiveBoard({ pin }) {

//   return (
//     <div>
//       <div>
//         <img src="/character.png" 
//         style={{
//           width: '160px',
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           marginLeft: '-80px', /* width의 50% */
//           marginTop: '120px', /* height의 50% */
//           zIndex: '1',
//         }}/>
//       </div>
//       <div className={styles.board}>
//         <div className={styles.board_wrapper}>
//           <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}>{pin == 19 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 19 */}
//           <div className={styles.even_row_cell}>{pin == 18 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 18 */}
//           <div className={styles.odd_row_cell}>{pin == 17 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 17 */}
//           <div className={styles.odd_row_cell}>{pin == 16 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 16 */}
//           <div className={styles.odd_row_cell}>{pin == 15 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 15 */}
//           <div className={styles.odd_row_cell}>{pin == 14 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 14 */}
//           <div className={styles.odd_row_cell} style={{ backgroundColor: 'black' }}>{pin == 13 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 13 */}
//           <div className={styles.odd_row_cell}>{pin == 20 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 20 */}
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={styles.even_row_cell}>{pin == 12 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 12 */}
//           <div className={styles.even_row_cell}>{pin == 21 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 21 */}
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={styles.odd_row_cell}>{pin == 11 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 11 */}
//           <div className={styles.odd_row_cell}>{pin == 22 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 22 */}
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={styles.even_row_cell}>{pin == 10 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 10 */}
//           <div className={styles.even_row_cell}>{pin == 23 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 23 */}
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
//           <div className={styles.odd_row_cell}>{pin == 9 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 09 */}
//           <div className={styles.odd_row_cell}>{pin == 24 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 24 */}
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
//           <div className={styles.odd_row_cell}>{pin == 8 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 08 */}
//           <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}>{pin == 1 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 01 */}
//           <div className={styles.even_row_cell}>{pin == 2 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 02 */}
//           <div className={styles.even_row_cell}>{pin == 3 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 03 */}
//           <div className={styles.even_row_cell}>{pin == 4 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 04 */}
//           <div className={styles.even_row_cell}>{pin == 5 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 05 */}
//           <div className={styles.even_row_cell}>{pin == 6 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 06 */}
//           <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}>{pin == 7 ? (<img className={styles.characterImage} src="/character.png" />) : null}</div> {/* 07 */}
//         </div>
//       </div>
//     </div>
//   )
// }

// cell 위치값 -> 
'use client'
import React, { useRef, useEffect } from 'react'
import styles from '@/styles/BoardMap.module.css'

export default function ActiveBoard({ pin }) {

  const targetRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const targetElement = targetRef.current;
    const imageElement = imageRef.current;
    console.log(targetRef, imageRef)

    if (targetElement && imageElement) {
      const rect = targetElement.getBoundingClientRect();

      // 이미지의 위치를 설정합니다.
      imageElement.style.position = 'absolute';
      imageElement.style.left = `${rect.left}px`;
      imageElement.style.top = `${rect.top}px`;
    }
  }, []);

  return (
    <div>
      <div className={styles.board}>
        <div className={styles.board_wrapper}>
          <div ref={targetRef} id="here" className={styles.even_row_cell} style={{ backgroundColor: 'black' }}></div> {/* 19 */}
          <div className={styles.even_row_cell}></div> {/* 18 */}
          <div className={styles.odd_row_cell}></div> {/* 17 */}
          <div className={styles.odd_row_cell}></div> {/* 16 */}
          <div className={styles.odd_row_cell}></div> {/* 15 */}
          <div className={styles.odd_row_cell}></div> {/* 14 */}
          <div className={styles.odd_row_cell} style={{ backgroundColor: 'black' }}></div> {/* 13 */}
          <div className={styles.odd_row_cell}></div> {/* 20 */}
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={styles.even_row_cell}></div> {/* 12 */}
          <div className={styles.even_row_cell}></div> {/* 21 */}
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={styles.odd_row_cell}></div> {/* 11 */}
          <div className={styles.odd_row_cell}></div> {/* 22 */}
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={styles.even_row_cell}></div> {/* 10 */}
          <div className={styles.even_row_cell}></div> {/* 23 */}
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.even_row_cell} ${styles.invisible}`}></div>
          <div className={styles.odd_row_cell}></div> {/* 09 */}
          <div className={styles.odd_row_cell}></div> {/* 24 */}
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={`${styles.odd_row_cell} ${styles.invisible}`}></div>
          <div className={styles.odd_row_cell}></div> {/* 08 */}
          <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}></div> {/* 01 */}
          <div className={styles.even_row_cell}></div> {/* 02 */}
          <div className={styles.even_row_cell}></div> {/* 03 */}
          <div className={styles.even_row_cell}></div> {/* 04 */}
          <div className={styles.even_row_cell}></div> {/* 05 */}
          <div className={styles.even_row_cell}></div> {/* 06 */}
          <div className={styles.even_row_cell} style={{ backgroundColor: 'black' }}></div> {/* 07 */}
        </div>
      </div>
      <img
        ref={imageRef}
        src="/character.png"
        // style={{
        //   width: '100px',
        //   position: 'absolute',
        //   top: '50%',
        //   left: '50%',
        //   marginLeft: '-50px', /* width의 50% */
        //   marginTop: '180px', /* height의 50% */
        //   zIndex: '1',
        style={{ width: '100px' }} />
    </div>
  )
}
