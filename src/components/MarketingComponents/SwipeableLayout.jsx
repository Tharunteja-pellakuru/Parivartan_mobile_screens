import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './SwipeableLayout.module.css';
import { InstagramIcon, FacebookIcon, GoogleAdsIcon, MetaIcon } from '../common/Icons';

// Import assets
import underlineStroke from '../../assets/Vector76.svg';
import emailMarketingLogo from '../../assets/logos/Email Marketing.png';

const SwipeableLayout = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchEndY = useRef(0);
  const touchEndX = useRef(0);
  
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const minSwipeDistance = 50;
  
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const swipeDirectionRef = useRef(null); // Track if user started swiping vertically

  // Sync refs with state for use in event listeners
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);
  
  const goToNext = useCallback(() => {
    if (currentIndexRef.current < totalCards - 1 && !isTransitioningRef.current) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [totalCards]);
  
  const goToPrev = useCallback(() => {
    if (currentIndexRef.current > 0 && !isTransitioningRef.current) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, []);
  
  // Helper to check if component is centered in viewport
  const isCenteredInViewport = () => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate centers
    const viewportCenter = viewportHeight / 2;
    const componentCenter = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(componentCenter - viewportCenter);
    
    // Component is centered when within 20% of viewport height
    const centerThreshold = viewportHeight * 0.2;
    return distanceFromCenter < centerThreshold;
  };

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    swipeDirectionRef.current = null; // Reset direction
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate centers
    const viewportCenter = viewportHeight / 2;
    const componentCenter = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(componentCenter - viewportCenter);
    
    // Only capture when component is centered (within 20% of viewport height)
    const centerThreshold = viewportHeight * 0.2;
    const isCentered = distanceFromCenter < centerThreshold;
    
    if (!isCentered) return;

    const currentY = e.touches[0].clientY;  
    const currentX = e.touches[0].clientX;
    
    // Calculate deltas from start
    const totalDeltaY = Math.abs(touchStartY.current - currentY);
    const totalDeltaX = Math.abs(touchStartX.current - currentX);

    // Determine swipe direction early (after 8px movement)
    if (swipeDirectionRef.current === null && (totalDeltaY > 8 || totalDeltaX > 8)) {
      if (totalDeltaY > totalDeltaX * 1.2) {
        swipeDirectionRef.current = 'vertical';
      } else if (totalDeltaX > totalDeltaY * 1.2) {
        swipeDirectionRef.current = 'horizontal';
      }
    }

    // Only handle vertical swipes
    if (swipeDirectionRef.current === 'vertical') {
      const deltaY = touchStartY.current - currentY;
      const isSwipingUp = deltaY > 0; // Going to next card (down the page)
      const isSwipingDown = deltaY < 0; // Going to prev card (up the page)

      // Check if we're at boundaries
      const atFirstCard = currentIndexRef.current === 0;
      const atLastCard = currentIndexRef.current === totalCards - 1;

      // Only prevent scroll if we have cards available in that direction
      const canGoNext = isSwipingUp && !atLastCard;
      const canGoPrev = isSwipingDown && !atFirstCard;

      if (canGoNext || canGoPrev) {
        // We can navigate - block page scroll
        if (e.cancelable) e.preventDefault();
      }
      // At boundary: if swiping up at last card OR swiping down at first card, allow scroll
      // by not preventing default
    }
    
    touchEndY.current = currentY;
    touchEndX.current = currentX;
  }, [totalCards]);
  
  const handleTouchEnd = useCallback(() => {
    // Only process if it was a vertical swipe
    if (swipeDirectionRef.current === 'vertical') {
      const swipeDistance = touchStartY.current - touchEndY.current;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }
    
    touchStartY.current = 0;
    touchEndY.current = 0;
    swipeDirectionRef.current = null;
  }, [goToNext, goToPrev]);
  
  const handleWheel = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate centers
    const viewportCenter = viewportHeight / 2;
    const componentCenter = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(componentCenter - viewportCenter);
    
    // Only capture when component is centered (within 20% of viewport height)
    const centerThreshold = viewportHeight * 0.2;
    const isCentered = distanceFromCenter < centerThreshold;
    
    if (!isCentered) return;
    
    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    // Check if we're at boundaries
    const atFirstCard = currentIndexRef.current === 0;
    const atLastCard = currentIndexRef.current === totalCards - 1;

    // Only prevent scroll if we have cards available in that direction
    const canGoNext = isScrollingDown && !atLastCard;
    const canGoPrev = isScrollingUp && !atFirstCard;

    if (canGoNext || canGoPrev) {
      // Intercept and prevent page scroll only if we can navigate
      if (e.cancelable) e.preventDefault();
      
      // Navigate if not already transitioning and past sensitivity threshold
      if (!isTransitioningRef.current && Math.abs(e.deltaY) > 5) {
        if (isScrollingDown) goToNext();
        else goToPrev();
      }
    }
    // At boundary: allow scroll to continue by not preventing default
  }, [goToNext, goToPrev, totalCards]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Use non-passive for wheel as well to ensure preventDefault() works
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.fixedHeader}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            <span className={styles.line1}>
              Visibility where your
              <svg className={styles.underlineImage} width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3"/>
              </svg>
            </span>
            <span className={styles.line2}>audience already is</span>
          </h1>
        </div>
        <p className={styles.description}>
          By leveraging social media marketing, content strategy, and platform-specific storytelling, we assist brands in remaining relevant, consistent, and engaged across digital platforms.
        </p>
      </header>

      <div 
        className={styles.swipeArea}
        ref={containerRef}
      >
        <div className={styles.cardsWrapper}>
          {childrenArray.map((child, index) => {
            const offset = index - currentIndex;
            return (
              <div
                key={index}
                className={`${styles.card} ${offset === 0 ? styles.active : ''}`}
                style={{
                  transform: `translateY(${offset * 100}%)`,
                  opacity: offset === 0 ? 1 : 0,
                  pointerEvents: offset === 0 ? 'auto' : 'none',
                }}
              >
                {child}
              </div>
            );
          })}
        </div>

      </div>

      <footer className={styles.fixedFooter}>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>we get you social on</span>
          <div className={styles.footerIcons}>
            <div className={styles.socialIcon}><InstagramIcon /></div>
            <div className={styles.socialIcon}><FacebookIcon /></div>
          </div>
        </div>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>& promote you using</span>
          <div className={styles.footerIcons}>
            <div className={styles.toolIcon}><GoogleAdsIcon /></div>
            <div className={styles.toolIcon}><MetaIcon /></div>
            <div className={styles.toolIcon}>
              <img src={emailMarketingLogo} alt="Email Marketing" className={styles.footerIconImg} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SwipeableLayout;
