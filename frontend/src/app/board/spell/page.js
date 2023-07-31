"use client"

import React, { useState, useEffect } from 'react';

const Randomconsonant = () => {
  let consonants = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ',]
  let randomConsonant1 = consonants[Math.floor(Math.random() * consonants.length)];
  let randomConsonant2 = consonants[Math.floor(Math.random() * consonants.length)];
  return randomConsonant1 + randomConsonant2;
};

  export default function Spell() {
    let [consonants, setConsonants] = useState(Randomconsonant());  // 랜덤 초성 저장
    let [text, setText] = useState('');  // 유저가 쓴 인풋 저장
    let [wordList, setWordList] = useState([])  // 유저가 쓴 단어 리스트
    let [gameOver, setGameOver] = useState(false);  // ture-> 게임 끝
  

    let inputChange = (e)=> {
      setText(e.target.value)
    };

    let inputSubmit = () => {
      if (gameOver) return;

      if (text.length === 2) {
        setWordList((prevWordList) => [...prevWordList, text]);
        setText('');
      } else {
        alert('두 글자를 입력해주세요.');
        setText('');
      }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      inputSubmit();
    }
  };

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        alert('게임이 끝났습니다.');
        setWordList([]);
        setGameOver(false);
        setConsonants(Randomconsonant());
      }, 3000); 
    }
  }, [gameOver]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     alert('시간 초과! 게임이 끝났습니다.');
  //     setWordList([]);
  //     setGameOver(true);
  //   }, 10000); // 10초 타이머

  //   return () => clearTimeout(timer);
  // }, [consonants]);

  return (
    <div className="spell-game-container">
      <h1>초성 게임</h1>
      <h2>초성: {consonants}</h2>
      <input
        type="text"
        value={text}
        onChange={inputChange}
        onKeyDown={handleKeyDown}
        disabled={gameOver}
      />
      <button onClick={inputSubmit} disabled={gameOver}>
        입력
      </button>
      <h3>입력한 단어:</h3>
      <ul>
        {wordList.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};
