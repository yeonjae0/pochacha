import Link from 'next/link'

export default function Home() {
  return (
    <div>
    <p>메인 배경색 수정 가능</p>
    <Link href={ '/enter' }><h3>🙌대기실 (START 클릭 시 Go To Room)</h3></Link>
    <Link href={ '/game' }><h3>🤩메인 게임</h3></Link>
    <Link href={ '/game/mini/liar' }><h3>😋라이어 게임</h3></Link>
    <Link href={ '/game/mini/mole' }><h3>🦔두더지 게임</h3></Link>
    <Link href={ '/game/mini/spell' }><h3>🦄훈민정음 게임</h3></Link>
    </div>
  )
}
