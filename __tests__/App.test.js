import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App'; // Import your component

import { MemoryRouter } from 'react-router-dom';

test('renders an h1 element with the text Spaced Repetition Flashcard Application', () => {
    render(<App />);
    
    const h1Element = screen.getByText('Spaced Repetition Flashcard Application');
        expect(h1Element).toBeInTheDocument();
  });


  describe('App Component', () => {
    it('renders UserDisplay component when navigating to the root path', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      });
  });