import React, { useState, useEffect } from "react";
import styles from "@/styles/SpellGame.module.css";

function getConsonant() {
  const [showModal, setShowModal] = useState(true);
  const [randomConsonant, setRandomConsonant] = useState("ㄱ ㅅ");
  const [inputWords, setInputWords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const wordsPerRow = 4; // 한 줄에 4개씩 단어 표시

  // 두루마리에 단어 표시하기
  const handleInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleSubmit = () => {
    console.log('Submitted Value:', inputValue);
    setInputWords((prevWords) => {
      console.log('###', prevWords)
      if (prevWords.length >= 12) {
        return [inputValue];
      }
      if (prevWords.length % wordsPerRow === 0) {
        return [...prevWords, [inputValue]];
      } else {
        const lastRow = [...prevWords.pop()];
        console.log('###', inputValue)
        lastRow.push(inputValue);
        return [...prevWords, lastRow];
      }
    });
    setInputValue("");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const ModalPage = () => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p>10초 안에 제시된 초성과 일치하는 단어를 입력하세요.</p>
            <p>*세종대왕님이 보고 계십니다*</p>
            <p>*사전에 등재된 단어만 입력해주세요.*</p>
            <h4>제시된 초성: {randomConsonant}</h4>
          </div>
        </div>
      );
    } else {
      document.body.style.overflow = "initial";
      return null;
    }
  };

  return (
    <>
      <ModalPage />

      <div className={styles.wrapper}>
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
            src="/세종대왕_기본.png"
            style={{
              position: "absolute",
              left: "125px",
              width: "350px",
              marginTop: "-350px",
            }}
          />
          <div className={styles.miniBlock1}></div>
          <div className={styles.miniBlock2}></div>
          <h3
            style={{
              position: "absolute",
              backgroundColor: "Yellow",
              left: "250px",
              zIndex: "1",
            }}
          >
            초성: {randomConsonant}
          </h3>
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
            {inputWords.map((row, rowIndex) => (
              <div className={styles.wordRow} key={rowIndex}>
                {row.map((word, wordIndex) => (
                  <div className={styles.word} key={wordIndex}>
                    {word}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default getConsonant;
