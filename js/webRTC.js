let webrtc = undefined;
let USER_TYPE = undefined;
let ROOM_ID = "testing_crownstone";


function select(userType) {
  USER_TYPE = userType;

  webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true
  });

  document.getElementById("startInterface").style.display = "none";
  if (userType === 'elderly') {
    document.getElementById("elderlyInterface").style.display = "block";
  }
  else {
    document.getElementById("helpdeskInterface").style.display = "block";

  }


  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    // you can name it anything
    console.log("starting@")
    webrtc.joinRoom('apoliiut');
  });

  // local p2p/ice failure
  webrtc.on('iceFailed', function (peer) {
    console.log('local fail', peer.sid);
  });

  // remote p2p/ice failure
  webrtc.on('connectivityError', function (peer) {
    console.log('remote fail', peer.sid);
  });

  // working around weird simplewebrtc behaviour
  webrtc.on('videoAdded', function (video, peer) {
    console.log('video added')
  });
  // called when a peer is created
  webrtc.on('createdPeer', function (peer) {
    console.log('created peer')
  });


  webrtc.connection.on('message', function (message) {
    console.log('RECEIVED MESSAGE', message);
  });
}