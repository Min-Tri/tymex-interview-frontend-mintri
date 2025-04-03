import React from 'react';
import { render, screen } from '@testing-library/react';
import Empty from '../index';

describe('Empty Component', () => {
  it('renders with the default message', () => {
    render(<Empty />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders with a custom message', () => {
    render(<Empty message="Custom message" />);
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });
});