import { useEffect, useRef } from 'react';
import { business } from '../config/business';
import { Button } from './ui/Button';
import styles from './About.module.css';

export function About() {
  const { about } = business;
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    const items = ref.current?.querySelectorAll('.fade-up');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className={styles.layout}>
          <div className={`${styles.imageCol} fade-up`}>
            <div className={styles.imageWrap}>
              <img src={about.image} alt="Coffee beans close up" loading="lazy" />
            </div>
            <div className={styles.badge} aria-hidden="true">
              <span className={styles.badgeText}>Indonesia</span>
              <span className={styles.badgeSub}>Origin Supplier</span>
            </div>
          </div>

          <div className={`${styles.textCol} fade-up`} style={{ transitionDelay: '120ms' }}>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className={styles.headline}>
              {about.headline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            {about.body.map((para, i) => (
              <p key={i} className={styles.para}>{para}</p>
            ))}
            <Button href="#contact" variant="outline" className={styles.cta}>
              Talk to Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
