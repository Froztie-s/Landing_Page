import styles from './Button.module.css';

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
