import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../index';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  it('renders the input with a label', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders the input with an error state', () => {
    render(<Input error helperText="Error message" />);
    expect(screen.getByText('Error message')).toHaveClass('text-red-600');
  });

  it('renders the input without an error state', () => {
    render(<Input helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toHaveClass('text-gray-500');
  });
});