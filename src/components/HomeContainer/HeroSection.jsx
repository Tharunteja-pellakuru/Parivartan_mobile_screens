import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="title-line-1">
                        digital experiences <span className="normal-text">that</span>
                        <svg className="underline-svg" width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3" />
                        </svg>
                    </span>
                    <span className="title-line-2">build brands, not just websites.</span>
                </h1>

                <button className="cta-button">
                    get free website audit
                </button>

                <a href="#portfolio" className="portfolio-link">
                    view portfolio
                    <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default HeroSection;
