import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import SelectInterestsPage from './pages/SelectInterests/SelectInterestsPage';

/**
 * Root application with theme toggle and router.
 * Renders simple nav links for moving between extracted screens.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

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
        {/* Simple dev navigation */}
        <nav style={{ paddingTop: 80, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/select-interests">Select Interests</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/select-interests" element={<SelectInterestsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
