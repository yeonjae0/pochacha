import styles from '@/styles/MoleGame.module.css'

export default function Ready() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px' }}>두더지 30마리 잡기 게임</h3>
        <div className={styles.container}>
          <img src="/두더지_준비.png" style={{ width: '450px' }} />
        </div>
      </div>
    </div>
  )
}
