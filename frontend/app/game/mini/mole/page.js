import { useSelector } from 'react-redux';

export default function Mole() {
  function FruitsComponent() {
    const fruits = useSelector((state) => state.fruits);
  
    return (
      <div>
        <h2>첫 번째 과일: {fruits[0]}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>두더지게임</h1>
      <FruitsComponent />
    </div>
  )
}
