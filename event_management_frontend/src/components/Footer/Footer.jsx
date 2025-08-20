import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Shared Footer component. Mirrors the footer layout from Figma:
 * - Company info
 * - Categories
 * - Social links
 * - App badges (placeholder)
 * Uses internal Links for in-app routes.
 */
// PUBLIC_INTERFACE
export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div>
            <div className={styles.heading}>Company Info</div>
            <Link to="/about" className={styles.link}>About Us</Link>
            <Link to="/contact" className={styles.link}>Contact Us</Link>
            <Link to="/about#careers" className={styles.link}>Careers</Link>
            <Link to="/about#faqs" className={styles.link}>FAQs</Link>
            <Link to="/about#terms" className={styles.link}>Terms of Service</Link>
            <Link to="/about#privacy" className={styles.link}>Privacy Policy</Link>
          </div>

          <div>
            <div className={styles.heading}>Categories</div>
            <Link to="/events?category=concerts" className={styles.link}>Concerts &amp; Gigs</Link>
            <Link to="/events?category=festivals" className={styles.link}>Festivals &amp; Lifestyle</Link>
            <Link to="/events?category=business" className={styles.link}>Business &amp; Networking</Link>
            <Link to="/events?category=food" className={styles.link}>Food &amp; Drinks</Link>
            <Link to="/events?category=performing-arts" className={styles.link}>Performing Arts</Link>
            <Link to="/events?category=sports" className={styles.link}>Sports &amp; Outdoors</Link>
            <Link to="/events?category=exhibitions" className={styles.link}>Exhibitions</Link>
            <Link to="/events?category=workshops" className={styles.link}>Workshops, Conferences &amp; Classes</Link>
          </div>

          <div>
            <div className={styles.heading}>Follow Us</div>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.link}>Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.link}>Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.link}>Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.link}>Youtube</a>
          </div>

          <div>
            <div className={styles.heading}>Download The App</div>
            <button type="button" className={styles.appRow} onClick={() => console.log('Open Google Play')} aria-label="Open Google Play (placeholder)">
              <span className={styles.appIcon} aria-hidden="true" />
              <span className={styles.appText}>
                <span className={styles.appSmall}>Get it on</span>
                <span className={styles.appBig}>Google Play</span>
              </span>
            </button>
            <button type="button" className={styles.appRow} onClick={() => console.log('Open App Store')} aria-label="Open App Store (placeholder)">
              <span className={styles.appIcon} aria-hidden="true" />
              <span className={styles.appText}>
                <span className={styles.appSmall}>Download on the</span>
                <span className={styles.appBig}>App Store</span>
              </span>
            </button>
          </div>
        </div>

        <hr className={styles.hr} />
        <div className={styles.copy}>
          <span className={styles.copyIcon} aria-hidden="true" />
          <span>2023 Eventify. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
