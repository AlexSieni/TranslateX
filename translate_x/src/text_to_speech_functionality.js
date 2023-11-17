let synth = window.speechSynthesis;
let voices = synth.getVoices();
let VOICE = null;

export function loadVoices(lang) {
    //build the select list
    // voice .lang 'en-CA', name: 'Karen', default: true|false
    //var voicesInSelectedLang = [];
    for (let i = 0; i < voices.length; i++) {
        if (!voices[i].lang.startsWith(lang)) continue;
        const option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        if (voices[i].default) {
            option.className = 'picked';
            VOICE = voices[i];
        }
    }
}

export function changeVoice(idx){
    VOICE = voices[idx];
}

export function readParas(text_to_read) {
    //read the text from the inputs and speak it
    const utter = new SpeechSynthesisUtterance(text_to_read);
    utter.voice = VOICE;
    synth.speak(utter);
}

