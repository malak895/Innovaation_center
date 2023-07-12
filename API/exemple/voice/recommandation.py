from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['chatbot']
collection = db['conversation']

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
if __name__ == '__main__':
    app.run(debug=True)

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
    # Add your code here to process the user's message and generate a response from the bot
    return "Hello, thanks for visiting"

