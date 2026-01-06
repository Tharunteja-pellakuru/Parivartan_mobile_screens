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
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000',
        logo: andhraLogoV2,
        logoAlt: 'Andhra Canteen Logo',
        pill: 'in-store branding  •  print collateral  •  menu designs  •  website',
        type: 'single'
    },
    {
        id: 'sudha',
        subtitle: 'print, media, design',
        image: sudhaBrochureV2,
        logo: sudhaLogoV2,
        logoAlt: 'Sudha Analyticals Logo',
        pill: 'brochure  •  poster  •  leaflets  •  visiting card',
        type: 'single'
    },
    {
        id: 'photoshoot',
        subtitle: 'corporate photoshoot',
        images: [alley91Grid1V2, alley91Grid2V2, alley91Grid3V2, alley91Grid4V2, alley91Grid5V2, alley91Grid6V2],
        logo: alley91LogoV2,
        logoAlt: "Alley Photo shoot",
        pill: 'photography  •  event  •  branding',
        type: 'grid'
    },
    {
        id: 'summer-green',
        subtitle: 'print, media, design',
        image: summerGreenResortV2,
        logo: summerGreenLogoV2,
        logoAlt: 'Summer Green Resort Logo',
        pill: 'print  •  media  •  design',
        type: 'single'
    }
];

const ServicesShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

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

    const handleNext = useCallback(() => {
        if (isAnimatingRef.current) return;
        if (activeIndexRef.current >= servicesData.length - 1) return;

        setDirection('up');
        setPrevIndex(activeIndexRef.current);
        setIsAnimating(true);
        setActiveIndex((prev) => prev + 1);
    }, []);

    const handlePrev = useCallback(() => {
        if (isAnimatingRef.current) return;
        if (activeIndexRef.current <= 0) return;

        setDirection('down');
        setPrevIndex(activeIndexRef.current);
        setIsAnimating(true);
        setActiveIndex((prev) => prev - 1);
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

    // Touch Start Handler (passive is fine here, we just need start coords)
    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
    };

    // The core logic for scroll locking and interaction
    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        // Helper to check if component is centered in viewport
        const isCenteredInViewport = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Relaxed threshold: 30% of viewport height (easier to catch)
            const threshold = viewportHeight * 0.3;

            // Also check if element effectively covers the main interaction area
            // (Top is near or above top edge, Bottom is near or below bottom edge)
            const coversScreen = rect.top <= viewportHeight * 0.2 && rect.bottom >= viewportHeight * 0.8;

            return Math.abs(elementCenter - viewportCenter) < threshold || coversScreen;
        };

        const handleWheelNonPassive = (e) => {
            if (!isCenteredInViewport()) return;

            const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
            if (!isVerticalScroll) return;

            const currentIndex = activeIndexRef.current;
            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            // Boundary checks
            if (isScrollingDown && currentIndex >= servicesData.length - 1) return; // Release to page scroll
            if (isScrollingUp && currentIndex <= 0) return; // Release to page scroll

            // If we are here, we are interacting with the carousel
            // Prevent default page scroll
            if (e.cancelable) e.preventDefault();

            // Trigger navigation (debounce could be added if needed, but simple check works)
            if (Math.abs(e.deltaY) > 10) {
                if (isScrollingDown) handleNext();
                else handlePrev();
            }
        };

        const handleTouchMoveNonPassive = (e) => {
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = touchStartY.current - touchY; // Positive = swipe up (scroll down)
            const deltaX = touchStartX.current - touchX;

            // Directional Locking: Only care if mostly vertical swipe
            if (Math.abs(deltaY) < Math.abs(deltaX) || Math.abs(deltaY) < 5) return;

            if (!isCenteredInViewport()) return;

            const currentIndex = activeIndexRef.current;
            const isSwipingUp = deltaY > 0; // Finger moves up, content moves up (Next)
            const isSwipingDown = deltaY < 0; // Finger moves down, content moves down (Prev)

            // Boundary Checks
            if (isSwipingUp && currentIndex >= servicesData.length - 1) return; // Release
            if (isSwipingDown && currentIndex <= 0) return; // Release

            // Lock scroll
            if (e.cancelable) e.preventDefault();
        };

        const handleTouchEndNonPassive = (e) => {
            if (!isCenteredInViewport()) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY.current - touchEndY;

            // Only trigger if we prevented default (meaning we locked it), or just purely based on logic
            // To be safe, re-check boundaries and magnitude
            const currentIndex = activeIndexRef.current;
            const isSwipingUp = deltaY > 0;
            const isSwipingDown = deltaY < 0;

            if (Math.abs(deltaY) > 40) { // Minimum swipe distance
                if (isSwipingUp && currentIndex < servicesData.length - 1) {
                    handleNext();
                } else if (isSwipingDown && currentIndex > 0) {
                    handlePrev();
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
                                {previousService.type === 'grid' ? (
                                    <div className="work-grid-wrapper">
                                        {previousService.images.map((img, index) => (
                                            <div key={index} className="grid-item">
                                                <img src={img} alt={`${previousService.subtitle} ${index + 1}`} className="featured-image-grid" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="work-image-wrapper">
                                        <img src={previousService.image} alt={previousService.subtitle} className="featured-image" />
                                    </div>
                                )}
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
                            {currentService.type === 'grid' ? (
                                <div className="work-grid-wrapper">
                                    {currentService.images.map((img, index) => (
                                        <div key={index} className="grid-item">
                                            <img src={img} alt={`${currentService.subtitle} ${index + 1}`} className="featured-image-grid" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="work-image-wrapper">
                                    <img src={currentService.image} alt={currentService.subtitle} className="featured-image" />
                                </div>
                            )}
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
