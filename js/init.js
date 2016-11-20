function init() {
  // verify if the phone can detect the shake event.
  if (!('ondevicemotion' in window)) {
    alert("This device cannot detect shakes!")
  }

  initAvailableLists();

  // init shake event
  let myShakeEvent = new Shake({
    threshold: SHAKE_THRESHOLD, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
  });
  myShakeEvent.start();

  // init the web rtc stack.
  initWebRtc();
}
