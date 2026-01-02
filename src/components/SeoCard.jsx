import React from 'react';
import styles from './MiddleCards.module.css';
import FeatureCardCarousel from './FeatureCardCarousel';
import groupIcon from '../assets/logos/Group Icon.png';
import seoIcon from '../assets/logos/Seo.png';
import statsIcon from '../assets/logos/Stats Icon.png';
import seoTitleImage from '../assets/images/seo_title_image.png';

export const SeoCard = () => {
  const features = [
    { icon: groupIcon, text: 'Drive consistent, high-quality organic traffic.' },
    { icon: seoIcon, text: "Boost your website's Google rankings and visibility." },
    { icon: statsIcon, text: 'Improve website conversions through rate optimization.' },
  ];

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.sectionTitle}>seo</h2>
      
      {/* SEO Illustration */}
      <div className={styles.illustrationWrapper}>
        <img src={seoTitleImage} alt="SEO" className={styles.illustration} />
      </div>

      {/* Feature Cards */}
      <FeatureCardCarousel features={features} />
    </div>
  );
};

export default SeoCard;
