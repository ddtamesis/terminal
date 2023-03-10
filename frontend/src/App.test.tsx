import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { TEXT_app_header_accessible_name } from './App';

/**
 * Tests App's header is shown in document, as expected
 */
test('renders welcome header', () => {
  render(<App />);
  const headerElement = screen.getByRole("banner", {name: TEXT_app_header_accessible_name});
  expect(headerElement).toBeInTheDocument();
});
