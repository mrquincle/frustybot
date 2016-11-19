// imported hitSentences and helpdeskSentences from lines.js by include in index.html

let AMOUNT_OF_SHAKES = 0;
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
    IGNORE_SHAKES = true;
    pronounce(helpdeskSentences[intensity]);
    AMOUNT_OF_SHAKES = 0;

    // click the hidden skype button
    setTimeout(() => {
      let element = document.getElementById("call-helpdesk");
      console.log("CLICKING ELEMENT", element);
      element.click();
    },3000);



    // ignore shakes for 4 seconds if we are calling the helpdesk.
    setTimeout(() => { IGNORE_SHAKES = false; }, 10000);
  }
  else {
    pronounce(hitSentences[intensity]);
  }
}



        
