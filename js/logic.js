// imported hitSentences and helpdeskSentences from lines.js by include in index.html

let AMOUNT_OF_SHAKES = 0;
let AMOUNT_OF_LINES_BEFORE_HELPDESK = 4;
let IGNORE_SHAKES = false;
let SHAKE_THRESHOLD = 3;
let ANGRY_THRESHOLD = 15;


function initAvailableLists() {
  hitSentences.available.calm = [];
  hitSentences.available.angry = [];
  helpdeskSentences.available.calm = [];
  helpdeskSentences.available.angry = [];
  for (let i = 0; i < hitSentences.calm.length;  i++) { hitSentences.available.calm.push(i); }
  for (let i = 0; i < hitSentences.angry.length;  i++) { hitSentences.available.angry.push(i); }
  for (let i = 0; i < helpdeskSentences.calm.length;  i++) { helpdeskSentences.available.calm.push(i); }
  for (let i = 0; i < helpdeskSentences.angry.length; i++) { helpdeskSentences.available.angry.push(i); }
}


// function to call when shake occurs
function shakeEventDidOccur (event) {
  document.getElementById("vectorX").innerHTML = event.dx;
  document.getElementById("vectorY").innerHTML = event.dy;
  document.getElementById("vectorZ").innerHTML = event.dz;

  let emotion = 'calm';
  if (event.dx > ANGRY_THRESHOLD || event.dy > ANGRY_THRESHOLD || event.dz > ANGRY_THRESHOLD) {
    emotion = 'angry';
  }

  // ignore shakes while triggering a skype call
  if (IGNORE_SHAKES === false) {
    saySomething(emotion);
  }
}

function getRandomSentenceFromSelection(sentenceOptions, emotion) {
  let availableOptions = sentenceOptions.available[emotion];

  // start over if we have had all options.
  if (availableOptions.length === 0) {
    availableOptions = [0];
  }

  // we use floor because random is 0..1 with 0 inclusive and 1 exclusive
  let randomIndex = Math.floor(Math.random() * availableOptions.length);
  let selectedSentenceIndex = availableOptions[randomIndex];
  let selectedSentence = sentenceOptions[emotion][selectedSentenceIndex];

  // remove the element we already used
  availableOptions = availableOptions.splice(randomIndex,1);

  // this is what we picked from the options
  console.log(availableOptions,sentenceOptions, selectedSentenceIndex, selectedSentence);
  
  return selectedSentence;
}

function pronounce(sentenceOptions, emotion) {
  let selectedSentence = getRandomSentenceFromSelection(sentenceOptions, emotion);
  // say it
  responsiveVoice.setDefaultVoice("Dutch Female", {pitch:4, volume:1} );
  responsiveVoice.speak(selectedSentence);
}

function saySomething(emotion) {
  AMOUNT_OF_SHAKES += 1;

  if (AMOUNT_OF_SHAKES >= AMOUNT_OF_LINES_BEFORE_HELPDESK) {
    IGNORE_SHAKES = true;
    // reset options
    initAvailableLists();
    pronounce(helpdeskSentences, emotion);
    AMOUNT_OF_SHAKES = 0;

    // click the hidden skype button and wait for the speach to end
    setTimeout(() => {
      let element = document.getElementById("call-helpdesk");
      console.log("CLICKING ELEMENT", element);
      //element.click();
    },3500);



    // ignore shakes for 4 seconds if we are calling the helpdesk.
    setTimeout(() => { IGNORE_SHAKES = false; }, 10000);
  }
  else {
    pronounce(hitSentences, emotion);
  }
}



        
