import './App.css';
import {loadVoices} from './text_to_speech_functionality';
import {readParas} from './text_to_speech_functionality';
import {changeVoice} from "./text_to_speech_functionality";
import React from "react";

function App() {
  loadVoices();
  let language = "en-";
  const handleClick = () => {
    readParas(language);
  }
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <button onClick = {handleClick}> Click me! </button>
        </form>
        <script>
          let btn = document.getElementById("btn");
          let val = btn.value;
          document.getElementById('btnRead').addEventListener('click', readParas);
        </script>
      </header>
    </div>
);
}

export default App;
