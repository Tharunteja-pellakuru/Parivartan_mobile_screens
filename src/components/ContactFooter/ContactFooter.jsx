import React from 'react';
import facebookIcon from '../../assets/images/facebook.png';
import instagramIcon from '../../assets/images/Instgram.png';
import linkedinIcon from '../../assets/images/Linkedin.png';
import styles from './ContactFooter.module.css';

const ContactFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contactSection}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>
            <span className={styles.headingText}>
              get connected
              <svg className={styles.underlineSvg} width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3"/>
              </svg>
            </span>
          </h2>
          <p className={styles.subHeading}>send message</p>
          <p className={styles.tagline}>Change is Waiting to Happen. Let's Catch Up!</p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <label className={styles.label}>name</label>
              <input type="text" className={styles.input} placeholder="" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>email address</label>
              <input type="email" className={styles.input} placeholder="" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <label className={styles.label}>phone number</label>
              <input type="tel" className={styles.input} placeholder="" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>website url</label>
              <input type="url" className={styles.input} placeholder="" />
            </div>
          </div>

          <div className={styles.fieldFull}>
            <label className={styles.label}>message</label>
            <textarea className={styles.textarea}></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            get connected
          </button>
        </form>

        <div className={styles.contactIcons}>
          <div className={styles.iconCircle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15.46L15.73 14.85L13.21 17.37C10.3714 15.9259 8.06406 13.6186 6.61999 10.78L9.14999 8.25L8.53999 3H3.02999C2.44999 13.18 10.82 21.55 21 20.97V15.46Z" fill="#73BF44"/>
            </svg>
          </div>
          <div className={styles.iconCircle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="#73BF44"/>
            </svg>
          </div>
          <div className={styles.iconCircle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.29973 8.19371 4.21192 8.11766 4.14189 8.02645C4.07186 7.93525 4.02106 7.83078 3.99258 7.71937C3.96409 7.60796 3.9585 7.49194 3.97616 7.37831C3.99381 7.26468 4.03434 7.15581 4.09528 7.0583C4.15623 6.96079 4.23632 6.87666 4.33073 6.811C4.42513 6.74533 4.53187 6.69951 4.6445 6.6763C4.75712 6.65309 4.87328 6.65297 4.98595 6.67595C5.09863 6.69893 5.20546 6.74453 5.3 6.81L12 11L18.7 6.81C18.7945 6.74453 18.9014 6.69893 19.014 6.67595C19.1267 6.65297 19.2429 6.65309 19.3555 6.6763C19.4681 6.69951 19.5749 6.74453 19.6693 6.811C19.7637 6.87666 19.8438 6.96079 19.9047 7.0583C19.9657 7.15581 20.0062 7.26468 20.0238 7.37831C20.0415 7.49194 20.0359 7.49194 20.0074 7.71937C19.9789 7.83078 19.9281 7.93525 19.8581 8.02645C19.7881 8.11766 19.7003 8.19371 19.6 8.25Z" fill="#73BF44"/>
            </svg>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2025 epariivartan. all rights reserved.</p>
        <p className={styles.designBy}>concept & design by epariivartan</p>
        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com/eparivartan" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" className={styles.socialImage} />
          </a>
          <a href="https://www.instagram.com/eparivartan/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" className={styles.socialImage} />
          </a>
          <a href="https://www.linkedin.com/company/eparivartan" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
            <img src={linkedinIcon} alt="LinkedIn" className={styles.socialImage} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactFooter;
