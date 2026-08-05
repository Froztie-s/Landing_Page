import { useState, useEffect, useRef } from 'react';
import { business } from '../config/business';
import { SectionHeading } from './ui/SectionHeading';
import styles from './Faq.module.css';

export function Faq() {
  const { faq } = business;
  const [open, setOpen] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = ref.current?.querySelectorAll('.fade-up');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggle = (i) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className={['section', 'section--alt'].join(' ')} ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className="fade-up">
            <SectionHeading
              eyebrow="Common Questions"
              headline="Sourcing FAQ"
              align="center"
            />
          </div>

          <ul className={styles.list} role="list">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={i}
                  className={styles.item}
                >
                  <button
                    className={[styles.question, isOpen ? styles.questionOpen : ''].join(' ')}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span>{item.question}</span>
                    <span className={[styles.icon, isOpen ? styles.iconOpen : ''].join(' ')} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className={[styles.answer, isOpen ? styles.answerOpen : ''].join(' ')}
                  >
                    <p>{item.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
