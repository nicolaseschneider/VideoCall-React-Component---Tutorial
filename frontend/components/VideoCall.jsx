import React from 'react';
import { broadcastData, JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from './video_util.js';
class VideoCall extends React.Component{
  constructor(props){
    super(props);
    this.pcPeers = {};
    this.userId = Math.floor(Math.random() * 10000);
  }
  componentDidMount(){
    navigator.mediaDevices.getUserMedia( { audio: false, video: true })
    .then(stream => {
        this.localStream = stream;
        document.getElementById("local-video").srcObject = stream;
    }).catch(error => { console.log(error) });
  }
  joinCall(){}
  leaveCall(){}
  exchange(data){}
  join(data){}
  removeUser(data){}
  createPC(userId, offerBool){}
  exchange(data){}
    render(){
        return(<div className="VideoCall">
                    <div id="remote-video-container"></div>
                    <video id="local-video" autoPlay></video>
                    <button onClick={this.joinCall}>Join Call</button>
                    <button onClick={this.leaveCall}>Leave Call</button>
                </div>)
    }
}
export default VideoCall;