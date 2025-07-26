# 📰 Fake News Detector

This is a full-stack web application that detects fake news from either a URL or direct text input.

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Backend:** FastAPI (Python)
- **Model:** Trained ML model using Tfidf + LogisticRegression (CV for testing)
- **Deployment:** Vercel (frontend), Render (backend)

## 🧪 Features
- Enter URL or paste article text to analyze
- See prediction label + confidence score
- Clean dark-themed UI

## 📦 Running Locally

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
uvicorn app.main:app --reload
```
