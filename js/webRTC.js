let webrtc = undefined;
let USER_TYPE = undefined;
let MediaStream = undefined;


navigator.mediaDevices.getUserMedia({video:false, audio: true})
  .then(function(mediaStream) {
    console.log("we got an awesome media stream!");
    MediaStream = mediaStream;
  })
  .catch(function(err) {
    console.log("failed getting media stream", err);
    /* handle the error */
  });

function select(userType) {
  USER_TYPE = userType;

  document.getElementById("startInterface").style.display = "none";
  if (userType === 'elderly') {
    document.getElementById("elderlyInterface").style.display = "block";
  }
  else {
    document.getElementById("helpdeskInterface").style.display = "block";
  }

  webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true
  });

  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('HELPDESK123456');
  });
}