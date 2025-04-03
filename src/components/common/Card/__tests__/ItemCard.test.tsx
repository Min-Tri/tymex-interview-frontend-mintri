import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from '../index';
import { IItem } from '@/lib/types';

const mockItem:IItem = {
  id: '1',
  name: 'Test Item',
  price: 1.5,
  rarity: 'Epic',
  image: '',
  creator: { name: 'Creator Name', avatar: '' },
  category: 'Hat',
  like: true,
  theme: 'beach',
  createdAt: '2023-01-01',
};

describe('ItemCard Component', () => {
  it('renders the item name and price', () => {
    render(<ItemCard item={mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('1.5 ETH')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when the favorite button is clicked', () => {
    const onToggleFavorite = jest.fn();
    render(<ItemCard item={mockItem} onToggleFavorite={onToggleFavorite} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggleFavorite).toHaveBeenCalledWith('1');
  });
});