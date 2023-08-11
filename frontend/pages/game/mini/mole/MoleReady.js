import styles from '@/styles/MoleGame.module.css'

export default function Ready() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>두더지 30마리 잡기 게임</h1>
        <div className={styles.container}>
          <img src="/두더지_준비.png" />
        </div>
      </div>
    </div>
  )
}
