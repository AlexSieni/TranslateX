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

        audio_file = request.files['audio']

        # Save the audio file to a temporary location
        audio_path = '/tmp/user_audio.mp3'
        audio_file.save(audio_path)

        # Modify the subprocess command to include the audio file as a parameter
        result = subprocess.run(['python3', 'main.py', audio_path], check=True, capture_output=True, text=True)
        output = result.stdout
        #
        # Run the Python script and redirect stdout to a file
        output_path = 'output.txt'
        # with open(output_path, 'w') as output_file:
        #     result = subprocess.run(['python3', 'main.py', audio_path], check=True, stdout=output_file, text=True)
        # output = result.stdout
        #

        with open(output_path,'w') as output_file:
            output_file.write(output)

        deepltranslate.translatedoc(output_path)


        return jsonify({'success': True, 'output': output})
    except subprocess.CalledProcessError as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
