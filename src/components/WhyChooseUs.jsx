import { useEffect, useRef } from 'react';
import { business } from '../config/business';
import { SectionHeading } from './ui/SectionHeading';
import styles from './WhyChooseUs.module.css';

export function WhyChooseUs() {
  const { whyChooseUs } = business;
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

  return (
    <section id="why" className={['section', 'section--alt'].join(' ')} ref={ref}>
      <div className="container">
        <div className="fade-up">
          <SectionHeading
            eyebrow={whyChooseUs.eyebrow}
            headline={whyChooseUs.headline}
            align="center"
          />
        </div>

        <div className={styles.grid}>
          {whyChooseUs.points.map((point, i) => (
            <div
              key={point.number}
              className={`${styles.point} fade-up`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={styles.number} aria-hidden="true">{point.number}</span>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.body}>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
