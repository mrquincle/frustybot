function init() {
  console.log("STARTING", responsiveVoice)

  // verify if the phone can detect the shake event.
  if (!('ondevicemotion' in window)) {
    Alert("This device cannot detect shakes!")
  }

  // init shake event
  let myShakeEvent = new Shake({
    threshold: SHAKE_THRESHOLD, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
  });
  myShakeEvent.start();


  // listen to the shake event!
  window.addEventListener('shake', shakeEventDidOccur, false);
}