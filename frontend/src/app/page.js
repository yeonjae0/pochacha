"use client"
import React, { useEffect } from 'react';
import Link from 'next/link'

export default function Home() {

  return (
    <div>

      <h1>임시 메인화면</h1>
      <br />
      <br />

      <h3>메인 개발 화면</h3>
        <li><Link href="/first">첫화면</Link></li>
        <li><Link href="/room">룸</Link></li>
        <li><Link href="/board">보드게임</Link></li>
      <br />
      <h3>미니게임화면</h3>
        <li><Link href="/board/mole">두더지게임</Link></li>
        <li><Link href="/board/liar">라이어게임</Link></li>
        <li><Link href="/board/spell">훈민정음게임</Link></li>
      <p>미니게임 내에서도 화면 나뉠 예정</p>


    </div>
  )
}
