import MoleGame from '../mini/mole/index';
import SpellGame from '../mini/spell/index';
import LiarGame from '../mini/liar/index';

export default function GameSelect({ currentCell, cellObj }) {
  console.log('GameSelec페이지로 들어왔음. cellObj찍어봄', cellObj)

  return (
    <div>
      {currentCell === '두더지 게임' && <MoleGame cellObj={cellObj}/>}
      {currentCell === '훈민정음' && <SpellGame cellObj={cellObj}/>}
      {currentCell === '라이어 게임' && <LiarGame cellObj={cellObj}/>}
    </div>
  )
}