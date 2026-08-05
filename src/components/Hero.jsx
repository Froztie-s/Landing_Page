import { business } from '../config/business';
import { Button } from './ui/Button';
import styles from './Hero.module.css';

export function Hero() {
  const { hero, contact, location } = business;

  return (
    <section className={styles.hero} aria-label="Hero">
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${hero.image})` }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={[styles.content, 'container'].join(' ')}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>

          <h1 className={styles.headline}>
            {hero.headline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < hero.headline.split('\n').length - 1 && <br />}</span>
            ))}
          </h1>

          <p className={styles.subheading}>{hero.subheading}</p>

          <div className={styles.actions}>
            <Button href={hero.ctaPrimary.href} variant="cream">
              {hero.ctaPrimary.label}
            </Button>
            <Button href={hero.ctaSecondary.href} variant="ghost">
              {hero.ctaSecondary.label}
            </Button>
          </div>

          <div className={styles.trust}>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {location.city}
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.2a16 16 0 0 0 6.29 6.29l.38-.38a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.4v.07z"/></svg>
              <a href={contact.phoneTel} className={styles.trustLink}>{contact.phone}</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
