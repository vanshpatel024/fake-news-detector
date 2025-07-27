from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model.predictor import predict_fake_news
from app.model.fetcher import fetch_article_content

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
]

print("CORS_ORIGINS loaded:", origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

class TextRequest(BaseModel):
    text: str

@app.post("/predict/url")
def predict_from_url(request: URLRequest):
    title, content = fetch_article_content(request.url)
    if content:
        label, confidence = predict_fake_news(content)
        return {
            "title": title,
            "content": content[:800] + "...",
            "prediction": label,
            "confidence": round(confidence * 100, 2)
        }
    return {"error": "Could not extract content from the URL."}

@app.post("/predict/text")
def predict_from_text(request: TextRequest):
    if not request.text.strip():
        return {"error": "Empty article content provided."}
    
    label, confidence = predict_fake_news(request.text)
    return {
        "content": request.text[:800] + "...",
        "prediction": label,
        "confidence": round(confidence * 100, 2)
    }
