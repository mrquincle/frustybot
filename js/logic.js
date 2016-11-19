// imported hitSentences and helpdeskSentences from lines.js by include in index.html

let SELECTED_SENTENCE = 0;
let AMOUNT_OF_LINES_BEFORE_HELPDESK = 4;
let IGNORE_SHAKES = false;
let SHAKE_THRESHOLD = 3;
let ANGRY_THRESHOLD = 15;

// function to call when shake occurs
function shakeEventDidOccur (event) {
  let intensity = 'mild';
  if (event.vector > ANGRY_THRESHOLD) {
    intensity = 'angry';
  }

  // ignore shakes while triggering a skype call
  if (IGNORE_SHAKES === false)
    saySomething(intensity);
}


function pronounce(sentenceOptions) {
  // we use floor because random is 0..1 with 0 inclusive and 1 exclusive
  let selectedSentence = sentenceOptions[Math.floor(Math.random() * sentenceOptions.length)];

  // this is what we picked from the options
  console.log(sentenceOptions, selectedSentence);

  // say it
  responsiveVoice.setDefaultVoice("Dutch Female", {pitch:4} );
  responsiveVoice.speak(selectedSentence);
}



function saySomething(intensity) {
  if (SELECTED_SENTENCE >= AMOUNT_OF_LINES_BEFORE_HELPDESK) {
    pronounce(helpdeskSentences[intensity]);
    SELECTED_SENTENCE = 0;

    // click the hidden skype button
    document.getElementById("call-helpdesk").click();

    // ignore shakes for 4 seconds if we are calling the helpdesk.
    IGNORE_SHAKES = true;
    setTimeout(() => {IGNORE_SHAKES = false}, 4000);
  }
  else {
    pronounce(hitSentences[intensity]);
    SELECTED_SENTENCE += 1;
  }
}



        
