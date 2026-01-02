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
  const touchEndY = useRef(0);
  
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const minSwipeDistance = 50;
  
  const goToNext = useCallback(() => {
    if (currentIndex < totalCards - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentIndex, totalCards, isTransitioning]);
  
  const goToPrev = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentIndex, isTransitioning]);
  
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    touchEndY.current = e.touches[0].clientY;
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartY.current = 0;
    touchEndY.current = 0;
  }, [goToNext, goToPrev]);
  
  const handleWheel = useCallback((e) => {
    if (isTransitioning) return;
    
    // Check if we are at horizontal/vertical boundary
    if (e.deltaY > 0 && currentIndex < totalCards - 1) {
      e.preventDefault();
      goToNext();
    } else if (e.deltaY < 0 && currentIndex > 0) {
      e.preventDefault();
      goToPrev();
    }
    // If at last card and scrolling down, or first and scrolling up, let it bubble to page scroll
  }, [goToNext, goToPrev, isTransitioning, currentIndex, totalCards]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
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
            <span className={styles.line1}>get socially connected like</span>
            <img src={underlineStroke} alt="" className={styles.underlineImage} />
            <span className={styles.line2}>never before</span>
          </h1>
        </div>
        <p className={styles.description}>
          Through integrated digital marketing, email campaigns, and ad strategies, 
          we help you grow your brand's voice across platforms.
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

        <div className={styles.pagination}>
          {childrenArray.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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
