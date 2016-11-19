// imported hitSentences and helpdeskSentences from lines.js by include in index.html

let AMOUNT_OF_SHAKES = 0;
let AMOUNT_OF_LINES_BEFORE_HELPDESK = 4;
let IGNORE_SHAKES = false;
let SHAKE_THRESHOLD = 3;
let ANGRY_THRESHOLD = 15;

// function to call when shake occurs
function shakeEventDidOccur (event) {

  document.getElementById("vector").innerHTML = event.vector;
  let intensity = 'mild';
  if (event.vector > ANGRY_THRESHOLD) {
    intensity = 'angry';
  }

  // ignore shakes while triggering a skype call
  if (IGNORE_SHAKES === false) {
    saySomething(intensity);
  }
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
  AMOUNT_OF_SHAKES += 1;

  if (AMOUNT_OF_SHAKES >= AMOUNT_OF_LINES_BEFORE_HELPDESK) {
    // temporarily ignore shakes while calling
    IGNORE_SHAKES = true;

    // click the link
    let element = document.getElementById("call-helpdesk");
    element.click();

    // speak the line
    pronounce(helpdeskSentences[intensity]);


    AMOUNT_OF_SHAKES = 0;
    setTimeout(() => { IGNORE_SHAKES = false; }, 10000);
  }
  else {
    pronounce(hitSentences[intensity]);
  }
}



        
