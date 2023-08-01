"use client"
// 서버와 클라이언트의 랜덤초성 값이 매칭되지 않았음. 수정 필요!!

import React, { useState, useEffect } from 'react';

const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
  'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
  'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
  'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
  'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
  'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
  'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
  'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',]
const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]+$/;


// 랜덤초성 제공
const Randomconsonant = () => {
  let randomConsonant1 = consonants[Math.floor(Math.random() * consonants.length)];
  let randomConsonant2 = consonants[Math.floor(Math.random() * consonants.length)];
  return randomConsonant1 + randomConsonant2;
};

// 입력값에서 초성 추출
function getConstantVowel(word) {

  let ga = 44032;
  let uni1 = word.charCodeAt(0);
  let uni2 = word.charCodeAt(1);

  uni1 = uni1 - ga;
  uni2 = uni2 - ga;

  let fn1 = parseInt(uni1 / 588);
  let fn2 = parseInt(uni2 / 588);
  let sn1 = parseInt((uni1 - (fn1 * 588)) / 28);
  let sn2 = parseInt((uni2 - (fn2 * 588)) / 28);
  let tn1 = parseInt(uni1 % 28);
  let tn2 = parseInt(uni2 % 28);
  let firstChoSung = f[fn1]
  let secondChoSung = f[fn2]
  return firstChoSung + secondChoSung;
};

// 입력값이 한국어인지 확인
function checkKorean(str) {
  console.log('checkKorean  ' + str)
  return regExp.test(str[0]) && regExp.test(str[1]) ? true : false;
}
// 초성 체크하기
function checkChoSung(str) {
  return Randomconsonant() === getConstantVowel(text) ? true : false
}

export default function Spell() {
  let [consonants, setConsonants] = useState(Randomconsonant());  // 랜덤 초성 저장
  let [text, setText] = useState('');  // 유저가 쓴 인풋 저장
  let [wordList, setWordList] = useState([])  // 유저가 쓴 단어 리스트
  let [gameOver, setGameOver] = useState(false);  // true-> 게임 끝


  let inputChange = (e) => {
    setText(e.target.value)
  };

  // 유저가 입력한 인풋에 대해
  let inputSubmit = () => {
    if (gameOver) return;

    if (text.length === 2) {
      //
      console.log(text)
      console.log(getConstantVowel(text))
      console.log(checkKorean(text))
      console.log('랜덤초성' + Randomconsonant())
      // console.log('checkChoSung' + checkChoSung(text))
      //
      setText('');
      if (checkKorean(text)) {
        setWordList((prevWordList) => [...prevWordList, text]);
      }
      else {
        alert('한글만 입력해주세요.');
        setText('');
      }
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
