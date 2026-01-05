import React, { useState, useRef, useEffect } from 'react';
import './ServicesShowcase.css';
import andhraLogo from '../../assets/images/andhra-canteen-logo.png';
import sudhaLogo from '../../assets/images/sudha-logo.png';
import brochureImg from '../../assets/images/service-sudha-brochure-new.png';
import alley91Logo from '../../assets/images/alley91-logo.png';
import alley91Grid1 from '../../assets/images/alley91-grid-1.png';
import alley91Grid2 from '../../assets/images/alley91-grid-2.png';
import alley91Grid3 from '../../assets/images/alley91-grid-3.png';
import alley91Grid4 from '../../assets/images/alley91-grid-4.png';
import alley91Grid5 from '../../assets/images/alley91-grid-5.png';
import alley91Grid6 from '../../assets/images/alley91-grid-6.png';
import summerGreenLogo from '../../assets/images/summer-green-logo.png';
import summerGreenResort from '../../assets/images/summer-green-resort.png';

const servicesData = [
    {
        id: 'branding',
        subtitle: 'corporate branding',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000',
        logo: andhraLogo,
        logoAlt: 'Andhra Canteen Logo',
        pill: 'in-store branding  •  print collateral  •  menu designs  •  website',
        type: 'single'
    },
    {
        id: 'sudha',
        subtitle: 'print, media, design',
        image: brochureImg,
        logo: sudhaLogo,
        logoAlt: 'Sudha Analyticals Logo',
        pill: 'brochure  •  poster  •  leaflets  •  visiting card',
        type: 'single'
    },
    {
        id: 'photoshoot',
        subtitle: 'corporate photoshoot',
        images: [alley91Grid1, alley91Grid2, alley91Grid3, alley91Grid4, alley91Grid5, alley91Grid6],
        logo: alley91Logo,
        logoAlt: "Alley Photo shoot",
        pill: 'photography  •  event  •  branding',
        type: 'grid'
    },
    {
        id: 'summer-green',
        subtitle: 'print, media, design',
        image: summerGreenResort,
        logo: summerGreenLogo,
        logoAlt: 'Summer Green Resort Logo',
        pill: 'print  •  media  •  design',
        type: 'single'
    }
];

const ServicesShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState(null); // 'up' (next) or 'down' (prev)
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartY = useRef(0);

    const handleNext = () => {
        if (isAnimating) return;

        // If at the last service, attempt to scroll to next section or stop
        if (activeIndex === servicesData.length - 1) {
            const nextSection = document.getElementById('dummy-section-container'); // Or whatever the next section ID is
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
            return; // STOP here regardless of whether nextSection exists
        }

        setDirection('up'); // Content moving up (entering from bottom)
        setPrevIndex(activeIndex);
        setIsAnimating(true);
        setActiveIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (isAnimating) return;

        // If at the first service, scroll up to the previous section
        if (activeIndex === 0) {
            const prevSection = document.getElementById('portfolio-section-container');
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }

        setDirection('down'); // Content moving down (entering from top)
        setPrevIndex(activeIndex);
        setIsAnimating(true);
        setActiveIndex((prev) => prev - 1);
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setDirection(null);
            }, 600); // Match CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleWheel = (e) => {
        if (isAnimating) return;

        // e.deltaY > 0 is scroll DOWN -> want NEXT
        // e.deltaY < 0 is scroll UP -> want PREV
        if (Math.abs(e.deltaY) > 10) {
            if (e.deltaY > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
    };

    const handleTouchMove = (e) => {
        // Prevent default browser scrolling when swiping inside this component
        if (e.cancelable) e.preventDefault();
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        // deltaY > 0 is Swipe UP -> want NEXT section/item
        // deltaY < 0 is Swipe DOWN -> want PREV section/item
        if (Math.abs(deltaY) > 30) {
            if (deltaY > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
    };

    const currentService = servicesData[activeIndex];
    const previousService = prevIndex !== null ? servicesData[prevIndex] : null;

    return (
        <section
            className="services-showcase"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="services-header-fixed">
                <h2 className="services-title">
                    <span className="title-line">while delivering</span>
                    <span className="title-line highlighted">
                        outstanding branding
                        <svg className="header-underline" width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3"/>
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
                                <button className="nav-arrow left" aria-label="Previous image">
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

                                <button className="nav-arrow right" aria-label="Next image">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                        <div className="services-pill-bar">
                            <p className="pill-content">{currentService.pill}</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ServicesShowcase;
