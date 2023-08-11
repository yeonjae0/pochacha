import React, { useState } from 'react'; /* React 관련 */
import OpenViduVideoComponent from './OvVideo.js'; /* OpenVidu 관련 */
import { useSelector } from "react-redux"; /* Store 관련 */
import Roomstyles from '@/styles/RoomPage.module.css'; /* Style 관련 */
import Videostyles from '@/styles/UserVideo.module.css';

export default function RoomCam(props) {

  const [introChat, setIntroChat] = useState(''); // 참여자 입장 메시지

  console.log("룸캠 렌더링")

  /*
    TO DO :: 현재 props로 받아오는 정보. 자연스러운 로직을 위해 저장소 검토.
  */
  const session = useSelector(state => state.room.currentRoomId);
  const nickname = useSelector(state => state.player.currentNick);
  // const publisher=useSelector(state=>state.openvidu.publisher);
  // const participants=useSelector(state=>state.openvidu.participants);
  const publisher = props.publisher;
  const participants = props.participants;

  console.log(publisher);
  console.log(participants);

  /* 
 CONFIRM :: useState() 활용해 FACE FILTER API 적용 여부 저장
 */

  // useEffect(() => {
  //   /*
  //   CONFIRM :: CALL AXIOS API
  //   */
  // })

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="video-container" className={Roomstyles.camList}>
            {publisher !== undefined ? (
              <span className={Videostyles.streamcomponent}>
                <OpenViduVideoComponent className={Roomstyles.cam}
                  streamManager={publisher} />
                <div className={Videostyles.nickname}>{nickname}</div>
              </span>
            ) : null}
            {participants.map((par, i) => (
              <span key={par.id} className={Videostyles.streamcomponent}>
                {console.log(JSON.parse(par.stream.connection.data.split("%")[0]).clientData)}
                <OpenViduVideoComponent className={Roomstyles.cam} streamManager={par} />
                <div className={Videostyles.nickname}>{JSON.parse(par.stream.connection.data.split("%")[0]).clientData}</div>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}