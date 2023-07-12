import speech_recognition
import pyttsx3 as tts
import sys
import os
import json
from neuralintents import GenericAssistant
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_ALLOW_ORIGINS'] = ['http://localhost:4200']
CORS(app)

# Set up paths and variables
script_dir = os.path.dirname(__file__)
intents_path = os.path.join(script_dir, 'intents.json')
recognizer = speech_recognition.Recognizer()
speaker = tts.init()
speaker.setProperty('rate', 150)
todo_list = ['Go Shopping', 'Clean Room']

# Helper functions for the voice assistant
def create_note():
    global recognizer
    speaker.say("What do you want to write onto your note?")
    speaker.runAndWait()

    done = False
    while not done:
        try:
            with speech_recognition.Microphone() as mic:
                recognizer.adjust_for_ambient_noise(mic, duration=0.2)
                audio = recognizer.listen(mic)

                note = recognizer.recognize_google(audio)
                note = note.lower()

                speaker.say("Choose a filename!")
                speaker.runAndWait()

                recognizer.adjust_for_ambient_noise(mic, duration=0.2)
                audio = recognizer.listen(mic)

                filename = recognizer.recognize_google(audio)
                filename = filename.lower()

                with open(filename, 'w') as f:
                    f.write(note)
                    done = True
                    speaker.say(f"I successfully created the note {filename}")
                    speaker.runAndWait()
        except speech_recognition.UnknownValueError:
            recognizer = speech_recognition.Recognizer()
            speaker.say("I didn't understand you! Please try again!")
            speaker.runAndWait()

def add_todo():
    global recognizer

    speaker.say("What todo do you want to add!")
    speaker.runAndWait()
    done = False
    while not done:
        try:
            with speech_recognition.Microphone() as mic:
                audio = recognizer.listen(mic)

                item = recognizer.recognize_google(audio)
                item = item.lower()
                todo_list.append(item)
                done = True

                speaker.say(f"I added {item} to the to do list!")
                speaker.runAndWait()

        except speech_recognition.UnknownValueError:
            recognizer = speech_recognition.Recognizer()
            speaker.say("I didn't understand you! Please try again!")
            speaker.runAndWait()

def show_todos():
    speaker.say("The items on your to do list are the following!")
    for item in todo_list:
        speaker.say(item)
    speaker.runAndWait()

def hello():
    speaker.say("Hello. What can I do for you?")
    speaker.runAndWait()

def quit():
    speaker.say("Goodbye!")
    speaker.runAndWait()
    sys.exit(0)

# Define intent mappings for the voice assistant
mappings = {
    "greeting": hello,
    "create_note": create_note,
    "add_todo": add_todo,
    "show_todos": show_todos,
    "exit": quit
}

# Create the voice assistant and train it on the intents in the intents file
assistant = GenericAssistant(intents_path, intent_methods=mappings)
assistant.train_model()

# Define the endpoint for the voice assistant API
@app.route('/assistant', methods=['POST'])
def handle_assistant_request():
    global todo_list
    global recognizer

    # Parse the JSON payload from the request
    data = json.loads(request.data)
    message = data.get('message', '').lower()
    try:
        with speech_recognition.Microphone() as mic:
            recognizer.adjust_for_ambient_noise(mic, duration=0.2)
            audio = recognizer.listen(mic)

            message = recognizer.recognize_google(audio)
            message = message.lower()
            assistant.request(message)
    except speech_recognition.UnknownValueError:
        recognizer = speech_recognition.Recognizer()

    # return the response from the voice assistant as a JSON payload
    response = {
        'message': ' '.join(assistant.context['answer']),
        'todo_list': todo_list
    }
    return json.dumps(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
