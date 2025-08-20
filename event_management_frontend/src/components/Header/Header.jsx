import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * Shared Header component that renders the brand, primary navigation tabs,
 * and action buttons. Uses NavLink to highlight active route.
 * Navigation targets:
 *  - "/" (Home)
 *  - "/events" (placeholder)
 *  - "/about" (placeholder)
 *  - "/contact" (placeholder)
 *  - "/create-event" (placeholder)
 *  - "/sign-in"
 *  - "/sign-up"
 */
// PUBLIC_INTERFACE
export default function Header() {
  // Helper to ensure aria-current="page" only on active links
  const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`;
  const ariaCurrent = ({ isActive }) => (isActive ? 'page' : undefined);

  return (
    <header className={styles.header} role="banner" aria-label="Header">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Eventify Home">
          <span className={styles.logoTicket} aria-hidden="true" />
          <span className={styles.logoText}>Eventify</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end className={linkClass} aria-current={ariaCurrent}>
            Home
          </NavLink>
          <NavLink to="/events" className={linkClass} aria-current={ariaCurrent}>
            Events
          </NavLink>
          <NavLink to="/about" className={linkClass} aria-current={ariaCurrent}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass} aria-current={ariaCurrent}>
            Contact
          </NavLink>
          <span className={styles.underline} aria-hidden="true" />
        </nav>

        <div className={styles.actions}>
          <NavLink to="/create-event" className={`${styles.btn} ${styles.btnLink}`} aria-current={ariaCurrent}>
            Create Event
          </NavLink>
          <NavLink to="/sign-in" className={`${styles.btn} ${styles.btnLink}`} aria-current={ariaCurrent}>
            Login
          </NavLink>
          <NavLink to="/sign-up" className={`${styles.btn} ${styles.btnPrimary}`} aria-current={ariaCurrent}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
}
