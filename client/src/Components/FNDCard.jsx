import React, { useState } from 'react';
import '../StyleSheets/FNDCard.css';
import { predictFromText, predictFromURL } from '../Utils/Api';
import { showNotification } from "../Components/Notification";

// importing some svg icons 
import SearchIcon from '../Assets/Icons/Search Icon.svg?react';
import ArticleIcon from '../Assets/Icons/Article Icon.svg?react';
import LinkIcon from '../Assets/Icons/Link Icon.svg?react';

const FNDCard = ({ setResult }) => {
    const [activeTab, setActiveTab] = useState('article');
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!inputText.trim()) return showNotification("Enter a valid input!");

        setLoading(true);
        try {
            let result;
            if (activeTab === 'article') {
                result = await predictFromText(inputText);
            } else {
                result = await predictFromURL(inputText);
            }

            setResult(result);
            setInputText('');
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fnd-wrapper">
            <div className="fnd-card">
                <div className="fnd-header">
                    <SearchIcon className="icon" />
                    <h3>Check News Authenticity</h3>
                </div>

                <div className="tab-buttons">
                    <button
                        className={activeTab === 'article' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('article')}
                    >
                        <ArticleIcon className="icon" /> Article Content
                    </button>

                    <button
                        className={activeTab === 'url' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('url')}
                    >
                        <LinkIcon className="icon" /> URL
                    </button>
                </div>

                {activeTab === 'article' ? (
                    <textarea
                        className="fnd-textarea"
                        placeholder="Paste the news article content here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                ) : (
                    <input
                        type="text"
                        className="fnd-input"
                        placeholder="Paste the article URL here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                )}

                <button className="check-btn" onClick={handleCheck} disabled={loading}>
                    <i className="fas fa-shield-alt btn-icon"></i>
                    {loading ? 'Checking...' : 'Check Authenticity'}
                </button>
            </div>
        </div>
    );

};

export default FNDCard;
