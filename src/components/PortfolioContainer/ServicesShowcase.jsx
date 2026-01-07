import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ServicesShowcase.css';
import ExplorePopup from './ExplorePopup';
import andhraLogoV2 from '../../assets/images/andhra-logo-v2.png';
import sudhaLogoV2 from '../../assets/images/sudha-logo-v2.png';
import alley91LogoV2 from '../../assets/images/alley91-logo-v2.png';
import alley91Grid1V2 from '../../assets/images/alley91-grid-1-v2.png';
import alley91Grid2V2 from '../../assets/images/alley91-grid-2-v2.png';
import alley91Grid3V2 from '../../assets/images/alley91-grid-3-v2.png';
import alley91Grid4V2 from '../../assets/images/alley91-grid-4-v2.png';
import alley91Grid5V2 from '../../assets/images/alley91-grid-5-v2.png';
import alley91Grid6V2 from '../../assets/images/alley91-grid-6-v2.png';
import summerGreenLogoV2 from '../../assets/images/summer-green-logo-v2.png';
import summerGreenResortV2 from '../../assets/images/summer-green-resort-v2.png';
import sudhaBrochureV2 from '../../assets/images/sudha-brochure-v2.png';

const servicesData = [
    {
        id: 'branding',
        subtitle: 'corporate branding',
        images: [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000',
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
        ],
        logo: andhraLogoV2,
        logoAlt: 'Andhra Canteen Logo',
        pill: 'in-store branding  •  print collateral  •  menu designs  •  website',
        type: 'gallery'
    },
    {
        id: 'sudha',
        subtitle: 'print, media, design',
        images: [
            sudhaBrochureV2,
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000',
            'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1000'
        ],
        logo: sudhaLogoV2,
        logoAlt: 'Sudha Analyticals Logo',
        pill: 'brochure  •  poster  •  leaflets  •  visiting card',
        type: 'gallery'
    },
    {
        id: 'photoshoot',
        subtitle: 'corporate photoshoot',
        images: [alley91Grid1V2, alley91Grid2V2, alley91Grid3V2, alley91Grid4V2, alley91Grid5V2, alley91Grid6V2],
        logo: alley91LogoV2,
        logoAlt: "Alley Photo shoot",
        pill: 'photography  •  event  •  branding',
        type: 'gallery'
    },
    {
        id: 'summer-green',
        subtitle: 'print, media, design',
        images: [
            summerGreenResortV2,
            'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000'
        ],
        logo: summerGreenLogoV2,
        logoAlt: 'Summer Green Resort Logo',
        pill: 'print  •  media  •  design',
        type: 'gallery'
    }
];

const ServicesShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [imageIndex, setImageIndex] = useState(0); // Track current image within service

    // Refs for state access inside event listeners
    const activeIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const sectionRef = useRef(null);

    // Touch tracking
    const touchStartY = useRef(0);
    const touchStartX = useRef(0);

    // Sync refs with state
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        isAnimatingRef.current = isAnimating;
    }, [isAnimating]);

    // Handlers for BUTTON navigation (cycle images manually)
    const handleNext = useCallback(() => {
        if (isAnimatingRef.current) return;
        const currentService = servicesData[activeIndexRef.current];
        if (currentService.images) {
            setImageIndex(prev => (prev + 1) % currentService.images.length);
        }
    }, []);

    const handlePrev = useCallback(() => {
        if (isAnimatingRef.current) return;
        const currentService = servicesData[activeIndexRef.current];
        if (currentService.images) {
            setImageIndex(prev => {
                const newIndex = prev - 1;
                return newIndex < 0 ? currentService.images.length - 1 : newIndex;
            });
        }
    }, []);
    
    // Handlers for SCROLL/SWIPE navigation (sequential flow)
    const handleNextService = useCallback(() => {
        if (isAnimatingRef.current) return;
        if (activeIndexRef.current >= servicesData.length - 1) return;

        setDirection('up');
        setPrevIndex(activeIndexRef.current);
        setIsAnimating(true);
        setActiveIndex((prev) => prev + 1);
        // Reset image index when entering a new card
        setImageIndex(0);
    }, []);

    const handlePrevService = useCallback(() => {
        if (isAnimatingRef.current) return;
        if (activeIndexRef.current <= 0) return;

        setDirection('down');
        setPrevIndex(activeIndexRef.current);
        setIsAnimating(true);
        setActiveIndex((prev) => prev - 1);
        // Reset image index when entering a new card (start from top)
        setImageIndex(0);
    }, []);

    // Animation reset timer
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setDirection(null);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);
    
    // Touch Start Handler
    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
    };

    // The core logic for sequential locking and interaction
    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const isCenteredInViewport = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            return rect.top <= viewportHeight * 0.2 && rect.bottom >= viewportHeight * 0.8;
        };

        const handleWheelNonPassive = (e) => {
            if (!isCenteredInViewport()) return;

            const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
            if (!isVerticalScroll) return;

            const currentIndex = activeIndexRef.current;
            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            // Boundary checks for locking (inter-card only)
            const canGoNext = isScrollingDown && currentIndex < servicesData.length - 1;
            const canGoPrev = isScrollingUp && currentIndex > 0;

            if (canGoNext || canGoPrev) {
                // Firmly lock scroll within the section
                if (e.cancelable) e.preventDefault();

                // Navigation between cards
                if (!isAnimatingRef.current && Math.abs(e.deltaY) > 5) {
                    if (isScrollingDown) handleNextService();
                    else handlePrevService();
                }
            }
        };

        const handleTouchMoveNonPassive = (e) => {
            if (!isCenteredInViewport()) return;

            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = touchStartY.current - touchY;
            const deltaX = touchStartX.current - touchX;

            // Strictly vertical check
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                const isSwipingUp = deltaY > 0; // Next Card
                const isSwipingDown = deltaY < 0; // Prev Card
                const currentIndex = activeIndexRef.current;

                const canGoNext = isSwipingUp && currentIndex < servicesData.length - 1;
                const canGoPrev = isSwipingDown && currentIndex > 0;

                if (canGoNext || canGoPrev) {
                    if (e.cancelable) e.preventDefault();
                }
            }
        };

        const handleTouchEndNonPassive = (e) => {
            if (!isCenteredInViewport()) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY.current - touchEndY;
            const isSwipingUp = deltaY > 0;
            const isSwipingDown = deltaY < 0;
            const currentIndex = activeIndexRef.current;

            if (Math.abs(deltaY) > 40) { // Minimum swipe distance
                if (isSwipingUp && currentIndex < servicesData.length - 1) {
                    handleNextService();
                } else if (isSwipingDown && currentIndex > 0) {
                    handlePrevService();
                }
            }
        };

        element.addEventListener('wheel', handleWheelNonPassive, { passive: false });
        element.addEventListener('touchmove', handleTouchMoveNonPassive, { passive: false });
        // We use touchend to actually trigger the state change for swipes to feel natural
        element.addEventListener('touchend', handleTouchEndNonPassive, { passive: false });

        return () => {
            element.removeEventListener('wheel', handleWheelNonPassive);
            element.removeEventListener('touchmove', handleTouchMoveNonPassive);
            element.removeEventListener('touchend', handleTouchEndNonPassive);
        };
    }, [handleNext, handlePrev]);

    const currentService = servicesData[activeIndex];
    const previousService = prevIndex !== null ? servicesData[prevIndex] : null;

    return (
        <section
            ref={sectionRef}
            className="services-showcase"
            onTouchStart={handleTouchStart}
        >
            <div className="services-header-fixed">
                <h2 className="services-title">
                    <span className="title-line">while delivering</span>
                    <span className="title-line highlighted">
                        outstanding branding
                        <svg className="header-underline" width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3" />
                        </svg>
                    </span>
                </h2>
                <p className="services-description">
                    From corporate identity to presentation design, we ensure every visual tells your story with clarity and creativity.
                </p>
            </div>

            <div className="showcase-content-fixed">
                {/* Content Layer (Subtitle, Image, Pill) */}
                <div className={`service-content-wrapper ${isAnimating ? `animating-${direction}` : ''}`}>
                    {/* Previous Content (Exiting) */}
                    {isAnimating && previousService && (
                        <div className="content-layer exit">
                            <h3 className="service-subtitle">{previousService.subtitle}</h3>
                            <div className="featured-work-container">
                                <div className="work-image-wrapper">
                                    <img src={previousService.images[0]} alt={`${previousService.subtitle}`} className="featured-image" />
                                </div>
                                <div className={`logo-display-static ${previousService.id}-logo`}>
                                    {previousService.logo && (
                                        <img src={previousService.logo} alt={previousService.logoAlt || 'Client logo'} className="client-logo" />
                                    )}
                                </div>
                            </div>
                            <div className="services-pill-bar">
                                <p className="pill-content">{previousService.pill}</p>
                            </div>
                        </div>
                    )}

                    {/* Active Content (Entering/Stationary) */}
                    <div className={`content-layer ${isAnimating ? 'enter' : 'active'}`}>
                        <h3 className="service-subtitle">{currentService.subtitle}</h3>
                        <div className="featured-work-container">
                            <div className="work-image-wrapper">
                                <img src={currentService.images[imageIndex]} alt={`${currentService.subtitle} ${imageIndex + 1}`} className="featured-image" />
                            </div>
                            <div className="logo-carousel-static">
                                <button className="nav-arrow left" aria-label="Previous image" onClick={handlePrev}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <div className={`logo-display-static ${currentService.id}-logo`}>
                                    {currentService.logo && (
                                        <img
                                            src={currentService.logo}
                                            alt={currentService.logoAlt || 'Client logo'}
                                            className="client-logo"
                                        />
                                    )}
                                </div>

                                <button className="nav-arrow right" aria-label="Next image" onClick={handleNext}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                        <div className="services-pill-bar">
                            <p className="pill-content">{currentService.pill}</p>
                        </div>
                        <button className="explore-button" onClick={() => setShowPopup(true)}>explore</button>
                    </div>
                </div>
            </div>

            {showPopup && <ExplorePopup onClose={() => setShowPopup(false)} />}
        </section>
    );
};

export default ServicesShowcase;
