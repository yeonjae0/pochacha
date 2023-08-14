/* Temporary Board */

import styles from '@/styles/Map.module.css'

export default function BoardMap({ pin }) {

  return (
    <div className={styles.map}>
      <div id='19'>
        <div className={styles.b19T}>{pin == 19 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b19R}></div>
      </div>
      <div id='18'>
        <div className={styles.b18T}>{pin == 18 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b18L}></div>
      </div>
      <div id='17'>
        <div className={styles.b17T}>{pin == 17 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b17L}></div>
      </div>
      <div id='16'>
        <div className={styles.b16T}>{pin == 16 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b16L}></div>
      </div>
      <div id='15'>
        <div className={styles.b15T}>{pin == 15 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b15L}></div>
      </div>
      <div id='14'>
        <div className={styles.b14T}>{pin == 14 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b14L}></div>
      </div>
      <div id='13'>
        <div className={styles.b13T}>{pin == 13 ? (<img src="/character.png" />) : null}</div>
      </div>
      <div id='20'>
        <div className={styles.b20T}>{pin == 20 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b20R}></div>
      </div>
      <div id='12'>
        <div className={styles.b12T}>{pin == 12 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b12R}></div>
      </div>
      <div id='21'>
        <div className={styles.b21T}>{pin == 21 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b21R}></div>
      </div>
      <div id='11'>
        <div className={styles.b11T}>{pin == 11 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b11R}></div>
      </div>
      <div id='22'>
        <div className={styles.b22T}>{pin == 22 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b22R}></div>
      </div>
      <div id='10'>
        <div className={styles.b10T}>{pin == 10 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b10R}></div>
      </div>
      <div id='23'>
        <div className={styles.b23T}>{pin == 23 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b23R}></div>
      </div>
      <div id='9'>
        <div className={styles.b9T}>{pin == 9 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b9R}></div>
      </div>
      <div id='24'>
        <div className={styles.b24T}>{pin == 24 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b24R}></div>
      </div>
      <div id='8'>
        <div className={styles.b8T}>{pin == 8 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b8R}></div>
      </div>
      <div id='1'>
        <div className={styles.b1T}>{pin == 1 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b1L}></div>
        <div className={styles.b1R}></div>
      </div>
      <div id='2'>
        <div className={styles.b2T}>{pin == 2 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b2L}></div>
      </div>
      <div id='3'>
        <div className={styles.b3T}>{pin == 3 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b3L}></div>
      </div>
      <div id='4'>
        <div className={styles.b4T}>{pin == 4 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b4L}></div>
      </div>
      <div id='5'>
        <div className={styles.b5T}>{pin == 5 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b5L}></div>
      </div>
      <div id='6'>
        <div className={styles.b6T}>{pin == 6 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b6L}></div>
      </div>
      <div id='7'>
        <div className={styles.b7T}>{pin == 7 ? (<img src="/character.png" />) : null}</div>
        <div className={styles.b7L}></div>
      </div>
    </div>
  )
}
