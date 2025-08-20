import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  expect(screen.getByText(/Select Interests/i)).toBeInTheDocument();
});
