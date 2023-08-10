import { useState, useEffect } from 'react'
import styles from '@/styles/LiarGame.module.css';


export default function Main() {
  console.log('LiarGame')
  return (
    <div>
      <LiarGame />
    </div>
  )
}

function LiarGame() {
  const [status, setStatus] = useState('ready')
  const [word, setWord] = useState('abc')

  useEffect(() =>{
    setStatus('ready')
    console.log('picktopic')
  },[])

  // useEffect(() => {
  //   setStatus('playing')
  //   console.log('word change?')
  // }, [word])

  return (
    <div>
      {
        status === 'ready' && (
          <Picktopic />
        )
      }
    </div>
  )
}

function Picktopic() {

  // const handleTopicClick = ()

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>주제를 골라주세요</h1>
      <div
        className="pickTopic"
        style={{
          position: 'relative',
          width: '600px',
          height: '600px',
          border: '2px solid #000',
          margin: '0 auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleTopicClick('animal')}>동물</button>
          <button
            className={styles.button}
            onClick={() => handleTopicClick('country')}>나라</button>
        </div>
        <div className={styles.buttonContainer}>
          <button
           className={styles.button}
           onClick={() => handleTopicClick('food')}>음식</button>
          <button
           className={styles.button}
           onClick={() => handleTopicClick('objects')}>사물</button>
        </div>
        <div className={styles.buttonContainer}>
          <button
           className={styles.button}
           onClick={() => handleTopicClick('singer')}>가수</button>
          <button
           className={styles.button}
           onClick={() => handleTopicClick('sports')}>스포츠</button>
        </div>  
      </div>
    </div>
  )
}