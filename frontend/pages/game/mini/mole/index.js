import { useState, useEffect } from 'react';

export default function Home() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState([]);

  // Function to generate random moles
  const generateMoles = () => {
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);
    return { x: randomX, y: randomY };
  };

  // Function to handle mole click
  const handleMoleClick = (index) => {
    setMoles((prevMoles) => {
      prevMoles.splice(index, 1);
      return [...prevMoles];
    });
    setScore((prevScore) => prevScore + 1);
  };

  // Function to remove a mole after 5 seconds
  const removeMoleAfterDelay = (index) => {
    setTimeout(() => {
      setMoles((prevMoles) => {
        prevMoles.splice(index, 1);
        return [...prevMoles];
      });
    }, 5000);
  };

  // useEffect to generate moles and remove them after a delay
  useEffect(() => {
    const moleInterval = setInterval(() => {
      const newMoles = [...moles, generateMoles()];
      setMoles(newMoles);
    }, 1000);

    moles.forEach((mole, index) => {
      removeMoleAfterDelay(index);
    });

    return () => clearInterval(moleInterval);
  }, [moles]);

  return (
    <div>
      <h1>Mole Game</h1>
      <div>Score: {score}</div>
      <div>
        {moles.map((mole, index) => (
          <img
            key={index}
            src="/mole1.png"
            alt="mole"
            style={{ position: 'absolute', left: mole.x, top: mole.y, cursor: 'pointer' }}
            onClick={() => handleMoleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
