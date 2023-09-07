/* This file is for testing the CreateCard component*/

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateCard from '../src/CreateCard'; 


describe('CreateCard Component', () => {
    it('should handle user input', () => {
      const formData = {
        title: '',
        definition: '',
      };
  
      const handleChange = (e) => {
        formData[e.target.name] = e.target.value;
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
      };
  
      const { getByPlaceholderText } = render(
        <CreateCard formData={formData} handleClick={handleChange} handleSubmit={handleSubmit} />
      );
  
      const titleInput = getByPlaceholderText('Add a new flash card title here');
      const definitionInput = getByPlaceholderText('Add the definition to the word here');
  
      fireEvent.change(titleInput, { target: { value: 'This is a test card' } });
      fireEvent.change(definitionInput, { target: { value: 'Test description' } });
  
      expect(formData.title).toBe('This is a test card');
      expect(formData.definition).toBe('Test description');
    });
  });
  