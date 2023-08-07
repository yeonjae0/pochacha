'use client'
import WordComponent from "./wordComponent"
import LiarComponent from "./liarComponent"
import VoteLiarComponent from "./voteLiarComponent"
/*
<구현 로직>
현재 사용자 === liar? (LiarComponent) : (WordComponent)
단어 설명하는 UI 여기서 구현

턴 종료 내지 타임아웃 시에 (VoteLiarComponent)

투표 완료 후 집계 화면 ... -> 컴포넌트화
승패화면 ... -> 컴포넌트화
*/
export default function Liar() {
  const topics = ['동물', '국가', '가수', '사물', '음식', '스포츠']

  return (
    <div>
      <h1>라이어게임</h1>
      <div>
        <p>주제를 선택해주세요!</p>
        {
          topics.map((topic, i) => {
            return (
              <button>{topic}</button>
            )
          })
        }
      </div>
      <br/>
      <button>확인</button>
      <br/>
      <hr/>
      <div>
        <h1>컴포넌트 테스트</h1>
        <WordComponent/>
        <LiarComponent/>
        <VoteLiarComponent/>
      </div>
    </div>
  )
}
