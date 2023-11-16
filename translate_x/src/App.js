import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const executePythonScript = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await axios.post('http://localhost:5000/api/run_script', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, output, error } = response.data;

      if (success) {
        console.log('Script output:', output);
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
          <input type="file" accept="audio/*" onChange={handleFileChange} style={styles.fileInput} />
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
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  centerContent: {
    textAlign: 'center',
  },
  heading: {
    color: '#333',
  },
  prompt: {
    color: '#555',
    marginBottom: '10px',
  },
  fileInput: {
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
