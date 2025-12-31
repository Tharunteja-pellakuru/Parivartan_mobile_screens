import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './SwipeableLayout.module.css';
import headerStyles from './SocialConnect.module.css';

// Import assets
import underlineStroke from '../assets/Vector76.svg';
import emailMarketingLogo from '../assets/logos/Email Marketing.png';

// Social Icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className={headerStyles.footerIconImg}>
    <path d="M10.7188 0H3.28125C1.46907 0 0 1.46907 0 3.28125V10.7188C0 12.5309 1.46907 14 3.28125 14H10.7188C12.5309 14 14 12.5309 14 10.7188V3.28125C14 1.46907 12.5309 0 10.7188 0Z" fill="url(#inst-grad1)"/>
    <path d="M10.7188 0H3.28125C1.46907 0 0 1.46907 0 3.28125V10.7188C0 12.5309 1.46907 14 3.28125 14H10.7188C12.5309 14 14 12.5309 14 10.7188V3.28125C14 1.46907 12.5309 0 10.7188 0Z" fill="url(#inst-grad2)"/>
    <path d="M7.00049 1.53137C5.51529 1.53137 5.32886 1.53788 4.74556 1.5644C4.16336 1.59109 3.76595 1.68324 3.41824 1.81848C3.05851 1.95815 2.75341 2.14502 2.44945 2.44908C2.14523 2.75309 1.95836 3.05819 1.81825 3.41776C1.68263 3.76558 1.59037 4.16315 1.56417 4.74508C1.53809 5.32843 1.53125 5.51492 1.53125 7.00018C1.53125 8.48544 1.53781 8.67126 1.56428 9.25456C1.59108 9.83676 1.68323 10.2342 1.81836 10.5819C1.95814 10.9416 2.14501 11.2467 2.44907 11.5507C2.75297 11.8549 3.05807 12.0422 3.41753 12.1819C3.76551 12.3171 4.16298 12.4093 4.74507 12.436C5.32842 12.4625 5.51469 12.469 6.99984 12.469C8.4852 12.469 8.67103 12.4625 9.25433 12.436C9.83653 12.4093 10.2344 12.3171 10.5824 12.1819C10.9419 12.0422 11.2466 11.8549 11.5504 11.5507C11.8547 11.2467 12.0415 10.9416 12.1816 10.582C12.3161 10.2342 12.4084 9.83665 12.4357 9.25467C12.4619 8.67137 12.4688 8.48544 12.4688 7.00018C12.4688 5.51492 12.4619 5.32854 12.4357 4.74519C12.4084 4.16299 12.3161 3.76563 12.1816 3.41793C12.0415 3.05819 11.8547 2.75309 11.5504 2.44908C11.2463 2.14491 10.942 1.95804 10.582 1.81854C10.2334 1.68324 9.83576 1.59104 9.25356 1.5644C8.67021 1.53788 8.48449 1.53137 6.9988 1.53137H7.00049ZM6.50989 2.5169C6.65552 2.51668 6.818 2.5169 7.00049 2.5169C8.4607 2.5169 8.63373 2.52215 9.21036 2.54834C9.74356 2.57273 10.033 2.66182 10.2257 2.73668C10.481 2.83578 10.6629 2.95429 10.8542 3.14575C11.0456 3.33715 11.1641 3.51943 11.2634 3.77465C11.3383 3.96715 11.4275 4.25656 11.4518 4.78976C11.478 5.36628 11.4837 5.53942 11.4837 6.99892C11.4837 8.45842 11.478 8.63161 11.4518 9.20807C11.4274 9.74128 11.3383 10.0307 11.2634 10.2232C11.1643 10.4785 11.0456 10.6602 10.8542 10.8515C10.6628 11.0429 10.4811 11.1613 10.2257 11.2605C10.0332 11.3357 9.74356 11.4246 9.21036 11.449C8.63384 11.4751 8.4607 11.4808 7.00049 11.4808C5.54023 11.4808 5.36714 11.4751 4.79068 11.449C4.25748 11.4243 3.96807 11.3353 3.77513 11.2604C3.51996 11.1612 3.33763 11.0428 3.14623 10.8514C2.95482 10.66 2.83637 10.4781 2.737 10.2228C2.66213 10.0302 2.57294 9.74084 2.54866 9.20764C2.52246 8.63112 2.51721 8.45798 2.51721 6.99755C2.51721 5.53712 2.52246 5.36491 2.54866 4.7884C2.57305 4.25519 2.66213 3.96579 2.737 3.77301C2.83615 3.51779 2.95482 3.33551 3.14628 3.14411C3.33774 2.9527 3.51996 2.83419 3.77519 2.73488C3.96796 2.65968 4.25748 2.57082 4.79068 2.54632C5.29517 2.52351 5.49068 2.51668 6.50989 2.51553V2.5169ZM9.91971 3.42493C9.55741 3.42493 9.26346 3.7186 9.26346 4.08096C9.26346 4.44326 9.55741 4.73721 9.91971 4.73721C10.282 4.73721 10.576 4.44326 10.576 4.08096C10.576 3.71865 10.282 3.42471 9.91971 3.42471V3.42493ZM7.00049 4.1917C5.44955 4.1917 4.19207 5.44918 4.19207 7.00018C4.19207 8.55117 5.44955 9.80805 7.00049 9.80805C8.55148 9.80805 9.80853 8.55117 9.80853 7.00018C9.80853 5.44924 8.55138 4.1917 7.00038 4.1917H7.00049ZM7.00049 5.17722C8.00723 5.17722 8.82345 5.99333 8.82345 7.00018C8.82345 8.00692 8.00723 8.82313 7.00049 8.82313C5.99375 8.82313 5.17759 8.00692 5.17759 7.00018C5.17759 5.99333 5.9937 5.17722 7.00049 5.17722Z" fill="white"/>
    <defs>
      <radialGradient id="inst-grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.71875 15.0783) rotate(-90) scale(13.875 12.9049)">
        <stop stopColor="#FFDD55"/><stop offset="0.1" stopColor="#FFDD55"/><stop offset="0.5" stopColor="#FF543E"/><stop offset="1" stopColor="#C837AB"/>
      </radialGradient>
      <radialGradient id="inst-grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-2.34505 1.00849) rotate(78.681) scale(6.20222 25.5657)">
        <stop stopColor="#3771C8"/><stop offset="0.128" stopColor="#3771C8"/><stop offset="1" stopColor="#6600FF" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className={headerStyles.footerIconImg}>
    <path d="M13.2275 0H0.772455C0.34584 0 0 0.34584 0 0.772455V13.2275C0 13.6542 0.34584 14 0.772455 14H13.2275C13.6542 14 14 13.6542 14 13.2275V0.772455C14 0.34584 13.6542 0 13.2275 0Z" fill="#3D5A98"/>
    <path d="M7.74314 13.3802V7.95885H9.56249L9.83456 5.84614H7.74314V4.4976C7.74314 3.88602 7.91348 3.46844 8.79003 3.46844H9.90909V1.57575C9.3672 1.51938 8.82264 1.49253 8.27783 1.49531C6.66667 1.49531 5.55708 2.47715 5.55708 4.28822V5.84614H3.73773V7.95885H5.55708V13.3802H7.74314Z" fill="white"/>
  </svg>
);

const GoogleAdsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" fill="none" className={headerStyles.footerIconImg}>
    <path d="M0.366971 10.1499L5.66691 1.2749C6.34013 1.66258 9.7349 3.50022 10.2832 3.84971L4.98322 12.7252C4.4036 13.4742 -0.367358 11.2865 0.366971 10.1494V10.1499Z" fill="#FBBC04"/>
    <path d="M15.5947 10.1496L10.2947 1.27514C9.5538 0.0690418 7.95806 -0.369263 6.64736 0.343089C5.33665 1.05544 4.93756 2.58994 5.6785 3.84989L10.9784 12.7254C11.7194 13.931 13.3152 14.3692 14.6259 13.6569C15.8793 12.9445 16.3356 11.3556 15.5947 10.1506V10.1496Z" fill="#4285F4"/>
    <path d="M2.66045 13.9999C4.12977 13.9999 5.32089 12.8638 5.32089 11.4623C5.32089 10.0608 4.12977 8.92468 2.66045 8.92468C1.19112 8.92468 0 10.0608 0 11.4623C0 12.8638 1.19112 13.9999 2.66045 13.9999Z" fill="#34A853"/>
  </svg>
);

const MetaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 14" fill="none" className={headerStyles.footerIconImg}>
    <path d="M2.25486 9.23267C2.25486 10.0375 2.42986 10.6554 2.65852 11.0292C2.95837 11.5188 3.40549 11.7262 3.86142 11.7262C4.44946 11.7262 4.98742 11.5789 6.02405 10.1313C6.85461 8.97101 7.83325 7.34227 8.49167 6.32123L9.60682 4.59139C10.3814 3.39004 11.278 2.05458 12.306 1.14931C13.1451 0.410438 14.0504 0 14.9615 0C16.4911 0 17.9481 0.894977 19.0633 2.57353C20.2836 4.41181 20.8761 6.72731 20.8761 9.11682C20.8761 10.5373 20.5988 11.5811 20.1269 12.4058C19.671 13.2032 18.7823 14 17.2876 14V11.7262C18.5675 11.7262 18.8869 10.5388 18.8869 9.17989C18.8869 7.24338 18.4397 5.0942 17.4546 3.55866C16.7554 2.46938 15.8494 1.80387 14.8527 1.80387C13.7746 1.80387 12.907 2.62474 11.9321 4.08865C11.4137 4.8663 10.8816 5.81405 10.2842 6.88341L9.62639 8.05989C8.30509 10.4252 7.97042 10.9639 7.3098 11.853C6.15183 13.41 5.16316 14 3.86142 14C2.31732 14 1.3408 13.3249 0.736126 12.3075C0.24244 11.4785 0 10.3908 0 9.15132L2.25486 9.23267Z" fill="#0081FB"/>
    <path d="M1.77777 2.734C2.81163 1.12518 4.30345 0 6.01455 0C7.00559 0 7.99068 0.296157 9.0194 1.1442C10.1446 2.07137 11.3439 3.59818 12.8401 6.11457L13.3767 7.01754C14.6718 9.19603 15.4086 10.3167 15.8398 10.8453C16.3945 11.524 16.7829 11.7262 17.2875 11.7262C18.5673 11.7262 18.8868 10.5388 18.8868 9.17989L20.8759 9.11682C20.8759 10.5373 20.5987 11.5811 20.1268 12.4058C19.6708 13.2032 18.7822 14 17.2875 14C16.3582 14 15.535 13.7962 14.6246 12.9291C13.9248 12.2636 13.1066 11.0812 12.4772 10.0184L10.6048 6.86069C9.6655 5.276 8.80371 4.0945 8.30505 3.55932C7.76863 2.98397 7.07891 2.28906 5.97834 2.28906C5.08761 2.28906 4.33109 2.92024 3.69804 3.88553L1.77777 2.734Z" fill="url(#meta-grad1)"/>
    <path d="M5.97838 2.28906C5.08764 2.28906 4.33113 2.92024 3.69808 3.88553C2.80302 5.24965 2.25486 7.28142 2.25486 9.23267C2.25486 10.0375 2.42986 10.6554 2.65852 11.0292L0.736126 12.3075C0.24244 11.4785 0 10.3908 0 9.15132C0 6.89733 0.612745 4.54816 1.77789 2.734C2.81174 1.12518 4.30357 0 6.01467 0L5.97838 2.28906Z" fill="url(#meta-grad2)"/>
    <defs>
      <linearGradient id="meta-grad1" x1="266.822" y1="783.076" x2="1702.61" y2="854.899" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0064E1"/><stop offset="0.4" stopColor="#0064E1"/><stop offset="0.83" stopColor="#0073EE"/><stop offset="1" stopColor="#0082FB"/>
      </linearGradient>
      <linearGradient id="meta-grad2" x1="326.687" y1="1018.84" x2="326.687" y2="483.772" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0082FB"/><stop offset="1" stopColor="#0064E0"/>
      </linearGradient>
    </defs>
  </svg>
);

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
    // Only prevent scroll if we are very close to a horizontal swipe (if desired)
    // but here we want to allow native vertical scroll inside cards.
    // e.preventDefault(); // REMOVED to allow internal scrolling
    touchStartY.current = e.touches[0].clientY;
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    // e.preventDefault(); // REMOVED to allow internal scrolling
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
    e.preventDefault();
    if (e.deltaY > 0) {
      goToNext();
    } else if (e.deltaY < 0) {
      goToPrev();
    }
  }, [goToNext, goToPrev, isTransitioning]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Add event listeners with passive: false to allow preventDefault
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
      {/* FIXED HEADER */}
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

      {/* SWIPEABLE MIDDLE CONTENT */}
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

        {/* Pagination dots */}
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

      {/* FIXED FOOTER */}
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
              <img src={emailMarketingLogo} alt="Email Marketing" className={headerStyles.footerIconImg} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SwipeableLayout;
