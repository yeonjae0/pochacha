import React, { useEffect, useRef } from 'react'; /* React 관련 */

export default function OpenViduVideoComponent(props) {

  let streamManager = props.streamManager;
  let videoRef = useRef(null);

  navigator.mediaDevices.getUserMedia({
    video: true,
  })
    .then((stream) => {
      let video = videoRef.current;
      video.srcObject = stream;
    }).catch((error) => {
      if(error.response) {
        router.push({
            pathname: "/exception",
            query: { msg: error.response.data },
          })
      } else { console.log(error) }
    });

  /*
    CONFIRM :: CAN ADD STATE
*/
  /* 
      TO DO :: ADD FACE FILTER API
  */

  useEffect(() => {
    if (streamManager && !videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [videoRef]);

  return (
    <span>
      <video autoPlay={true} ref={videoRef} />
      {/*
        CONFIRM :: CAN ADD CUSTOM STYLE
  */}
    </span>
  );
}