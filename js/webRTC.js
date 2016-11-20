let webrtc = undefined;
let USER_TYPE = undefined;
let ROOM_ID = "testing_crownstone";
let connectedPeer = null;
let webrtcInitialized = false;
let roomEntered = false;

function select(userType) {
  USER_TYPE = userType;

  webrtc = new SimpleWebRTC({
    localVideoEl: '',
    remoteVideosEl: '',
    autoRequestMedia: true,
    enableDataChannels: false,
    media: {
      audio: true,
      video: false
    },
    receiveMedia: { // FIXME: remove old chrome <= 37 constraints format
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 0
    },
  });

  document.getElementById("startInterface").style.display = "none";
  if (userType === 'elderly') {
    document.getElementById("elderlyInterface").style.display = "block";
  }
  else {
    document.getElementById("helpdeskInterface").style.display = "block";
  }

  var localAudio = document.getElementById('localAudio');
  localAudio.disabled = false;
  localAudio.volume = 1;


  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    // you can name it anything
    console.log("starting@")
    webrtcInitialized = true;
  });

  // local p2p/ice failure
  webrtc.on('iceFailed', function (peer) {
    console.log('local fail', peer.sid);
  });

  // remote p2p/ice failure
  webrtc.on('connectivityError', function (peer) {
    console.log('remote fail', peer.sid);
  });

  // called when a peer is created
  webrtc.on('createdPeer', function (peer) {
    console.log('created peer')
    connectedPeer = peer;
    if (peer && peer.pc) {
      peer.firsttime = true;
      peer.pc.on('iceConnectionStateChange', function (event) {
        console.log('iceConnectionStateChange', peer.pc.iceConnectionState, event)
        let state = peer.pc.iceConnectionState;
        switch (state) {
          case 'connected':
          case 'completed':
            localAudio.srcObject = peer.stream;
            if (peer.firsttime) {
              peer.firsttime = false;
            }
            break;
          case 'closed':
          case 'failed':
            break;
        }
      });
    }
  });


  webrtc.connection.on('message', function (message) {
    console.log('RECEIVED MESSAGE', message);
    if (message.type === 'helpdeskCloseConnection')
      leaveRoom();
  });
}

function hangUp() {
  if (connectedPeer) {
    connectedPeer.send("helpdeskCloseConnection", {hello:'world'});
    connectedPeer = null;
  }
}

function enterRoom() {
  if (roomEntered === false) {
    roomEntered = true;
    webrtc.joinRoom(ROOM_ID);
    localAudio.disabled = false;
  }
}

function leaveRoom() {
  if (roomEntered === true) {
    roomEntered = false;
    webrtc.leaveRoom();
    localAudio.disabled = true;
  }
}