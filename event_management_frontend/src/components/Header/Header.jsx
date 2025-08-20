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
  return (
    <header className={styles.header} role="banner" aria-label="Header">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Eventify Home">
          <span className={styles.logoTicket} aria-hidden="true" />
          <span className={styles.logoText}>Eventify</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
            Home
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            Events
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            Contact
          </NavLink>
          <span className={styles.underline} aria-hidden="true" />
        </nav>

        <div className={styles.actions}>
          <NavLink to="/create-event" className={`${styles.btn} ${styles.btnLink}`}>
            Create Event
          </NavLink>
          <NavLink to="/sign-in" className={`${styles.btn} ${styles.btnLink}`}>
            Login
          </NavLink>
          <NavLink to="/sign-up" className={`${styles.btn} ${styles.btnPrimary}`}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
}
