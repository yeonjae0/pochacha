'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import SockJS from 'sockjs-client';

function getConsonant() {
  const [randomConsonant, setRandomConsonant] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [myTurn, setMyTurn] = useState(false);

  const sock = new SockJS("http://localhost:80/ws");

    // Axios를 사용하여 ID들 가져오기
    sock.onopen = () => {
      sock.send("get_player_id");
    };

    sock.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === "currentPlayerId") {
        setCurrentPlayerId(data.playerId);
      } else if (data.type === "isMyTurn") {
        setMyTurn(data.myTurn);
      } else if (data.type === "validatedWord") {
        if (data.isValid) {
          setResult(data.validatedWord);
        } else {
          alert("땡-! 다시 입력해주세요");
        }
      }
    };



  // Axios를 사용하여 초성 가져오기
  useEffect(() => {
    axios.get("/api/chosungs")
      .then(response => {
        setConsonant(response.data);
      })
      .catch(error => {
        console.error("에러났당", error);
      });
  }, []);

  const handleInputChange = e => {
    setUserInput(e.target.value);
  };

  // 새고 방지
  const handleSubmit = e => {
    e.preventDefault();




  return (
    <div>
      <h1>초성 게임</h1>
      <h2>{randomConsonant}</h2>
      <p>{currentPlayerId}님의 차례입니다.</p>
      <form onSubmit={handleSubmit}>
        <label>
          단어를 입력하세요:
          <input type="text" value={userInput} onChange={handleInputChange} 
          // disabled={!myTurn}
          />
        </label>
        <button type="submit"
        // disabled={!myTurn}
        >제출</button>
      </form>
      <p>Result: {result}</p>
    </div>
  );
}
}
export default getConsonant;
