import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.css';
import '../../styles/common.css';

/**
 * SignIn screen with:
 * - Password visibility toggle
 * - Social buttons and submit console logs
 * - Link to Sign Up via router
 */
// PUBLIC_INTERFACE
export default function SignInPage() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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
          <button className={styles.btnClose} aria-label="Close" onClick={() => toast('Close clicked')}>
            <span className={styles.iconClose} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.authActions}>
          <button className={styles.socialBtn} onClick={() => toast('Login with Google clicked')}>
            <span className={styles.iconGoogle} aria-hidden="true">
              <span className={`${styles.iconGoogleArc} ${styles.gBlue}`} />
              <span className={`${styles.iconGoogleArc} ${styles.gRed}`} />
              <span className={`${styles.iconGoogleArc} ${styles.gYellow}`} />
              <span className={`${styles.iconGoogleArc} ${styles.gGreen}`} />
            </span>
            <span className={styles.socialText}>Login with Google</span>
          </button>

          <button className={styles.socialBtn} onClick={() => toast('Login with Facebook clicked')}>
            <span className={styles.iconFacebook} aria-hidden="true">
              <span className={styles.fbDisc} />
              <span className={styles.fbF} />
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
                <span className={styles.iconEye} aria-hidden="true" />
              </button>
            </div>
          </div>

          <button id="btn-login-submit" className={styles.btnPrimaryWide} type="submit">Login</button>
        </form>

        <div className={styles.signupRow}>
          <span className={styles.signupText}>Don’t have an account?</span>
          <button id="btn-signup" className={styles.signupLink} onClick={() => navigate('/sign-up')}>Sign up</button>
        </div>
      </section>
    </main>
  );
}
