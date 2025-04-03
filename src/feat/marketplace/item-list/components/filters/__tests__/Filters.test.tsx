import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Filters from '../index';

describe('Filters', () => {
  const defaultProps = {
    filters: {
      search: '',
      priceRange: [0, 400],
      tier: '',
      theme: undefined,
      time: null,
      price: null,
      type: null,
      rarity: null,
      category: null,
    },
    onFilterChange: jest.fn(),
    onFilterReset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter sections', () => {
    render(<Filters {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Quick search')).toBeInTheDocument();
    expect(screen.getByText('PRICE')).toBeInTheDocument();
    expect(screen.getByText('TIER')).toBeInTheDocument();
    expect(screen.getByText('THEME')).toBeInTheDocument();
    expect(screen.getByText('TIME')).toBeInTheDocument();
  });

  it('handles search input changes', async () => {
    render(<Filters {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Quick search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      ...defaultProps.filters,
      search: 'test search',
    });
  });

  it('handles price range changes', () => {
    render(<Filters {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: [50, 300] } });

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      ...defaultProps.filters,
      priceRange: [50, 300],
    });
  });

  it('calls onFilterReset when reset button is clicked', () => {
    render(<Filters {...defaultProps} />);
    
    const resetButton = screen.getByText('Reset filter');
    fireEvent.click(resetButton);

    expect(defaultProps.onFilterReset).toHaveBeenCalled();
  });
});