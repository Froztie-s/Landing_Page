import styles from './ServiceCard.module.css';

export function ServiceCard({ title, description, image }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={image.url}
          alt={image.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
