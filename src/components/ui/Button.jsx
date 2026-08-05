import styles from './Button.module.css';

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
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
