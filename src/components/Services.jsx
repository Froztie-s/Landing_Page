import { useEffect, useRef } from 'react';
import { business } from '../config/business';
import { SectionHeading } from './ui/SectionHeading';
import { ServiceCard } from './ui/ServiceCard';
import styles from './Services.module.css';

export function Services() {
  const { services } = business;
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const items = ref.current?.querySelectorAll('.fade-up');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={['section', 'section--alt'].join(' ')} ref={ref}>
      <div className="container">
        <div className="fade-up">
          <SectionHeading
            eyebrow="What We Supply"
            headline={"Green Beans from\nIndonesian Origins"}
            align="center"
          />
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.title}
              className="fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
