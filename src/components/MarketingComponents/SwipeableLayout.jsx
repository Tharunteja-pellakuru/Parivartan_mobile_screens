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

  // Interaction Refs
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchEndY = useRef(0);
  const touchEndX = useRef(0);

  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const wheelDeltaAccumulatorRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);
  const swipeDirectionRef = useRef(null); // Track vertical vs horizontal swipes

  // Sync refs with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    const now = Date.now();
    if (currentIndexRef.current < totalCards - 1 && !isTransitioningRef.current && (now - lastInteractionTimeRef.current > 800)) {
      isTransitioningRef.current = true;
      lastInteractionTimeRef.current = now;
      currentIndexRef.current += 1;
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      }, 600);
    }
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    const now = Date.now();
    if (currentIndexRef.current > 0 && !isTransitioningRef.current && (now - lastInteractionTimeRef.current > 800)) {
      isTransitioningRef.current = true;
      lastInteractionTimeRef.current = now;
      currentIndexRef.current -= 1;
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      }, 600);
    }
  }, []);

  const isLockedRef = useRef(false);

  // Wheel Scroll Handler
  useEffect(() => {
    const onScroll = (e) => {
      if (!isLockedRef.current) return;

      const now = Date.now();
      const isCoolingDown = (now - lastInteractionTimeRef.current) < 800;

      if (isTransitioningRef.current || isCoolingDown) {
        if (e.cancelable) e.preventDefault();
        wheelDeltaAccumulatorRef.current = 0;
        return;
      }

      const currentIndex = currentIndexRef.current;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Handle Page Scroll Release at Boundaries
      const atBottomBoundary = currentIndex === totalCards - 1 && isScrollingDown;
      const atTopBoundary = currentIndex === 0 && isScrollingUp;

      if (atBottomBoundary || atTopBoundary) {
        wheelDeltaAccumulatorRef.current = 0;
        return; // Allow natural page scroll
      }

      // Inside showcase: block page scroll and run step logic
      if (e.cancelable) e.preventDefault();
      wheelDeltaAccumulatorRef.current += e.deltaY;

      // Higher intentionality threshold
      if (Math.abs(wheelDeltaAccumulatorRef.current) >= 50) {
        if (wheelDeltaAccumulatorRef.current > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        wheelDeltaAccumulatorRef.current = 0;
      }
    };

    window.addEventListener('wheel', onScroll, { passive: false });
    return () => window.removeEventListener('wheel', onScroll);
  }, [goToNext, goToPrev, totalCards]);

  // Intersection Observer for Locking
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasLocked = isLockedRef.current;
        isLockedRef.current = entry.isIntersecting;

        // Reset state on entry
        if (entry.isIntersecting && !wasLocked) {
          const rect = entry.boundingClientRect;
          wheelDeltaAccumulatorRef.current = 0;

          // Direction-aware entry
          if (rect.top < -50) {
            setCurrentIndex(totalCards - 1);
            currentIndexRef.current = totalCards - 1;
          } else {
            setCurrentIndex(0);
            currentIndexRef.current = 0;
          }
        }
      },
      {
        threshold: 0.8,
        rootMargin: "-5% 0px -5% 0px"
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [totalCards]);

  // Touch Handlers
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    swipeDirectionRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isLockedRef.current || isTransitioningRef.current) return;

    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const totalDeltaY = Math.abs(touchStartY.current - currentY);
    const totalDeltaX = Math.abs(touchStartX.current - currentX);

    // Filter for intentional swipes
    if (swipeDirectionRef.current === null && (totalDeltaY > 8 || totalDeltaX > 8)) {
      if (totalDeltaY > totalDeltaX * 1.2) {
        swipeDirectionRef.current = 'vertical';
      } else {
        swipeDirectionRef.current = 'horizontal';
      }
    }

    if (swipeDirectionRef.current === 'vertical') {
      const deltaY = touchStartY.current - currentY;
      const isSwipingUp = deltaY > 0; // Going to next
      const isSwipingDown = deltaY < 0; // Going to prev

      const atFirstCard = currentIndexRef.current === 0;
      const atLastCard = currentIndexRef.current === totalCards - 1;

      // Only block page scroll if we have cards in that direction
      if ((isSwipingUp && !atLastCard) || (isSwipingDown && !atFirstCard)) {
        if (e.cancelable) e.preventDefault();
      }
    }

    touchEndY.current = currentY;
    touchEndX.current = currentX;
  }, [totalCards]);

  const handleTouchEnd = useCallback(() => {
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

    // Reset
    touchStartY.current = 0;
    touchEndY.current = 0;
    swipeDirectionRef.current = null;
  }, [goToNext, goToPrev]);

  // Add event listeners to the component container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.fixedHeader}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            <span className={styles.line1}>
              Visibility where your
              <svg className={styles.underlineImage} width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3" />
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
