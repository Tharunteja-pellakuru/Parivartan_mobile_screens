import React from 'react';
import styles from './MiddleCards.module.css';

/**
 * Shared component for the feature carousel found in SeoCard, ReputationCard, and AdCampaignsCard.
 */
const FeatureCardCarousel = ({ features }) => {
  return (
    <div className={styles.featureCarousel}>
      <div className={styles.featureTrack}>
        {[...features, ...features].map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img src={feature.icon} alt="" />
            </div>
            <p className={styles.featureText}>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCardCarousel;
