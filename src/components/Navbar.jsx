import { useState, useEffect } from 'react';
import { business } from '../config/business';
import { Button } from './ui/Button';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={[styles.navbar, scrolled ? styles.scrolled : ''].join(' ')} role="banner">
      <div className={[styles.inner, 'container'].join(' ')}>
        <a href="#" className={styles.wordmark} onClick={closeMenu} aria-label={`${business.name} — home`}>
          {business.name}
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href="#contact" variant="primary" className={styles.ctaBtn}>
            Get in Touch
          </Button>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={[styles.bar, menuOpen ? styles.barTop : ''].join(' ')} />
            <span className={[styles.bar, menuOpen ? styles.barMid : ''].join(' ')} />
            <span className={[styles.bar, menuOpen ? styles.barBot : ''].join(' ')} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.mobileLink} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileActions}>
          <Button href="#contact" variant="primary" onClick={closeMenu} style={{ width: '100%', justifyContent: 'center' }}>
            Get in Touch
          </Button>
        </div>
      </div>
    </header>
  );
}
