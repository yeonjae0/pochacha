import { useState, useEffect } from 'react';

const getRandomGridPosition = () => ({
  row: Math.floor(Math.random() * 3), // 0, 1, or 2
  col: Math.floor(Math.random() * 3), // 0, 1, or 2
});

export default function Home() {
  const [score, setScore] = useState(0);
  const [molePosition, setMolePosition] = useState(getRandomGridPosition());

  const handleMoleClick = () => {
    setScore(score + 1);
    setMolePosition(getRandomGridPosition());
  };

  useEffect(() => {
    const moleTimer = setTimeout(() => {
      setMolePosition(getRandomGridPosition());
    }, 1000);

    return () => clearTimeout(moleTimer);
  }, [molePosition]);

  const moleImagePosition = {
    top: `${molePosition.row * 33.33}%`,
    left: `${molePosition.col * 33.33}%`,
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>두더지 게임</h1>
      <h2>점수: {score}</h2>
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
