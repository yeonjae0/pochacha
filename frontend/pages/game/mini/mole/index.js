import { useState, useEffect } from 'react'

/* 희진 : 랜덤 위치(행/열) 출력 함수 시작 */
const getRandomGridPosition = () => ({
  row: Math.floor(Math.random() * 3), // 0, 1, or 2
  col: Math.floor(Math.random() * 3), // 0, 1, or 2
});
/* 희진 : 두더지 랜덤 위치 출력 함수 끝 */

export default function MoleGame() {
  const [score, setScore] = useState(0);
  const [molePosition, setMolePosition] = useState(getRandomGridPosition()); // 두더지 위치 == 랜덤 위치

  /* 희진 : 두더지 클릭 시 이벤트 시작 */
  const handleMoleClick = () => {
    setScore(score + 1);
    setMolePosition(getRandomGridPosition()); // 클릭 시 랜덤 위치로 재배정
  };
  /* 희진 : 두더지 클릭 시 이벤트 끝 */

  /* 희진 : 두더지 등장/소멸 시간 조절 시작 */
  useEffect(() => {
    const moleTimer = setTimeout(() => {
      setMolePosition(getRandomGridPosition());
    }, 1000);

    return () => clearTimeout(moleTimer);
  }, [molePosition]);
  /* 희진 : 두더지 등장/소멸 시간 조절 끝 */

  /* 희진 : 두더지 위치 조정 시작 */
  const moleImagePosition = {
    top: `${molePosition.row * 33.33}%`,
    left: `${molePosition.col * 33.33}%`,
  };
  /* 희진 : 두더지 위치 조정 끝 */

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>두더지 게임</h1>
      <h2>지금까지 {score}마리의 두더지를 잡았습니다</h2>
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          border: '2px solid #000',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        <img
          src="/mole1.png"
          alt="두더지"
          onClick={handleMoleClick}
          style={{
            position: 'absolute',
            top: moleImagePosition.top,
            left: moleImagePosition.left,
            width: '100px',
            height: '100px',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
