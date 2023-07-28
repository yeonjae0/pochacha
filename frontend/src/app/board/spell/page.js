"use client"

import { useState } from 'react';

export default function Spell() {
  let consonants = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ',]
  let randomConsonant1 = consonants[Math.floor(Math.random() * consonants.length)];
  let randomConsonant2 = consonants[Math.floor(Math.random() * consonants.length)];
  let wordList = []

  let [text, setText] = useState('')
  let handleOnChange = (e)=> {
    setText(e.target.value)
  };
  let enterDown = (e) => {
    if (e.key === 'Enter') {
      console.log(text)
      // wordList
    }
  };

  return (
    <div>
      <h1>훈민정음 게임</h1>
      <h2>초성: {randomConsonant1 + randomConsonant2}</h2>

      <input 
        value = {text}
        onChange = {handleOnChange}
        onKeyDown = {enterDown}
      />

    </div>
  )
}