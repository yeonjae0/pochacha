import React, { useState } from 'react'; /* React 관련 */
import OpenViduVideoComponent from './OvVideo'; /* OpenVidu 관련 */
import { useSelector } from "react-redux"; /* Store 관련 */
import Roomstyles from '@/styles/RoomPage.module.css'; /* Style 관련 */
import Videostyles from '@/styles/UserVideo.module.css';

export default function RoomCam() {

  // const [introChat, setIntroChat] = useState(''); // 참여자 입장 메시지

  const session = useSelector(state => state.room.currentRoomId);
  const nickname = useSelector(state => state.player.currentNick);
  const publisher = useSelector(state => state.openvidu.publisher);
  const participants = useSelector(state => state.openvidu.participants);

  console.log("Room Cam")
  console.log(publisher);
  console.log(participants);

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
            {participants != null ? participants.map((par, i) => (
              <span key={par.id} className={Videostyles.streamcomponent}>
                <OpenViduVideoComponent className={Roomstyles.cam} streamManager={par} />
                {console.log(par.nick)}
                <div className={Videostyles.nickname}>{par.nick}</div>
              </span>
            )) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}