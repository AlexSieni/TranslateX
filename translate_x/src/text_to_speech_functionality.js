let synth = window.speechSynthesis;
let voices = synth.getVoices();
let VOICE = null;

export function loadVoices() {
    //build the select list
    // voice .lang 'en-CA', name: 'Karen', default: true|false
    for (let i = 0; i < voices.length; i++) {
        if (!voices[i].lang.startsWith('en-')) continue;
        const option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        if (voices[i].default) {
            option.className = 'picked';
            VOICE = voices[i];
        }
    }
}

export function readParas() {
    //read the text from the inputs and speak it
        const txt = 'This is the text I want read aloud';
        const utter = new SpeechSynthesisUtterance(txt);
        utter.voice = VOICE;
        synth.speak(utter);
}