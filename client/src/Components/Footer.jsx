import React from 'react';
import '../StyleSheets/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <span>© 2025 Fake News Detector. All rights reserved.</span>
            </div>
            <div className="footer-center">
                <span className="footer-link">Privacy Policy</span>
                <span className="footer-link">Terms of Service</span>
                <span className="footer-link">Contact</span>
            </div>
            <div className="footer-right">
                <a href="https://www.linkedin.com/in/vansh-patel-6b94462b0/" aria-label="LinkedIn (placeholder)">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/vanshpatel024/fake-news-detector" aria-label="GitHub (placeholder)">
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
