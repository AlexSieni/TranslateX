import whisper # import openai library
import csv # import csv libary
model = whisper.load_model("base") # loads model
result = model.transcribe("medium.mp3") # audio input into model and returns text 
f = open('text.csv', 'w') # opens pre-existing csv file using path
writer = csv.writer(f) # creates writer of csv
data = [result["text"]] # converts output to different data type for convenience purposes
writer.writerow(data) # writes data to csv file
