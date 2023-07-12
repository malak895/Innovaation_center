import random
import torch
import os
import json
import pymongo
import datetime
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import speech_recognition as sr
import pyttsx3
from bson.objectid import ObjectId

# Connection to the MongoDB 
client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
db = client["chatbot"]
collection = db["conversation"]
reaction = {
    ":wave:": "👋",
    ":grinning:": "😀",
    ":smiley:": "🙂",
    ":blush:": "😊"
}
#  save a conversation in the MongoDB database
def saveConversation(conversation):
    conversation["_id"] = ObjectId() 
    collection.insert_one(conversation)
    print("Conversation saved successfully")

app = Flask(__name__)
CORS(app)
app.config['CORS_ALLOW_ORIGINS'] = ['http://localhost:4200']

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE, map_location=torch.device('cpu'))
input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]
model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

conversation_history = []

@app.route("/vmessage", methods=["POST"])
def send_vmessage():
    if request.files and "audio" in request.files:
        audio_file = request.files["audio"]
        audio_file.save("user_audio.wav")
        prompt = recognize_speech("user_audio.wav")
    else:
        prompt = request.json.get("prompt", "").lower()

    message = prompt
    message = tokenize(message)
    X = bag_of_words(message, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)
    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]
    robs = torch.softmax(output, dim=1)
    prob = robs[0][predicted.item()]
    response_text = ""

    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                response_text = random.choice(intent['responses'])
                response_text = f" {response_text}"
                # Replace emoji text with corresponding emojis
                for emoji_text, emoji in reaction.items():
                    response_text = response_text.replace(emoji_text, emoji)
                break
    if response_text == "":
        # Use conversation history 
        conversation_history.append(message)
        conversation_history_text = ' '.join(map(str, conversation_history[-3:]))
        response_text = "Hello"

    date = datetime.datetime.now()
    conversation = {
        "message": message,
        "bot": response_text,
        "date": date,
    }

    saveConversation(conversation)

   
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)  #  for an English accent
    engine.say(response_text)
    engine.runAndWait()

    return jsonify({'bot_response': response_text})


def recognize_speech(audio_file):
    r = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file) as source:
            audio_text = r.record(source)
            return r.recognize_google(audio_text, language="en-US")
    except sr.UnknownValueError:
        return ""
    except sr.RequestError:
        return ""

if __name__ == "__main__":
    app.run()
