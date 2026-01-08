import React, { useState } from 'react';
import './PortfolioSection.css';
import mobileMockup from '../../assets/images/Mobile.png';
import mobileScrollImage from '../../assets/images/MobileImage.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import accel1LogoV2 from '../../assets/images/accel1-logo-v2.png';
import TestimonialPopup from './TestimonialPopup';
import html5Logo from '../../assets/images/html5-logo.png';
import pythonLogo from '../../assets/images/python-logo.png';
import reactLogo from '../../assets/images/react-logo.png';

const PortfolioSection = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Array of images to cycle through
    const portfolioImages = [mobileScrollImage, image2, image3];
    
    // Navigation handlers
    const handlePrevious = (e) => {
        e.stopPropagation(); // Prevent popup from opening
        setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
    };
    
    const handleNext = (e) => {
        e.stopPropagation(); // Prevent popup from opening
        setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
    };

    return (
        <div className="portfolio-section">
            <p className="portfolio-description">
                We design responsive, SEO-ready websites that form strong digital foundations, are aligned with business goals, are built for performance, and are ready to evolve as you grow.
            </p>

            <div className="mobile-showcase-wrapper" onClick={() => setIsPopupOpen(true)} style={{ cursor: 'pointer' }}>
                <div className="mobile-device-frame">
                    <img src={mobileMockup} alt="Mobile Frame" className="mobile-frame-img" />
                    <div className="mobile-screen-content">
                        <img src={portfolioImages[currentImageIndex]} alt="Project Screen" className="mobile-scroll-image" />
                    </div>
                </div>

                <div className="nav-arrows">
                    <button className="arrow-btn" onClick={handlePrevious}>‹</button>
                    <span className="company-name">
                        <img src={accel1LogoV2} alt="ACCEL1" className="company-logo" />
                    </span>
                    <button className="arrow-btn" onClick={handleNext}>›</button>
                </div>
            </div>

            <div className="tech-stack">
                <div className="tech-badge react">
                    <img src={reactLogo} alt="React" className="tech-logo" />
                </div>
                <div className="tech-badge html">
                    <img src={html5Logo} alt="HTML5" className="tech-logo" />
                </div>
                <div className="tech-badge python">
                    <img src={pythonLogo} alt="Python" className="tech-logo" />
                </div>
            </div>

            <div className="info-card">
                <div className="green-blob blob-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="34" viewBox="0 0 25 34" fill="none">
                        <path d="M24.2512 26.0611C23.6852 24.1011 21.6183 22.9636 19.6603 23.5344L10.8601 26.0905C8.90214 26.6571 7.76597 28.7262 8.33616 30.6863C8.90216 32.6463 10.9691 33.7837 12.927 33.2129L21.7273 30.6569C23.6852 30.0903 24.8214 28.0211 24.2512 26.0611Z" fill="#F4AEAE" />
                        <path d="M24.3728 10.2297C23.7481 8.07236 21.4715 6.81743 19.3123 7.44279L2.94451 12.1981C0.789529 12.8235 -0.464058 15.1025 0.160636 17.264C0.78533 19.4213 3.0619 20.6762 5.22108 20.0508L21.5889 15.2956C23.7439 14.6702 24.9975 12.3912 24.3728 10.2297Z" fill="#F4AEAE" />
                        <path d="M22.2136 2.94767C21.5889 0.790367 19.3123 -0.464556 17.1531 0.16081L3.10379 4.24037C0.948807 4.86573 -0.304754 7.14476 0.31994 9.30626C0.944634 11.4636 3.22121 12.7185 5.38038 12.0931L19.4297 8.01356C21.5847 7.38819 22.8383 5.10917 22.2136 2.94767Z" fill="#F4AEAE" />
                        <path d="M24.792 18.4938C24.1673 16.3365 21.8908 15.0816 19.7316 15.707L5.68225 19.7865C3.52726 20.4119 2.27367 22.6909 2.89837 24.8524C3.52306 27.0097 5.79963 28.2646 7.95881 27.6393L22.0081 23.5597C24.1631 22.9343 25.4167 20.6553 24.792 18.4938Z" fill="#F4AEAE" />
                    </svg>
                </div>
                <div className="green-blob blob-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="34" viewBox="0 0 25 34" fill="none">
                        <path d="M24.2512 26.0611C23.6852 24.1011 21.6183 22.9636 19.6603 23.5344L10.8601 26.0905C8.90214 26.6571 7.76597 28.7262 8.33616 30.6863C8.90216 32.6463 10.9691 33.7837 12.927 33.2129L21.7273 30.6569C23.6852 30.0903 24.8214 28.0211 24.2512 26.0611Z" fill="#F4AEAE" />
                        <path d="M24.3728 10.2297C23.7481 8.07236 21.4715 6.81743 19.3123 7.44279L2.94451 12.1981C0.789529 12.8235 -0.464058 15.1025 0.160636 17.264C0.78533 19.4213 3.0619 20.6762 5.22108 20.0508L21.5889 15.2956C23.7439 14.6702 24.9975 12.3912 24.3728 10.2297Z" fill="#F4AEAE" />
                        <path d="M22.2136 2.94767C21.5889 0.790367 19.3123 -0.464556 17.1531 0.16081L3.10379 4.24037C0.948807 4.86573 -0.304754 7.14476 0.31994 9.30626C0.944634 11.4636 3.22121 12.7185 5.38038 12.0931L19.4297 8.01356C21.5847 7.38819 22.8383 5.10917 22.2136 2.94767Z" fill="#F4AEAE" />
                        <path d="M24.792 18.4938C24.1673 16.3365 21.8908 15.0816 19.7316 15.707L5.68225 19.7865C3.52726 20.4119 2.27367 22.6909 2.89837 24.8524C3.52306 27.0097 5.79963 28.2646 7.95881 27.6393L22.0081 23.5597C24.1631 22.9343 25.4167 20.6553 24.792 18.4938Z" fill="#F4AEAE" />
                    </svg>
                </div>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500
                </p>
            </div>

            {/* Testimonial Popup Component */}
            {isPopupOpen && <TestimonialPopup onClose={() => setIsPopupOpen(false)} />}
        </div>
    );
};

export default PortfolioSection;
