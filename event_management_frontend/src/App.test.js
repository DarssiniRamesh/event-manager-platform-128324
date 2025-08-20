import { render, screen } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('renders integrated header navigation and Home page content', () => {
  render(<App />);

  // Header brand
  expect(screen.getByLabelText(/Eventify Home/i)).toBeInTheDocument();
  // Primary nav links
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Events/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  // Action buttons
  expect(screen.getByRole('link', { name: /Create Event/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Sign Up/i })).toBeInTheDocument();

  // Confirm at least one element from Home page is rendered
  expect(
    screen.getByRole('heading', {
      name: /Don’t miss out!.*Explore the vibrant events happening locally and globally\./i,
      exact: false,
    })
  ).toBeInTheDocument();

  // No "learn react" boilerplate expectation anymore.
});
