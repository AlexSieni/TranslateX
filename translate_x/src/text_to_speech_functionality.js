let synth = window.speechSynthesis;
let voices = synth.getVoices();
let VOICE = null;
import React from "react";
import Select from "react-select";

export function loadVoices(lang) {
    //build the select list
    // voice .lang 'en-CA', name: 'Karen', default: true|false
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

export function readParas() {
    //read the text from the inputs and speak it
        const txt = '1234567!!! ';
        const utter = new SpeechSynthesisUtterance(txt);
        utter.voice = VOICE;
        synth.speak(utter);
}

