import { business } from '../config/business';
import styles from './Footer.module.css';

export function Footer() {
  const { name, contact, location, openingHours } = business;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={['container', styles.inner].join(' ')}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>{name}</span>
          <p className={styles.tagline}>
            Traceable Beans. Consistent Quality. Diverse Origins.
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.colList}>
              <li>
                <a href={contact.phoneTel}>{contact.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Location</h4>
            <p className={styles.address}>{location.address}</p>
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsLink}
            >
              View on Maps →
            </a>
          </div>

          {openingHours && (
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Hours</h4>
              <p className={styles.address}>{openingHours}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {year} {name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
