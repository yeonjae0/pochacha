// import { useState, useEffect } from 'react'
// import styles from '@/styles/MoleGame.module.css'

// /* 희진 : 랜덤 위치(행/열) 출력 함수 시작 */
// const getRandomGridPosition = () => ({
//   row: Math.floor(Math.random() * 3), // 0, 1, or 2
//   col: Math.floor(Math.random() * 3), // 0, 1, or 2
// });
// /* 희진 : 두더지 랜덤 위치 출력 함수 끝 */

// export default function MoleGame() {
//   const [score, setScore] = useState(0);
//   const [molePosition, setMolePosition] = useState(getRandomGridPosition()); // 두더지 위치 == 랜덤 위치
//   const [showHitMole, setShowHitMole] = useState(false);

//   /* 희진 : 두더지 클릭 시 이벤트 시작 */
//   const handleMoleClick = () => {
//     setScore(score + 1);
//     setShowHitMole(true);

//     // After 1 second, hide the hit mole and reposition the mole to a random location
//     setTimeout(() => {
//       setShowHitMole(false);
//       setMolePosition(getRandomGridPosition());
//     }, 500);
//   };
//   /* 희진 : 두더지 클릭 시 이벤트 끝 */

//   useEffect(() => {
//     const moleTimer = setTimeout(() => {
//       setMolePosition(getRandomGridPosition());
//     }, 3000);

//     return () => clearTimeout(moleTimer);
//   }, [molePosition]);

//   /* 희진 : 두더지 위치 조정 시작 */
//   const moleImagePosition = {
//     top: `${molePosition.row * 33.33}%`,
//     left: `${molePosition.col * 33.33}%`,
//   };
//   /* 희진 : 두더지 위치 조정 끝 */

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1>두더지 게임</h1>
//       <h2>지금까지 {score}마리의 두더지를 잡았습니다</h2>
//       <div className={styles.container}
//         style={{
//           position: 'relative',
//           width: '600px',
//           height: '600px',
//           border: '2px solid #000',
//           margin: '0 auto',
//           overflow: 'hidden',
//         }}
//       >

//         {showHitMole ? (
//           <img
//             src="/맞은두더지.png"
//             alt="맞은두더지"
//             style={{
//               position: 'absolute',
//               top: moleImagePosition.top,
//               left: moleImagePosition.left,
//               width: '200px',
//               height: '200px',
//             }}
//           />
//         ) : (
//           <img
//             src="/일어난두더지.png"
//             alt="두더지"
//             onClick={handleMoleClick}
//             style={{
//               position: 'absolute',
//               top: moleImagePosition.top,
//               left: moleImagePosition.left,
//               width: '200px',
//               height: '200px',
//               cursor: 'pointer',
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react'
import styles from '@/styles/MoleGame.module.css'

const getRandomGridPosition = () => ({
  row: Math.floor(Math.random() * 3), // 0, 1, or 2
  col: Math.floor(Math.random() * 3), // 0, 1, or 2
});

export default function MoleGame() {
  const [score, setScore] = useState(0);
  const [molePositions, setMolePositions] = useState([]);
  const [showHitMole, setShowHitMole] = useState(false);
  const [hitMolePosition, setHitMolePosition] = useState({ row: 0, col: 0 });

  const handleMoleClick = (index) => {
    if (molePositions[index]) {
      setScore((prevScore) => prevScore + 1);
      setShowHitMole(true);
      setHitMolePosition(molePositions[index]);
      const newMolePositions = [...molePositions];
      newMolePositions[index] = null;
      setMolePositions(newMolePositions);
      setTimeout(() => {
        setShowHitMole(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const generateMole = () => {
      const freshMolePositions = Array(3).fill(null).map(() => getRandomGridPosition());
      setMolePositions(freshMolePositions);
    };

    const moleTimer = setInterval(generateMole, 1000);
    return () => clearInterval(moleTimer);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>두더지 게임</h1>
      <h2>지금까지 {score}마리의 두더지를 잡았습니다</h2>
      <div
        className={styles.container}
        style={{
          position: 'relative',
          width: '600px',
          height: '600px',
          border: '2px solid #000',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {molePositions.map((molePosition, index) => (
          molePosition && (
            <img
              key={index}
              src="/일어난두더지.png"
              alt="두더지"
              onClick={() => handleMoleClick(index)}
              style={{
                position: 'absolute',
                top: `${molePosition.row * 33.33}%`,
                left: `${molePosition.col * 33.33}%`,
                width: '200px',
                height: '200px',
                cursor: 'pointer',
              }}
            />
          )
        ))}
        {showHitMole && (
          <img
            src="/맞은두더지.png"
            alt="맞은두더지"
            style={{
              position: 'absolute',
              top: `${hitMolePosition.row * 33.33}%`,
              left: `${hitMolePosition.col * 33.33}%`,
              width: '200px',
              height: '200px',
            }}
          />
        )}
      </div>
    </div>
  );
}
