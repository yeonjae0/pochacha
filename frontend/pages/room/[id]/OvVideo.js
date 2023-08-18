import React, {useEffect} from "react";
// import styles from "@/styles/UserVideo.module.css";
import styles from "../../../styles/UserVideo.module.css";
import SoundMeter from "../../../pages/audioeffect/SoundMeter";

export default function OpenViduVideoComponent(props) {
  const videoRef = React.createRef();
  let soundMeter = new SoundMeter(new AudioContext())

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
      soundMeter.connectToSource(props.isAudioChanged, props.streamManager.stream.getMediaStream());
    }
  });

  return (
    <div>
        <video autoPlay={true} ref={videoRef} className={styles.videofilter} />
    </div>
  );
  // }
}
