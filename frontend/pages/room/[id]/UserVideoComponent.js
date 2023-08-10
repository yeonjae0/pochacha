import React from 'react'
import OpenViduVideoComponent from './OvVideo.js'
import styles from '@/styles/UserVideo.module.css'

/*
    비디오 화면과 각각의 사용자 세팅을 결합하는 컴포넌트
    기존의 클래스 형식을 변경함!
*/
const UserVideoComponent = ({
  streamManager,//방장
  nickname,
  //turn,//차례
  //setTurn,//모두의 차례를 false로 초기화
}) => {
  
  /* 
   CONFIRM :: useState() 활용해 FACE FILTER API 적용 여부 저장
   */

  // useEffect(() => {
  //   /*
  //   CONFIRM :: CALL AXIOS API
  //   */
  // })

  return (
    <div>
      {streamManager !== undefined ? (
        <div className={styles.streamcomponent}>
          <OpenViduVideoComponent streamManager={streamManager} />
          {
            /*
                CONFIRM :: ADD GAME SETTING
            */
          }
          <div className={styles.nickname}>{nickname}</div>
        </div>
      ) : null}
    </div>
  );

}

export default UserVideoComponent;
