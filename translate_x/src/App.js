import React, { useState } from 'react';
import axios from 'axios';
import * as allFunctions from './text_to_speech_functionality';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('EN'); // Default language is 'EN'
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const executePythonScript = async () => {
    try {
      // form for user input
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('language', selectedLanguage);

      const response = await axios.post('http://localhost:5000/api/run_script', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, output, error } = response.data;

      if (success) {
        console.log('Script output:', output);

        // Dictionary to match syntax
        let langDict = {};
        langDict["EN"] = "en-";
        langDict["ES"] = "es-";
        langDict["FR"] = "fr-";
        langDict["DE"] = "de-";
        langDict["IT"] = "it-";

        // loading voice of desired language
        allFunctions.loadVoices(langDict[selectedLanguage]);

        // transcript of audio in new language is sent to text-to-speech js function
        allFunctions.readParas(output);
      } else {
        console.error('Error executing Python script:', error);
      }
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };

  return (
      <div style={styles.container}>
        <div style={styles.centerContent}>
          <h1 style={styles.heading}>TranslateX</h1>
          <p style={styles.prompt}>Insert an audio file for translation</p>
          <div style={styles.input}>
          {/* File input */}
          <input type="file" accept="audio/*" onChange={handleFileChange} style={styles.fileInput} />
          </div>
          <div>
          {/* Language selection dropdown */}
          <label>
            Select Language:
            <select value={selectedLanguage} onChange={handleLanguageChange} style={styles.languageDropdown}>
              <option value="EN">English</option>
              <option value="ES">Spanish</option>
              <option value="FR">French</option>
              <option value="DE">German</option>
              <option value="IT">Italian</option>
            </select>
          </label>
          </div>

          <div>
          {/* Translate button */}
          <button
              onClick={executePythonScript}
              style={{
                ...styles.button,
                ...(isButtonHovered ? styles.buttonHovered : {}),
                ...(isButtonActive ? styles.buttonActive : {}),
              }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              onMouseDown={() => setButtonActive(true)}
              onMouseUp={() => setButtonActive(false)}
          >
            Translate!
          </button>
          </div>
        </div>
      </div>
  );
}

/************ CSS ************/
const styles = {
  container: {
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial',
  },
  h1: {
    fontFamily: 'Arial'
  },
  centerContent: {
    textAlign: 'center',
  },
  heading: {
    color: '#333',
  },
  prompt: {
    fontFamily: 'Arial',
    color: 'black',
    marginBottom: '10px',
  },
  input: {
    position: 'relative',
    top: '0px',
    left: '35px',
  },
  fileInput: {
    margin: '10px 0',
  },
  languageDropdown: {
    fontFamily: 'Arial',
    margin: '10px 0',
  },
  button: {
    padding: '20px',
    color: '#333',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#ff8c00', // Default background color
  },
  // Add hover and active styles
  buttonHovered: {
    backgroundColor: '#e57e00', // Orange background color on hover
  },
  buttonActive: {
    backgroundColor: '#cc7000', // Darker orange background color on active (button click)
  },
};

export default App;