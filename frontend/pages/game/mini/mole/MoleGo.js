import styles from '@/styles/MoleGame.module.css'

export default function Go() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>30초 시작합니다</h1>
        <div className={styles.container}>
          <img src="/두더지_시작.png" />
        </div>
      </div>
    </div>
  )
}
