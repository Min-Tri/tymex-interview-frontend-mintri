import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../index';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Footer Component', () => {
  it('renders navigation section with all links', () => {
    render(<Footer />);
    
    const navigationLinks = [
      'Home', 'Whitepaper', 'About us', 'FAQs',
      'Marketplace', 'News', 'Our teams', 'Community', 'Roadmap'
    ];
    
    navigationLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('01234568910')).toBeInTheDocument();
    expect(screen.getByText('tymex-talent@tyme.com')).toBeInTheDocument();
  });

  it('renders subscription section', () => {
    render(<Footer />);
    expect(screen.getByText('SUBSCRIBE TO RECEIVE OUR LATEST UPDATE')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders copyright and legal links', () => {
    render(<Footer />);
    expect(screen.getByText(/©2023 Tyme - Edit. All Rights reserved./)).toBeInTheDocument();
    ['Security', 'Legal', 'Privacy'].forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});