import joblib
import os

model = joblib.load(os.path.join(os.path.dirname(__file__), "../main_model.pkl"))

def predict_fake_news(text):
    prediction = model.predict([text])[0]
    prob = model.predict_proba([text])[0].max()
    return prediction, prob
