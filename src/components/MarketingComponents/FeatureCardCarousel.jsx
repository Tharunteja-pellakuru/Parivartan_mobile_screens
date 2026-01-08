import React from 'react';
import styles from './MiddleCards.module.css';

/**
 * Shared component for the feature carousel found in SeoCard, ReputationCard, and AdCampaignsCard.
 * Creates infinite scroll effect by duplicating cards
 */
const FeatureCardCarousel = ({ features }) => {
  // Duplicate features multiple times for infinite scroll effect
  const infiniteFeatures = [
    ...features,
    ...features,
    ...features,
    ...features,
    ...features,
    ...features,
    ...features,
    ...features,
  ];

  return (
    <div className={styles.featureCarousel}>
      <div className={styles.featureTrack}>
        {infiniteFeatures.map((feature, index) => (
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
