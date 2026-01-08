import React from 'react';
import styles from './WhyChooseUs.module.css';

export const WhyChooseUs = () => {
  const points = [
    "20+ years of experience in Hyderabad's digital ecosystem",
    "Responsive design + mobile-first development",
    "Over 5,000 projects delivered across sectors",
    "Google 4.8★ rated design & branding agency"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headingBlock}>
        <h2 className={styles.heading}>
          Why businesses choose <span className={styles.brandName}>
            eParivartan
            <svg className={styles.underlineSvg} width="220" height="24" viewBox="0 0 222 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 20C65 5 156 0 220 16" stroke="#83C341" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
      </div>

      <div className={styles.cardsList}>
        {points.map((point, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.cardText}>{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
