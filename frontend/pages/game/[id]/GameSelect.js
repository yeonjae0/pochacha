import MoleGame from '../mini/mole/index.js'
import SpellGame from '../mini/spell/index.js'
import LiarGame from '../mini/liar/index.js'

export default function GameSelect({ currentCell }) {

  return (
    <div>
      {currentCell === '두더지 게임' && <MoleGame />}
      {currentCell === '훈민정음' && <SpellGame />}
      {currentCell === '라이어 게임' && <LiarGame />}
    </div>
  )
}