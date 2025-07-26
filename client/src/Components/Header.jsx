import React from 'react';
import '../StyleSheets/Header.css';
import IconImage from '../Assets/Icons/Icon.png'; // ← Import PNG image

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={IconImage} alt="App Icon" className="icon" />
                <span className="app-name">Fake News Detector</span>
            </div>
        </header>
    );
}

export default Header;
