let USER_PEER = undefined;
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
    USER_PEER = new Peer({key: 'yqh0u7lrdrhpvi', secure: true});
    document.getElementById("elderlyInterface").style.display = "block";

    call();
  }
  else {
    USER_PEER = new Peer({key: '2eoyrb803qq9qkt9', secure: true});
    document.getElementById("helpdeskInterface").style.display = "block";

    USER_PEER.on('call', function(callSession) {
      // Answer the call, providing our mediaStream
      callSession.answer(MediaStream);
    });
  }
}

function call(peerId) {
  console.log("calling!")
  let callSession = USER_PEER.call(peerId, MediaStream);

  callSession.on('stream', function(stream) {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    console.log("call answered")
  });
}