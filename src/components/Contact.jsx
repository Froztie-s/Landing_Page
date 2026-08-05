import { useState, useEffect, useRef } from 'react';
import { business } from '../config/business';
import { Button } from './ui/Button';
import { SectionHeading } from './ui/SectionHeading';
import styles from './Contact.module.css';

export function Contact() {
  const { contact, location, openingHours } = business;

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const errorRef = useRef(null);
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

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) next.message = 'Please include a message.';
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const next = validate();
    if (next[name]) setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => errorRef.current?.focus(), 50);
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div className="fade-up">
          <SectionHeading
            eyebrow="Get in Touch"
            headline={"Ready to Source\nIndonesian Coffee?"}
            align="left"
          />
        </div>

        <div className={styles.layout}>
          {/* Info panel */}
          <aside className={`${styles.info} fade-up`} style={{ transitionDelay: '80ms' }}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Information</h3>

              <ul className={styles.contactList}>
                <li>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <PhoneIcon />
                  </span>
                  <div>
                    <span className={styles.contactLabel}>Phone</span>
                    <a href={contact.phoneTel} className={styles.contactValue}>
                      {contact.phone}
                    </a>
                  </div>
                </li>

                <li>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <EmailIcon />
                  </span>
                  <div>
                    <span className={styles.contactLabel}>Email</span>
                    <a href={`mailto:${contact.email}`} className={styles.contactValue}>
                      {contact.email}
                    </a>
                  </div>
                </li>

                <li>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <PinIcon />
                  </span>
                  <div>
                    <span className={styles.contactLabel}>Address</span>
                    <span className={styles.contactValue}>{location.address}</span>
                  </div>
                </li>

                {openingHours && (
                  <li>
                    <span className={styles.contactIcon} aria-hidden="true">
                      <ClockIcon />
                    </span>
                    <div>
                      <span className={styles.contactLabel}>Hours</span>
                      <span className={styles.contactValue}>{openingHours}</span>
                    </div>
                  </li>
                )}
              </ul>

              <div className={styles.quickActions}>
                <a href={contact.phoneTel} className={styles.quickBtn} aria-label="Call us">
                  <PhoneIcon /> Call
                </a>
                <a href={`mailto:${contact.email}`} className={styles.quickBtn} aria-label="Email us">
                  <EmailIcon /> Email
                </a>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickBtn}
                  aria-label="Get directions"
                >
                  <MapIcon /> Directions
                </a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className={`${styles.formWrap} fade-up`} style={{ transitionDelay: '160ms' }}>
            {status === 'success' ? (
              <div className={styles.success} role="status">
                <div className={styles.successIcon} aria-hidden="true">
                  <CheckIcon />
                </div>
                <h3>Details noted</h3>
                <p>Your enquiry has been captured. For a faster response, call or email us directly — our contact details are on the left.</p>
                <Button variant="outline" onClick={() => setStatus('idle')} style={{ marginTop: '24px' }}>
                  Submit another enquiry
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div
                  className={styles.errorSummary}
                  ref={errorRef}
                  role="alert"
                  aria-live="polite"
                  tabIndex={-1}
                >
                  {Object.values(errors).filter(Boolean).length > 0 && (
                    <>
                      <strong>Please fix the following:</strong>
                      <ul>
                        {Object.values(errors).filter(Boolean).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className={styles.row}>
                  <FormField
                    label="Name"
                    name="name"
                    type="text"
                    value={form.name}
                    error={errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="name"
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="email"
                  />
                </div>

                <FormField
                  label="Company (optional)"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />

                <div className={styles.fieldWrap}>
                  <label className={styles.label} htmlFor="message">
                    Message <span className={styles.required} aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={[styles.input, styles.textarea, errors.message ? styles.inputError : ''].filter(Boolean).join(' ')}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Tell us about your sourcing needs, origins of interest, or estimated quantities."
                  />
                  {errors.message && (
                    <span id="message-error" className={styles.fieldError} role="alert">{errors.message}</span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'submitting'}
                  className={styles.submitBtn}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, name, type, value, error, onChange, onBlur, required, autoComplete, placeholder }) {
  return (
    <div className={styles.fieldWrap}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required} aria-label="required"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={[styles.input, error ? styles.inputError : ''].filter(Boolean).join(' ')}
        aria-required={required}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id={`${name}-error`} className={styles.fieldError} role="alert">{error}</span>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.2a16 16 0 0 0 6.29 6.29l.38-.38a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.4v.07z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
