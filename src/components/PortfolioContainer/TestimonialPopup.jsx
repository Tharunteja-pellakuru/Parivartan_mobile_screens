import React from 'react';
import './TestimonialPopup.css';

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
                        {/* Decorative Swirls - Positioned to wrap around the bubble */}
                        <div className="decoration-swirls">
                            <svg className="swirl swirl-left" width="250" height="280" viewBox="0 0 250 280">
                                <path d="M190,40 C100,60 20,160 80,260" fill="none" stroke="#ffc107" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                            <svg className="swirl swirl-right" width="250" height="280" viewBox="0 0 250 280">
                                <path d="M40,30 C160,50 230,150 180,250" fill="none" stroke="#ffc107" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Custom SVG Chat bubble shape */}
                        <svg className="custom-bubble-svg" width="450" height="338" viewBox="0 0 350 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_381_39951)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M174.987 252.731C86.6243 252.731 15 209.761 15 156.735C15 136.017 25.9426 116.814 44.5623 101.114C55.8077 91.6198 91.8793 55.094 145.9 15C125.183 67.5072 159.395 60.414 174.987 60.7167C263.328 62.49 334.974 103.687 334.974 156.713C334.974 209.739 263.349 252.71 174.987 252.71V252.731Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_381_39951" x="0" y="0" width="349.974" height="267.731" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="7.5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_381_39951" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_381_39951" result="shape" />
                                </filter>
                            </defs>
                        </svg>

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
