import React from 'react';
import { screen, render, fireEvent, userEvent } from '@testing-library/react';
import Card from '../src/Card';

describe('Card Component', () => {
  const mockProps = {
    id: 1,
    title: 'Test Title',
    definition: 'Test Definition',
    bin: 0,
    timeRemaining: 10,
    incorrectTimes: 2,
    handleCorrect: jest.fn(), 
    updateIncorrect: jest.fn(), 
    updateBin: jest.fn(),
    handleClick: jest.fn()
  };


  it('Should show definition button and toggle definition to be rendered', () => {
    const { getByText } = render(<Card {...mockProps} />);
    const button = screen.getByTestId('show-definition');
    expect(button).toBeInTheDocument();    
    fireEvent.click(button);
    expect(screen.getByTestId('Definition')).toBeInTheDocument();
  });

  it('Should initially display Word, Bin, Remaining Time and Incorrect Times', () => {
    const { getByText } = render(<Card {...mockProps} />);
    expect(getByText('Word: Test Title')).toBeInTheDocument();
    expect(getByText('Bin: 0')).toBeInTheDocument();
    expect(getByText('Remaining Time: 10')).toBeInTheDocument();
    expect(getByText('Incorrect Times: 2')).toBeInTheDocument();
  });


  xit('Should call handleCorrect if got it button is clicked', () => {
    const { getByText } = render(<Card {...mockProps} />);
    const show = screen.getByTestId('show-definition');
    fireEvent.click(show);
    const button = screen.getByTestId('Got-It');
    fireEvent.click(button);
    expect(mockProps.handleCorrect).toHaveBeenCalledWith(1);
  });



  xit('Should call updateIncorrect if did not get it button is clicked', () => {
    const { getByText } = render(<Card {...mockProps} />);
    const show = screen.getByTestId('show-definition');
    fireEvent.click(show);

    const button = screen.getByTestId('Did-Not');
    fireEvent.click(button);
    expect(mockProps.updateIncorrect).toHaveBeenCalledWith(1);
  });


});

