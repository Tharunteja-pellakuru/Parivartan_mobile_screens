import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`${styles.faqCard} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.questionButton} 
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{question}</span>
        <span className={styles.icon}>
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowSvg}>
            <path d="M11.3996 2.80854e-06L0.599332 1.86434e-06C0.489984 0.000345178 0.3828 0.0305566 0.289318 0.0873842C0.195835 0.144212 0.119593 0.225502 0.0687998 0.322508C0.0180061 0.419514 -0.00541708 0.52856 0.00105359 0.637909C0.0075233 0.747257 0.0436408 0.852768 0.105518 0.943083L5.50567 8.75702C5.72948 9.08099 6.26829 9.08099 6.4927 8.75702L11.8929 0.943084C11.9554 0.852958 11.992 0.747394 11.9988 0.637863C12.0057 0.528332 11.9824 0.419023 11.9315 0.321812C11.8807 0.224601 11.8042 0.143206 11.7105 0.0864706C11.6167 0.0297346 11.5092 -0.000170751 11.3996 2.80854e-06Z" fill="currentColor"/>
          </svg>
        </span>
      </button>
      <div className={styles.answerWrapper} style={{ maxHeight: isOpen ? '500px' : '0' }}>
        <div className={styles.answerContent}>
          {Array.isArray(answer) ? (
            <ul className={styles.bulletList}>
              {answer.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.textAnswer}>{answer}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1); // Start with all items closed

  const faqData = [
    {
      question: "how long does website design take?",
      answer: "A typical website design project takes between 4 to 8 weeks depending on complexity."
    },
    {
      question: "what is the cost of a website in hyderabad?",
      answer: "The cost varies based on features, but our custom solutions start at competitive local rates."
    },
    {
      question: "what's included in website package?",
      answer: [
        "Custom web UI/UX design",
        "Mobile optimization and speed performance",
        "SEO setup: meta tags, sitemaps, image alt tags",
        "Lead capture tools and form integrations",
        "CMS integration (WordPress/custom)"
      ]
    },
    {
      question: "how long does a typical web design project take?",
      answer: "Standard projects usually follow a phased approach over 6 weeks."
    },
    {
      question: "what's the starting price for a custom site in hyderabad?",
      answer: "Our entry-level custom packages focus on high conversion and professional branding."
    },
    {
      question: "will my site be mobile-friendly and seo-optimized?",
      answer: "Yes, every site we build is mobile-first and includes full technical SEO set-up."
    }
  ];

  return (
    <section className={styles.container}>
      <div className={styles.headingBlock}>
        <h2 className={styles.heading}>
          frequently <br />
          <span className={styles.brandName}>
            asking questions
            <svg className={styles.underlineSvg} width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3"/>
            </svg>
          </span>
        </h2>
      </div>

      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
