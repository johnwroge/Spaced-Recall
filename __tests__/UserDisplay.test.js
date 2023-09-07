import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDisplay from '../src/UserDisplay'

import { MemoryRouter } from 'react-router-dom';


// Test UserDisplay Route
describe('User Display', () => {
    it('renders UserDisplay component when navigating to the root path', () => {
      render(
        <UserDisplay />
      );
      });
  });