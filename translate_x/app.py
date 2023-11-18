from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import deepltranslate

app = Flask(__name__)
CORS(app)

@app.route('/api/run_script', methods=['POST'])
def run_script():
    try:
        # Check if the 'audio' file is included in the request
        if 'audio' not in request.files:
            return jsonify({'success': False, 'error': 'No audio file provided'})

        # set up audio_file and language parameters
        audio_file = request.files['audio']
        language = request.form['language']

        # Save the audio file to a temporary location
        audio_path = '/tmp/user_audio.mp3'
        audio_file.save(audio_path)

        # Modify the subprocess command to include the audio file as a parameter
        result = subprocess.run(['python3', 'main.py', audio_path], check=True, capture_output=True, text=True)
        output = result.stdout # output of main.py file, which is a speech-to-text output

        # path for initial audio translation
        output_path = 'output.txt'

        # write to the output_path
        with open(output_path,'w') as output_file:
            output_file.write(output)

        # text-to-text given output from speech-to-text and language to convert to
        deepltranslate.translatedoc(output_path, language)

        # new text file in preferred language
        with open('new.txt','r') as output_file:
            newOutput = output_file.read()

        # return back to front end, either success or failure
        return jsonify({'success': True, 'output': newOutput})
    except subprocess.CalledProcessError as e:
        return jsonify({'success': False, 'error': str(e)})

# runs back end on port 5000
if __name__ == '__main__':
    app.run(port=5000, debug=True)
