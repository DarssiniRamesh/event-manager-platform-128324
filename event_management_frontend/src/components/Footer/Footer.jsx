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
            <a href="#" className={styles.link}>Careers</a>
            <a href="#" className={styles.link}>FAQs</a>
            <a href="#" className={styles.link}>Terms of Service</a>
            <a href="#" className={styles.link}>Privacy Policy</a>
          </div>

          <div>
            <div className={styles.heading}>Categories</div>
            <a href="#" className={styles.link}>Concerts &amp; Gigs</a>
            <a href="#" className={styles.link}>Festivals &amp; Lifestyle</a>
            <a href="#" className={styles.link}>Business &amp; Networking</a>
            <a href="#" className={styles.link}>Food &amp; Drinks</a>
            <a href="#" className={styles.link}>Performing Arts</a>
            <a href="#" className={styles.link}>Sports &amp; Outdoors</a>
            <a href="#" className={styles.link}>Exhibitions</a>
            <a href="#" className={styles.link}>Workshops, Conferences &amp; Classes</a>
          </div>

          <div>
            <div className={styles.heading}>Follow Us</div>
            <a href="#" className={styles.link}>Facebook</a>
            <a href="#" className={styles.link}>Instagram</a>
            <a href="#" className={styles.link}>Twitter</a>
            <a href="#" className={styles.link}>Youtube</a>
          </div>

          <div>
            <div className={styles.heading}>Download The App</div>
            <a href="#" className={styles.appRow}>
              <span className={styles.appIcon} aria-hidden="true" />
              <span className={styles.appText}>
                <span className={styles.appSmall}>Get it on</span>
                <span className={styles.appBig}>Google Play</span>
              </span>
            </a>
            <a href="#" className={styles.appRow}>
              <span className={styles.appIcon} aria-hidden="true" />
              <span className={styles.appText}>
                <span className={styles.appSmall}>Download on the</span>
                <span className={styles.appBig}>App Store</span>
              </span>
            </a>
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
