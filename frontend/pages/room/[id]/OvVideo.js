import React, { Component } from 'react';
import styles from "@/styles/UserVideo.module.css";

// import * as canvas from 'canvas';
// import * as faceapi from 'face-api.js';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    async componentDidMount() {
        //     await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        //     await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

        // const video = this.videoRef.current;

        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);

            // video.addEventListener('play', async () => {
            //     const canvas = faceapi.createCanvasFromMedia(video);
            //     document.body.append(canvas);

            //     const displaySize = { width: video.width, height: video.height };
            //     faceapi.matchDimensions(canvas, displaySize);

            //     const interval = setInterval(async () => {
            //         const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
            //         const resizedDetections = faceapi.resizeResults(detections, displaySize);
            //         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            //         faceapi.draw.drawDetections(canvas, resizedDetections);
            //         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            //     }, 100);
            // });
        }


    }

    render() {
        return (
            <div>
                <video autoPlay={true} ref={this.videoRef} className={styles.videofilter}/>
                {/* <canvas/> */}
            </div>
        )
    }

}
