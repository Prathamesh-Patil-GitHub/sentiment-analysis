from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "<h1>Hello</h1>"



# Load the pickled model and vocabulary
model = pickle.load(open('sentiment.pkl', 'rb'))
vocabulary = pickle.load(open('vocabulary.pkl', 'rb'))

def predict_sentiment(review):
    # Vectorize the review using the loaded vocabulary
    vectorizer = CountVectorizer(vocabulary=vocabulary)
    review_vectorized = vectorizer.transform([review])
    
    # Predict the sentiment probability using the loaded model
    sentiment_probability = model.predict_proba(review_vectorized)[0][1]
    
    return sentiment_probability

@app.route('/evaluate-sentiment', methods=['POST'])
def evaluate_sentiment():
    # Get the request body as JSON
    request_data = request.get_json()
    
    # Check if the request body contains the 'text' parameter
    if 'text' not in request_data:
        return jsonify({'error': 'Text parameter is missing'}), 400
    
    # Retrieve the text parameter from the request body
    text = request_data['text']
    
    sentiment_probability = predict_sentiment(text)

    # Perform sentiment analysis here (not implemented in this example)
    # In this basic example, always return 'positive'
    
    # Return the response
    return jsonify({'text' : text , 'sentiment': sentiment_probability})

if __name__ == '__main__':
    app.run(debug=True)
