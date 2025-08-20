import React, { useState } from 'react';
import styles from './SignUpPage.module.css';
import '../../styles/common.css';
import { useAuthModals } from '../../App';

/**
 * SignUp screen from extraction, with:
 * - Password visibility toggle
 * - Social buttons console logs
 * - Create Account button console log
 * - Link to Sign In switches modal
 */
// PUBLIC_INTERFACE
export default function SignUpPage() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const authModals = useAuthModals();

  const togglePwd = () => setPwdVisible((v) => !v);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toast = (msg) => console.log(msg); // mimic

  const onSubmit = (e) => {
    e.preventDefault();
    toast('Create Account clicked');
  };

  return (
    <main className={styles.screen} aria-label="Sign Up">
      <section className={styles.leftPane}>
        <div className={styles.logo}>
          <div className={styles.logoTicket} aria-hidden="true" />
          <div className={styles.logoText}>Eventify</div>
        </div>

        <h1 className={styles.heroText}>
          Discover tailored events.
          <br />
          Sign up for personalized recommendations today!
        </h1>
      </section>

      <section className={styles.rightPane}>
        <header className={styles.paneHeader}>
          <h2 className={styles.paneTitle}>Create Account</h2>
          <button
            className={styles.btnClose}
            aria-label="Close"
            onClick={() => authModals?.closeAuthModal?.()}
          >
            <span className="icon-close" aria-hidden="true" />
          </button>
        </header>

        <div className={styles.authActions}>
          <button className={styles.socialBtn} onClick={() => toast('Sign up with Google clicked')}>
            <span className="icon-google" aria-hidden="true">
              <span className="g-arc g-blue" />
              <span className="g-arc g-red" />
              <span className="g-arc g-yellow" />
              <span className="g-arc g-green" />
            </span>
            <span className={styles.socialText}>Sign up with Google</span>
          </button>

          <button className={styles.socialBtn} onClick={() => toast('Sign up with Facebook clicked')}>
            <span className="icon-facebook" aria-hidden="true">
              <span className="fb-disc" />
              <span className="fb-f" />
            </span>
            <span className={styles.socialText}>Sign up with Facebook</span>
          </button>
        </div>

        <div className={styles.orSeparator}>
          <hr className="hr-line" />
          <div className={styles.orText}>OR</div>
          <hr className="hr-line" />
        </div>

        <form className={styles.createForm} onSubmit={onSubmit}>
          <div className={styles.formField}>
            <label className="input-label" htmlFor="full-name">Full Name</label>
            <div className="input-field">
              <input id="full-name" name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={onChange} />
            </div>
          </div>

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

          <button id="btn-create-account" className={styles.btnPrimaryWide} type="submit">Create Account</button>
        </form>

        <div className={styles.loginRow}>
          <span className={styles.loginText}>Already have an account?</span>
          <button
            id="btn-login"
            className={styles.loginLink}
            onClick={() => {
              authModals?.openSignIn?.();
            }}
          >
            Log In
          </button>
        </div>
      </section>
    </main>
  );
}
