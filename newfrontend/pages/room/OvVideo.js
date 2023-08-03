import React, { Component } from 'react';

/*
    비디오 하나를 출력하는 Openvidu Component
*/
export default class OpenViduVideoComponent extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    /*
        CONFIRM :: CAN ADD STATE
    */

    /* 
        TO DO :: ADD FACE FILTER API
    */
  }

  componentDidMount() {
    console.log("Openvidu componentDidMount");
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidUpdate(props) {
    console.log("Openvidu componentDidUpdate");
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentWillUnmount() { }

  render() {
    return <video autoPlay={true} ref={this.videoRef} />;
    /*
        CONFIRM :: CAN ADD CUSTOM STYLE
    */
  }

}
