import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import SelectInterestsPage from './pages/SelectInterests/SelectInterestsPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';

/**
 * Root application with theme toggle and router.
 * Integrates shared Header and Footer across pages and uses React Router for navigation.
 * Also exposes modal controls for Sign In/Up via context so header buttons can open them.
 */

const ModalContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuthModals() {
  /** Hook to access open/close handlers for SignIn and SignUp modals from nested components. */
  return useContext(ModalContext);
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [openModal, setOpenModal] = useState(null); // 'signin' | 'signup' | null

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const ctxValue = useMemo(
    () => ({
      openSignIn: () => setOpenModal('signin'),
      openSignUp: () => setOpenModal('signup'),
      closeAuthModal: () => setOpenModal(null),
      isSignInOpen: openModal === 'signin',
      isSignUpOpen: openModal === 'signup',
    }),
    [openModal]
  );

  const Placeholder = ({ title }) => (
    <main style={{ minHeight: '50vh', padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-montserrat)', marginTop: 24 }}>{title}</h1>
      <p style={{ color: '#636363' }}>This page is a placeholder for future content.</p>
    </main>
  );

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      <BrowserRouter>
        <ModalContext.Provider value={ctxValue}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Removed full-page /sign-in and /sign-up routes per requirement */}
            <Route path="/select-interests" element={<SelectInterestsPage />} />
            <Route path="/events" element={<Placeholder title="Events" />} />
            <Route path="/about" element={<Placeholder title="About" />} />
            <Route path="/contact" element={<Placeholder title="Contact" />} />
            <Route path="/create-event" element={<Placeholder title="Create Event" />} />
          </Routes>
          <Footer />

          {/* Sign In modal */}
          <Modal
            isOpen={openModal === 'signin'}
            onClose={() => setOpenModal(null)}
            ariaLabelledBy="auth-signin-title"
            ariaDescribedBy="auth-signin-desc"
          >
            <section aria-label="Sign In Dialog Content">
              {/* Provide heading IDs for a11y */}
              <h2 id="auth-signin-title" style={{ position: 'absolute', left: '-9999px' }}>
                Login
              </h2>
              <p id="auth-signin-desc" style={{ position: 'absolute', left: '-9999px' }}>
                Log in to access your account and personalized recommendations.
              </p>
              <SignInPage />
            </section>
          </Modal>

          {/* Sign Up modal */}
          <Modal
            isOpen={openModal === 'signup'}
            onClose={() => setOpenModal(null)}
            ariaLabelledBy="auth-signup-title"
            ariaDescribedBy="auth-signup-desc"
          >
            <section aria-label="Sign Up Dialog Content">
              <h2 id="auth-signup-title" style={{ position: 'absolute', left: '-9999px' }}>
                Create Account
              </h2>
              <p id="auth-signup-desc" style={{ position: 'absolute', left: '-9999px' }}>
                Create a new account to get personalized event recommendations.
              </p>
              <SignUpPage />
            </section>
          </Modal>
        </ModalContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
