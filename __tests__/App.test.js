/* This file is for testing the App component */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App'; 

import { MemoryRouter } from 'react-router-dom';


// Test UserDisplay Route
describe('App Component', () => {
    it('renders UserDisplay component when navigating to the root path', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      });
  });

  // Test for App h1 heading 
  it("should ensure the page is rendered", () => {
    render( <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>);

    expect(screen.getByText('Spaced Recall')).toBeInTheDocument();
  });

  