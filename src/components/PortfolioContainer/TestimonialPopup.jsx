import React from 'react';
import './TestimonialPopup.css';
import popCardImage from '../../assets/images/PopCard.png';

const TestimonialPopup = ({ onClose }) => {
    return (
        <div className="testimonial-popup-overlay" onClick={onClose}>
            <div className="testimonial-popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="18" y1="18" x2="6" y2="6"></line>
                    </svg>
                </button>

                <div className="testimonial-visual-wrapper">
                    <div className="chat-bubble-container">
                        {/* PopCard.png image replaces SVG bubble and swirls */}
                        <img src={popCardImage} alt="Testimonial Card" className="pop-card-image" />

                        <div className="chat-bubble-text-content">
                            <p className="testimonial-text">
                                Our collaboration with eparivartan has been
                                nothing short of remarkable. Over the past six
                                months, we have witnessed a significant
                                enhancement in our branding efforts, a
                                testament to the dedication and expertise of
                                the eparivartan team.
                            </p>
                            <p className="testimonial-author">
                                Sanjay Kommera - CEO
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialPopup;
