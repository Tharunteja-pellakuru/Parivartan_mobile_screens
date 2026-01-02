import React from 'react';
import styles from './MiddleCards.module.css';
import FeatureCardCarousel from './FeatureCardCarousel';
import adCampaignImg from '../assets/images/Ad campaign.png';
import groupIcon from '../assets/logos/Group Icon.png';
import rupeeIcon from '../assets/images/Rupee.png';
import filterIcon from '../assets/images/Filter.png';

export const AdCampaignsCard = () => {
  const features = [
    { icon: groupIcon, text: 'Reach the right audience with precisely targeted campaigns.' },
    { icon: rupeeIcon, text: 'Maximize ROI through data-driven ad strategy and optimization.' },
    { icon: filterIcon, text: 'Generate quality leads that convert into real customers.' },
  ];

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.sectionTitle}>ad campaigns</h2>
      <div className={styles.illustrationWrapper}>
        <img src={adCampaignImg} alt="Ad Campaigns" className={styles.illustration} />
      </div>
      <FeatureCardCarousel features={features} />
    </div>
  );
};

export default AdCampaignsCard;
