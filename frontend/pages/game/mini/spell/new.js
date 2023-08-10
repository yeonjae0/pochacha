import React, { useState, useEffect } from "react";
import styles from "@/styles/SpellGame.module.css";

function getConsonant() {
  const [showModal, setShowModal] = useState(true);
  const [randomConsonant, setRandomConsonant] = useState("ㄱ ㅅ");
  const [displayedWords, setDisplayedWords] = useState([]); // 입력한 단어들 저장
  const [inputValue, setInputValue] = useState(""); // 유저 입력값 저장

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setDisplayedWords((prevWords) => [...prevWords, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className={styles.wrapper}>
      {showModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*세종대왕님이 보고 계십니다*</p>
            <p>*사전에 등재된 단어만 입력해주세요.*</p>
            <h4>제시된 초성: {randomConsonant}</h4>
          </div>
        </div>
      )}

      <div className={styles.text}>
        <h1>초성 게임</h1>
        <label>
          단어를 입력하세요:
          <input type="text" value={inputValue} onChange={handleInput} />
        </label>
        <button type="button" onClick={handleSubmit}>
          제출
        </button>
      </div>
      <br />
      <div className={styles.redBlock}>
        <img
          src="/두루마리.png"
          style={{
            position: "absolute",
            width: "600px",
            left: "0px",
            marginBottom: "-150px",
            zIndex: "0",
          }}
        />
        <div className={styles.wordsContainer}>
          {displayedWords.map((word, index) => (
            <div
              key={index}
              className={styles.word}
              style={{
                position: "absolute",
                left: `${(index % 4) * 150}px`,
                top: `${Math.floor(index / 4) * 50}px`,
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default getConsonant;