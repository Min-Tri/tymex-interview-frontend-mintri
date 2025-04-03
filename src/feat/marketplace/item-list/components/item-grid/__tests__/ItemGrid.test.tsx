import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemGrid from '../index';
import { IItem } from '@/lib/types';

const mockItems:IItem[] = [
  { 
    id: '1', 
    name: 'Item 1', 
    price: 100, 
    rarity: 'Common', 
    creator: { name: 'Creator 1',avatar: '' }, 
    image: 'image1.png', 
    category: 'Accessory', 
    like: true, 
    theme: 'beach', 
    createdAt: '2023-01-01' 
  },
  { 
    id: '2', 
    name: 'Item 2', 
    price: 200, 
    rarity: 'Rare', 
    creator: { name: 'Creator 2',avatar:'' }, 
    image: 'image2.png', 
    category: 'Accessory', 
    like: true, 
    theme: 'beach', 
    createdAt: '2023-01-02' 
  },
];

describe('ItemGrid', () => {
  const defaultProps = {
    items: mockItems,
    isLoading: false,
    isError: false,
    hasMore: true,
    onLoadMore: jest.fn(),
    isFetchingMore: false,
  };

  it('renders loading state correctly', () => {
    render(<ItemGrid {...defaultProps} isLoading={true} items={[]} />);
    expect(screen.getByRole('alert')).toBeInTheDocument(); // Spin component
  });

  it('renders error state correctly', () => {
    render(<ItemGrid {...defaultProps} isError={true} items={[]} />);
    expect(screen.getByText('Error loading items')).toBeInTheDocument();
    expect(screen.getByText('Please try again later')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<ItemGrid {...defaultProps} items={[]} />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Try changing your filters')).toBeInTheDocument();
  });

  it('renders items correctly', () => {
    render(<ItemGrid {...defaultProps} />);
    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('calls onLoadMore when load more button is clicked', () => {
    render(<ItemGrid {...defaultProps} />);
    fireEvent.click(screen.getByText('View more'));
    expect(defaultProps.onLoadMore).toHaveBeenCalled();
  });
});