import whisper
import sys

def process_audio_file(audio_path):
    # print(f"Processing audio file at: {audio_path}")
    model = whisper.load_model("base")
    # result = model.transcribe("/Users/alexsieni/Desktop/audio.mp3")
    result = model.transcribe(audio_path)
    print(f'{result["text"]}')



if __name__ == "__main__":
    # Check if at least one command-line argument (audio file path) is provided
    if len(sys.argv) < 2:
        sys.exit(1)

    # Get the audio file path from the command-line arguments
    audio_path = sys.argv[1]

    # Call the function to process the audio file
    process_audio_file(audio_path)
