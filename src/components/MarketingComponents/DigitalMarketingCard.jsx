import React from 'react';
import styles from './MiddleCards.module.css';
import useCarouselScroll from '../../hooks/useCarouselScroll';

// Import logos
import client1Logo from '../../assets/logos/Client 1.png';
import client3Logo from '../../assets/logos/Client 3.png';
import client4Logo from '../../assets/logos/Client 4.png';
import client5Logo from '../../assets/logos/Client 5.png';
import client7Logo from '../../assets/logos/Client 7.png';
import client8Logo from '../../assets/logos/Client 8.png';

// Card 1: Digital Marketing with Client Carousel
export const DigitalMarketingCard = () => {
  const topLogos = [
    { id: 't1', name: 'Client 1', logo: client1Logo },
    { id: 't3', name: 'Client 3', logo: client3Logo },
    { id: 't4', name: 'Client 4', logo: client4Logo },
    { id: 't5', name: 'Client 5', logo: client5Logo },
  ];

  const bottomLogos = [
    { id: 'b1', name: 'Client 7', logo: client7Logo },
    { id: 'b2', name: 'Client 8', logo: client8Logo },
  ];

  // Adjust density to be between 1x and 2x to avoid overlap but minimize gap
  // Adjust density to be between 1x and 2x to avoid overlap but minimize gap
  const displayTopLogos = [...topLogos, ...topLogos]; // 8 cards (2 full sets)
  const displayBottomLogos = [...bottomLogos, ...bottomLogos, ...bottomLogos]; // 6 cards (3 full sets)

  const { getCardStyle, touchHandlers } = useCarouselScroll(0.15);

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.sectionTitle}>digital marketing</h2>
      
      <div 
        className={styles.carouselContainer}
        {...touchHandlers}
      >
        <div className={styles.carouselTrack}>
          {displayTopLogos.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`${styles.logoCard} ${styles.topCard}`}
              style={getCardStyle(index, displayTopLogos.length)}
            >
              {item.logo ? (
                <img src={item.logo} alt={item.name} className={styles.logoImage} />
              ) : (
                <span className={styles.logoPlaceholder}>{item.name}</span>
              )}
            </div>
          ))}
          {displayBottomLogos.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`${styles.logoCard} ${styles.bottomCard}`}
              style={getCardStyle(index, displayBottomLogos.length)}
            >
              {item.logo ? (
                <img src={item.logo} alt={item.name} className={styles.logoImage} />
              ) : (
                <span className={styles.logoPlaceholder}>{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingCard;
