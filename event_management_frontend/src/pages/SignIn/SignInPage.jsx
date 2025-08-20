import React, { useState } from 'react';
import styles from './SignInPage.module.css';
import '../../styles/common.css';
import { useAuthModals } from '../../App';

/**
 * SignIn screen with:
 * - Password visibility toggle
 * - Social buttons and submit console logs
 * - Link to Sign Up switches modal
 */
// PUBLIC_INTERFACE
export default function SignInPage() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const authModals = useAuthModals();

  const togglePwd = () => setPwdVisible((v) => !v);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toast = (msg) => console.log(msg);

  const onSubmit = (e) => {
    e.preventDefault();
    toast('Login clicked');
  };

  return (
    <main className={styles.screen} aria-label="Sign In Page">
      <section className={styles.leftPane}>
        <div className={styles.logo}>
          <div className={styles.logoTicket} aria-hidden="true" />
          <div className={styles.logoText}>Eventify</div>
        </div>

        <h1 className={styles.heroText}>
          Discover tailored events.
          <br />
          Sign in for personalized recommendations today!
        </h1>
      </section>

      <section className={styles.rightPane}>
        <header className={styles.paneHeader}>
          <h2 className={styles.paneTitle}>Login</h2>
          <button
            className={styles.btnClose}
            aria-label="Close"
            onClick={() => authModals?.closeAuthModal?.()}
          >
            <span className="icon-close" aria-hidden="true" />
          </button>
        </header>

        <div className={styles.authActions}>
          <button className={styles.socialBtn} onClick={() => toast('Login with Google clicked')}>
            <span className="icon-google" aria-hidden="true">
              <span className="g-arc g-blue" />
              <span className="g-arc g-red" />
              <span className="g-arc g-yellow" />
              <span className="g-arc g-green" />
            </span>
            <span className={styles.socialText}>Login with Google</span>
          </button>

        <button className={styles.socialBtn} onClick={() => toast('Login with Facebook clicked')}>
            <span className="icon-facebook" aria-hidden="true">
              <span className="fb-disc" />
              <span className="fb-f" />
            </span>
            <span className={styles.socialText}>Login with Facebook</span>
          </button>
        </div>

        <div className={styles.orSeparator}>
          <hr className="hr-line" />
          <div className={styles.orText}>OR</div>
          <hr className="hr-line" />
        </div>

        <form className={styles.loginForm} onSubmit={onSubmit}>
          <div className={styles.formField}>
            <label className="input-label" htmlFor="email">E-mail Address</label>
            <div className="input-field">
              <input id="email" name="email" type="email" placeholder="Enter your e-mail" value={form.email} onChange={onChange} />
            </div>
          </div>

          <div className={styles.formField}>
            <label className="input-label" htmlFor="password">Password</label>
            <div className={`input-field ${styles.passwordField}`}>
              <input id="password" name="password" type={pwdVisible ? 'text' : 'password'} placeholder="Enter password" value={form.password} onChange={onChange} />
              <button
                type="button"
                className={`${styles.passwordToggle} ${pwdVisible ? styles.passwordTogglePressed : ''}`}
                onClick={togglePwd}
                aria-label="Toggle password visibility"
                aria-pressed={pwdVisible ? 'true' : 'false'}
              >
                <span className={`icon-eye ${pwdVisible ? 'icon-eye-slash' : ''}`} aria-hidden="true" />
              </button>
            </div>
          </div>

          <button id="btn-login-submit" className={styles.btnPrimaryWide} type="submit">Login</button>
        </form>

        <div className={styles.signupRow}>
          <span className={styles.signupText}>Don’t have an account?</span>
          <button
            id="btn-signup"
            className={styles.signupLink}
            onClick={() => {
              authModals?.openSignUp?.();
            }}
          >
            Sign up
          </button>
        </div>
      </section>
    </main>
  );
}
