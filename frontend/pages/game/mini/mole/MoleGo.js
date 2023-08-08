import styles from '@/styles/MoleGame.module.css'

export default function Go() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>30초 시작합니다</h1>
        <h2>30마리를 잡아라!</h2>
        <div
          className={styles.container}
          style={{
            position: 'relative',
            width: '600px',
            height: '600px',
            border: '2px solid #000',
            margin: '0 auto',
            overflow: 'hidden',
          }}>
          <img src="/두더지_시작.png" />
        </div>
      </div>
    </div>
  )
}
