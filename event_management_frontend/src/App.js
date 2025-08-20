import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import SelectInterestsPage from './pages/SelectInterests/SelectInterestsPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

/**
 * Root application with theme toggle and router.
 * Integrates shared Header and Footer across pages and uses React Router for navigation.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

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
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/select-interests" element={<SelectInterestsPage />} />
          <Route path="/events" element={<Placeholder title="Events" />} />
          <Route path="/about" element={<Placeholder title="About" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          <Route path="/create-event" element={<Placeholder title="Create Event" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
