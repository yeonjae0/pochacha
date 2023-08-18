import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import { useSelector } from "react-redux";
import Roomstyles from "@/styles/RoomPage.module.css";
import Videostyles from "@/styles/UserVideo.module.css";

export default function RoomCam() {
  const session = useSelector((state) => state.openvidu.session);
  const nickname = useSelector((state) => state.player.currentNick);
  const publisher = useSelector((state) => state.openvidu.publisher);
  const participants = useSelector((state) => state.openvidu.participants);

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="video-container" className={Roomstyles.camList}>
            {participants != null
              ? participants.map((par, i) =>
                  par != null ? (
                    <span key={par.id} className={Videostyles.streamcomponent}>
                      <OpenViduVideoComponent
                        className={Roomstyles.cam}
                        streamManager={par.participant}
                      />
                      <div className={Videostyles.nickname}>{par.nick}</div>
                    </span>
                  ) : null
                )
              : null}

            {publisher !== undefined ? (
              <span className={Videostyles.streamcomponent}>
                <OpenViduVideoComponent className={Roomstyles.cam} streamManager={publisher} />
                <div className={Videostyles.nickname}>{nickname}</div>
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
