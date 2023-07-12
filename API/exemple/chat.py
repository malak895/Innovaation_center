import random
import openai
import torch
import os
import json
import pymongo
import datetime
import emoji
import re
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
from flask import Flask, jsonify, request
from flask_cors import CORS
from emoji import emojize
from bson.objectid import ObjectId
from bson.errors import InvalidId
from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from random import randint

from ursina import *

from ursina.prefabs.first_person_controller import FirstPersonController


# Connexion à la base de données MongoDB
client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
db = client["chatbot"]
collection = db["conversation"]

# Enregistrer unea conversation dans MongoDB
def saveConversation(conversation):
    collection.insert_one(conversation)
    print("Conversation saved successfully")

app = Flask(__name__)
CORS(app)
app.config['CORS_ALLOW_ORIGINS'] = ['http://localhost:4200']

openai.api_key = "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"
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)


emoji_list = {
    ":wave:": "👋",
    ":grinning:": "😀",
    ":smiley:": "🙂",
    ":blush:": "😊"
}

def replace_emoji(text):
    print("Input:", text)
    for emoji_text, emoji_real in emoji_list.items():
        text = text.replace(emoji_text, emoji_real)
    print("Output:", text)
    return text


def saveConversationToFile(conversation, filepath):
    with open(filepath, 'a') as f:
        json.dump(conversation, f)
        f.write('\n')

def isConversationSaved(conversation, filepath):
    with open(filepath, 'r') as f:
        for line in f:
            if json.loads(line) == conversation:
                return True
    return False

@app.route('/save-conversation', methods=['POST'])
def saveConversationToDB():
    conversation = request.get_json()
    saveConversation(conversation)
    return jsonify({'status': 'Conversation saved successfully'})

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


conversation_history = []

@app.route("/message", methods=["POST"])
def send_message():
    prompt = request.get_json()["prompt"]
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
                break
    if response_text == "":
        
        conversation_history.append(prompt)
        conversation_history_text = ' '.join(conversation_history[-3:])
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=conversation_history_text,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
            stop=[" You:", " Chatty:"]
        )
        response_text = response.choices[0].text

    response_text = replace_emoji(response_text)
    emoji_choice = random.choice(list(emoji_list.values()))

    date = datetime.datetime.now()
    conversation = {
        "_id": str(ObjectId()),  
        "message": message,
        "bot": response_text,
        "date": date.isoformat(),  
        "like": 0,
        "dislike": 0
    }

    collection.insert_one(conversation)  # Insérer MongoDB

    return jsonify({'bot_response': response_text})

@app.route('/like-message/<message_id>', methods=['PUT'])
def likeMessage(message_id):
    try:
        object_id = ObjectId(message_id)
        result = collection.update_one({'_id': object_id}, {'$inc': {'like': 1}})
        if result.modified_count == 1:
            return jsonify({'status': 'Message liked successfully'})
        else:
            return jsonify({'error': 'Failed to like message'})
    except InvalidId:
        return jsonify({'error': 'Invalid message_id'})

@app.route('/dislike-message/<message_id>', methods=['PUT'])
def dislikeMessage(message_id):
    try:
        object_id = ObjectId(message_id)
        result = collection.update_one({'_id': object_id}, {'$inc': {'dislike': 1}})
        if result.modified_count == 1:
            return jsonify({'status': 'Message disliked successfully'})
        else:
            return jsonify({'error': 'Failed to dislike message'})
    except InvalidId:
        return jsonify({'error': 'Invalid message_id'})
    

@app.route('/save-intents', methods=['POST'])
def save_intents():
    intents = request.get_json()

    with open('C:/Users/Malek/Desktop/Innovaation_center/API/exemple/intents.json', 'r+') as f:
        data = json.load(f)  # Charger le contenu JSON existant

        data['intents'].append(intents)  # Ajouter le nouvel d'intention 

        f.seek(0)  # Revenir au début du fichier
        json.dump(data, f, indent=4)  # Réécrire le contenu JSON avec le nouvel objet d'intention ajouté
        f.truncate()  # Tronquer le reste du fichier  données supplémentaires


    return jsonify({'message': 'Intents saved successfully'})



@app.route('/getIntents', methods=['GET'])
def getIntents():
    with open('C:/Users/Malek/Desktop/Innovaation_center/API/exemple/intents.json', 'r') as f:
        data = json.load(f)
        intents = data['intents']
    return jsonify(intents)

@app.route('/feedback', methods=['POST'])
def handleFeedback():
    feedback = request.get_json()
    message_id = feedback.get('message_id')
    feedback_type = feedback.get('feedback_type')

    if message_id and feedback_type:
        if feedback_type == 'like':
            return likeMessage(message_id)
        elif feedback_type == 'dislike':
            return dislikeMessage(message_id)

    return jsonify({'error': 'Invalid feedback'})


@app.route('/most_common_message', methods=['GET'])
def get_most_common_message():
    messages = []
    for message in collection.find():
        if 'message' in message:
            messages.append(message['message'])

    flattened_messages = [' '.join(msg) if isinstance(msg, list) else msg for msg in messages]
    df = pd.DataFrame({'message': flattened_messages})
    vectorizer = CountVectorizer()
    features = vectorizer.fit_transform(df['message'])
    cosine_sim_matrix = cosine_similarity(features)
    most_common_index = cosine_sim_matrix.sum(axis=0).argmax()
    most_common_message = df.loc[most_common_index, 'message']
    return jsonify({'most_common_message': most_common_message})

@app.route('/most_common_bot', methods=['GET'])
def get_most_common_bot():
    messages = []
    for bot in collection.find():
        if 'bot' in bot:
            messages.append(bot['bot'])

    df = pd.DataFrame({'message': messages})
    vectorizer = CountVectorizer()
    features = vectorizer.fit_transform(df['message'])
    cosine_sim_matrix = cosine_similarity(features)
    most_common_index = cosine_sim_matrix.sum(axis=0).argmax()
    most_common_message = df.loc[most_common_index, 'message']
    bot_response = process_message(most_common_message)
    return jsonify({'most_common_bot': most_common_message, 'bot_response': bot_response})


def process_message(message):
    return "Hello, thanks for visiting"


@app.route('/deleteIntent', methods=['OPTIONS', 'POST'])
def delete_intent():
    if request.method == 'OPTIONS':
      
        return '', 200

    intent = request.get_json()
    tag_to_delete = intent.get('tag')

    if not tag_to_delete:
        return jsonify({'message': 'Invalid request data'}), 400

    with open('intents.json', 'r+') as json_file:
        data = json.load(json_file)
        intents = data['intents']

        intents[:] = [intent for intent in intents if intent.get('tag') != tag_to_delete]

        json_file.seek(0)
        json.dump(data, json_file, indent=4)
        json_file.truncate()

    return jsonify({'message': 'Intent deleted successfully'})

@app.route('/editIntent', methods=['OPTIONS', 'PUT'])
def editIntent():
    if request.method == 'OPTIONS':
        return '', 200

    intent_data = request.get_json()

    if not intent_data:
        return jsonify({'message': 'Invalid request data'}), 400

    tag_to_update = intent_data.get('tag')
    new_patterns = intent_data.get('patterns')
    new_responses = intent_data.get('responses')

    if not tag_to_update or not new_patterns or not new_responses:
        return jsonify({'message': 'Invalid request data'}), 400

    with open('intents.json', 'r+') as json_file:
        data = json.load(json_file)
        intents = data['intents']

        for intent in intents:
            if intent.get('tag') == tag_to_update:
                intent['patterns'] = new_patterns
                intent['responses'] = new_responses
                break

        json_file.seek(0)
        json.dump(data, json_file, indent=4)
        json_file.truncate()

    return jsonify({'message': 'Intent updated successfully'})


previous_game = None

@app.route('/play_game', methods=['POST'])
def play_game():
    global previous_game
    print('Game started')

    game_scripts = ['game2.py', 'tictactoeai.py']
    
    game = random.choice(game_scripts)
    while game == previous_game:
        game = random.choice(game_scripts)

    subprocess.Popen(['python', game])
    
    previous_game = game
    
    return 'Game started'

if __name__ == "__main__":
    app.run()
