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
  joinCall(e){
    App.cable.subscriptions.create(
        { channel: "VideoChannel" },
    { connected: () => {
        broadcastData({ type: JOIN_CALL, from: this.userId });
    },
        received: data => {
            if (data.from === this.userId) return;
            switch (data.type) {
                case JOIN_CALL:
                    return this.join(data);
                case EXCHANGE:
                    if (data.to !== me) return;
                    return this.exchange(data);
                case LEAVE_CALL:
                    return this.removeUser(data);
                default:
                    return;
            }
        }
    });  
  }
  
  exchange(data){}
  join(data){
    this.createPC(data.from, true)
  }
  removeUser(data){}
  createPC(userId, offerBool){
    const pc = new RTCPeerConnection(ice);
    this.pcPeers[userId] = pc;
    this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
    if (offerBool) {
        pc.createOffer().then(offer => {
            pc.setLocalDescription(offer).then(() => {
                broadcastData({
                    type: EXCHANGE,
                    from: this.userId,
                    to: userId,
                    sdp: JSON.stringify(pc.localDescription),
                })
            })
        })
    }
    pc.onicecandidate = (e) => {
        broadcastData({
            type: EXCHANGE,
            from: this.userId,
            to: userId,
            sdp: JSON.stringify(e.candidate)
        })
    };
    pc.ontrack = (e) => {
        const remoteVid = document.createElement("video");
        remoteVid.id = `remoteVideoContainer+${userId}`;
        remoteVid.autoplay = "autoplay";
        remoteVid.srcObject = e.streams[0];
        this.remoteVideoContainer.appendChild(remoteVid);
    };
    pc.oniceconnectionstatechange = (e) => {
        if (pc.iceConnectionState === 'disconnected') {
            broadcastData({
                type: LEAVE_CALL,
                from: userId,
            });
        }
    }
    return pc;
  };
    
  
  exchange(data){
      
  }
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