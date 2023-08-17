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
            soundMeter.connectToSource(props.isAudioDistorted, this.props.streamManager.stream.getMediaStream());
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
