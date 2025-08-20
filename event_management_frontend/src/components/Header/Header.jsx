import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuthModals } from '../../App';

/**
 * Shared Header component that renders the brand, primary navigation tabs,
 * and action buttons. Uses NavLink to highlight active route.
 * Login and Sign Up open modal dialogs instead of navigating to routes.
 */
// PUBLIC_INTERFACE
export default function Header() {
  const authModals = useAuthModals();

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
          <button
            type="button"
            className={`${styles.btn} ${styles.btnLink}`}
            onClick={() => authModals?.openSignIn?.()}
            aria-haspopup="dialog"
            aria-controls="auth-signin-title"
          >
            Login
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => authModals?.openSignUp?.()}
            aria-haspopup="dialog"
            aria-controls="auth-signup-title"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
