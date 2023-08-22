import React, { useEffect, useRef } from "react";
import styles from "@/styles/UserVideo.module.css";

export default function OpenViduVideoComponent(props) {
  const videoRef = React.createRef();

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  });

  return (
    <div>
      <video autoPlay={true} ref={videoRef} className={styles.videofilter} />
    </div>
  );
}
