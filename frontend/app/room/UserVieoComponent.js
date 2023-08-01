import React, { useEffect } from 'react'
import OpenViduVideoComponent from './OvVideo.js'
import './../css/UserVideo.css'
/*
    비디오 화면과 각각의 사용자 세팅을 결합하는 컴포넌트
    기존의 클래스 형식을 변경함!
*/
const UserVideoComponent = ({
  streamManager,//방장
  sub,//방장을 제외한 참여자
  ownerId,//접속한 id
  //turn,//차례
  //setTurn,//모두의 차례를 false로 초기화
}) => {
  console.log(streamManager);
  const nickNameTag = streamManager.stream.connection.data.nickName;
  const id = streamManager.stream.connection.data.id;

  /* 
   CONFIRM :: useState() 활용해 FACE FILTER API 적용 여부 저장
   */

  useEffect(() => {
    console.log(streamManager);
    /*
    CONFIRM :: CALL AXIOS API
    */
  })


  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          {ownerId === id ? (
            <div>본인?방장?</div>
          ) : (
            <div>본인X?방장X?</div>
          )}
          <OpenViduVideoComponent streamManager={streamManager} id={id} />
          {
            /*
                CONFIRM :: ADD GAME SETTING
            */
          }
        </div>
      ) : null}
    </div>
  );

}

export default UserVideoComponent
