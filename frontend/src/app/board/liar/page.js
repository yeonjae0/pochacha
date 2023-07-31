'use client'

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


    </div>
  )
}