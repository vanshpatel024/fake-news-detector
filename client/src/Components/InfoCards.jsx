import React from 'react';
import '../StyleSheets/InfoCards.css';

const infoList = [
  {
    icon: "fas fa-exclamation-triangle",
    title: "Avoid Ad-heavy URLs",
    desc: "Try to provide article URLs with minimal ads. Advertisements may inject unrelated text, reducing prediction accuracy.",
  },
  {
    icon: "fas fa-lightbulb",
    title: "AI is Domain-Specific",
    desc: "This AI model has been trained primarily on political and news-related content. Its accuracy may be limited for other domains.",
  },
  {
    icon: "fas fa-brain",
    title: "How the AI Works",
    desc: "The model uses natural language processing (NLP) to analyze the article's text and detect patterns that may indicate fake or real news.",
  },
];

function InfoCards() {
  return (
    <div className="info-cards-scroll-wrapper">
      <div className="info-cards-container">
        {infoList.map((card, index) => (
          <div className="info-card" key={index}>
            <h3><i className={card.icon}></i> {card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoCards;
