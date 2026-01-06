import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ExplorePopup.css';
import andhraLogoV2 from '../../assets/images/andhra-logo-v2.png';
import alley91Grid1V2 from '../../assets/images/alley91-grid-1-v2.png';
import alley91Grid2V2 from '../../assets/images/alley91-grid-2-v2.png';
import alley91Grid3V2 from '../../assets/images/alley91-grid-3-v2.png';
import alley91Grid4V2 from '../../assets/images/alley91-grid-4-v2.png';
import alley91Grid5V2 from '../../assets/images/alley91-grid-5-v2.png';
import alley91Grid6V2 from '../../assets/images/alley91-grid-6-v2.png';

const ExplorePopup = ({ onClose }) => {
    // Lock body scroll on mount
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.position = '';
        };
    }, []);

    // Placeholder images for sections (Using existing assets to ensure loading)
    // Structure matches the reference image layout
    const storeBrandingImages = [alley91Grid1V2, alley91Grid2V2, alley91Grid3V2];
    const printCollateralImages = [alley91Grid4V2, alley91Grid5V2];
    const menuDesignImages = [alley91Grid6V2, alley91Grid1V2];

    // Use React Portal to render at the document body level, ensuring it's on top of everything
    return ReactDOM.createPortal(
        <div className="explore-popup-overlay" onClick={onClose}>
            <div className="explore-popup-content" onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <button className="explore-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="18" y1="18" x2="6" y2="6"></line>
                    </svg>
                </button>

                {/* Scrollable Content Area */}
                <div className="explore-scroll-area">

                    {/* Header */}
                    <div className="explore-header">
                        <img src={andhraLogoV2} alt="Andhra Canteen" className="explore-logo" />
                        <p className="explore-description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>

                    {/* Section 1: In-Store Branding (3 cols) */}
                    <div className="explore-section">
                        <h3 className="explore-section-title">in-store branding</h3>
                        <div className="gallery-grid grid-cols-3">
                            {storeBrandingImages.map((img, index) => (
                                <img key={index} src={img} alt={`In-store branding ${index + 1}`} className="gallery-image" />
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Print Collateral (2 cols) */}
                    <div className="explore-section">
                        <h3 className="explore-section-title">print collateral</h3>
                        <div className="gallery-grid grid-cols-2">
                            {printCollateralImages.map((img, index) => (
                                <img key={index} src={img} alt={`Print collateral ${index + 1}`} className="gallery-image" />
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Menu Designs (2 cols) */}
                    <div className="explore-section">
                        <h3 className="explore-section-title">menu designs</h3>
                        <div className="gallery-grid grid-cols-2">
                            {menuDesignImages.map((img, index) => (
                                <img key={index} src={img} alt={`Menu design ${index + 1}`} className="gallery-image" />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
};

export default ExplorePopup;
