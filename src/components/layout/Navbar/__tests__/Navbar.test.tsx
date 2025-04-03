import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('Navbar Component', () => {
  it('renders all menu items', () => {
    render(<Navbar />);
    
    const expectedItems = ['HOME', 'ABOUT US', 'OUR TEAMS', 'MARKETPLACE', 'ROADMAP', 'WHITEPAPER'];
    expectedItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders connect wallet button', () => {
    render(<Navbar />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('renders language selector with default value', () => {
    render(<Navbar />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('has marketplace as default selected menu item', () => {
    const { container } = render(<Navbar />);
    const marketplaceItem = screen.getByText('MARKETPLACE');
    expect(marketplaceItem.parentElement).toHaveClass('ant-menu-item-selected');
  });
});