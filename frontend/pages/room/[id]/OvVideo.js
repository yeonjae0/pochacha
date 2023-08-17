import React, {useEffect, useRef} from "react";
import styles from "@/styles/UserVideo.module.css";
// import * as deepar from "deepar";

export default function OpenViduVideoComponent(props) {
  console.log("오픈비두 열림")
  const videoRef = React.createRef();

  /// 여기서부터 Deep AR 변수
  // const canvasRef = useRef(null); // Deep AR Canvas
  // let deepAR = null;

  useEffect(() => {
    if (props && !!videoRef) {
      console.log("오픈비두 변화")
      props.streamManager.addVideoElement(videoRef.current);
      // initializeDeepAR();
    }
  });

  /// 여기서부터 Deep AR
  // const initializeDeepAR = async () => {
  //   try {
  //     const canvas = canvasRef.current;
  //     const video = videoRef.current;
  //     if (!deepAR) {
  //       await console.log("deepAR ::: ", deepAR);
  //       await console.log("deepar ::: ", deepar);

  //       deepAR = await deepar.initialize({
  //         licenseKey:
  //           "278cc7b9cd550b7b553b0c6b3629c269ea59e76ba24c8393a927b41264da4ff4ca7c1a0d1e640e90",
  //         canvas,
  //         effect: "/effects/ray-ban-wayfarer.deepar",
  //         additionalOptions: {
  //           cameraConfig: {
  //             disableDefaultCamera: true,
  //           },
  //         },
  //       });
  //       console.log("딥에이알 초기화")
  //       await deepAR.setVideoElement(video, true);
  //       await deepAR.startCamera();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //  // initializeDeepAR();
  //   return () => {
  //     if (deepAR!=null) {
  //       console.log("딥에이알 셧다운")
  //       deepAR.shutdown();
  //     }
  //   };
  // }, [videoRef]);

  // render() {
  return (
    <div>
      {/* <canvas ref={canvasRef}> */}
        <video autoPlay={true} ref={videoRef} className={styles.videofilter} />
      {/* </canvas> */}
    </div>
  );
  // }
}
