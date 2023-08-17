import MoleGame from '../mini/mole/index';
import SpellGame from '../mini/spell/index';
import LiarGame from '../mini/liar/index';

export default function GameSelect({ currentCell, sec }) {

  return (
    <div>
      {currentCell === '두더지 게임' && <MoleGame />}
      {currentCell === '훈민정음' && <SpellGame />}
      {currentCell === '라이어 게임' && <LiarGame />}
    </div>
  )
}
