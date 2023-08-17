import React, { Component } from 'react';
import SoundMeter from "../../../pages/audioeffect/SoundMeter";

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        let soundMeter = new SoundMeter(new AudioContext())

        console.log("OvVideoComponent의 streamManager 출력")
        console.log(props.streamManager.stream.getMediaStream())
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }

        if(props.isAudioDistorted){
            soundMeter.connectToSource(true, props.streamManager.stream.getMediaStream());
        } else {
            soundMeter.stop();
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }

}
