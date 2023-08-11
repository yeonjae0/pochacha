import UserVideoComponent from './UserVideoComponent'; /* OpenVidu 관련 */
import { useSelector } from "react-redux"; /* 저장소 관련 */
import styles from '@/styles/RoomPage.module.css'; /* 스타일 관련 */

export default function RoomCam(props) {
  console.log("룸캠 렌더링")

    const session=useSelector(state=>state.room.roomId);
    const nickname=useSelector(state=>state.player.currentNick);
    /*
      TO DO :: 현재 props로 받아오는 정보. 자연스러운 로직을 위해 저장소 검토.
    */
    // const publisher=useSelector(state=>state.openvidu.publisher);
    // const participants=useSelector(state=>state.openvidu.participants);
    const publisher=props.publisher;
    const participants=props.participants;

    console.log(publisher);
    console.log(participants);

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="video-container" className={styles.camList}>
            {publisher !== undefined ? (
              <UserVideoComponent className={styles.cam}
                streamManager={publisher} nickname={nickname} />
            ) : confirm("퍼블리셔 없어")}
            {participants.map((par, i) => (
              <span key={par.id}>
                {console.log(JSON.parse(par.stream.connection.data.split("%")[0]).clientData)}
                <UserVideoComponent className={styles.cam} streamManager={par} nickname={JSON.parse(par.stream.connection.data.split("%")[0]).clientData} />
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
