import pickle
from sklearn.feature_extraction.text import CountVectorizer

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

# Sample text for testing
sample_reviews = [
    "The movie wasn't good at all",
    
]

# Test the model with sample text
for review in sample_reviews:
    sentiment_probability = predict_sentiment(review)
    print(f"Review: '{review}'")
    print(f"Sentiment Probability: {sentiment_probability:.2f}\n")
