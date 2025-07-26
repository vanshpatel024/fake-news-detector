import React, { useEffect, useState } from 'react';
import '../StyleSheets/ResultCard.css';

function ResultCard({ result }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (result) {
      setAnimate(true);
    }
  }, [result]);

  if (!result) return null;

  const isFake = result.prediction?.toLowerCase() === 'fake';

  return (
    <div className={`result-card ${animate ? 'result-card-animate' : ''}`}>
      <h2>Prediction Result</h2>

      {result.title && <h4>Title: {result.title}</h4>}
      {result.content && (
        <p className="article-content">
          <b>Content:</b> {result.content}
        </p>
      )}

      <div className={`prediction-tag ${isFake ? 'fake' : 'real'}`}>
        {result.prediction?.toUpperCase() || 'UNKNOWN'}
      </div>

      <p>
        <strong>Confidence:</strong> {result.confidence}%
      </p>
      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{ width: `${result.confidence}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ResultCard;
