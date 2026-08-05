import styles from './SectionHeading.module.css';

export function SectionHeading({ eyebrow, headline, align = 'left', className = '' }) {
  return (
    <div className={[styles.heading, styles[align], className].filter(Boolean).join(' ')}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{headline}</h2>
    </div>
  );
}
