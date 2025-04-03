import React from 'react';
import { render, screen } from '@testing-library/react';
import Character from '../character';

describe('Character Component', () => {
  const defaultProps = {
    name: 'Test Character',
    src: '/test-image.jpg',
    alt: 'Test Alt Text',
  };

  it('renders character name in uppercase', () => {
    render(<Character {...defaultProps} />);
    expect(screen.getByText('TEST CHARACTER')).toBeInTheDocument();
  });

  it('renders both images with correct props', () => {
    const { container } = render(<Character {...defaultProps} />);
    const images = container.getElementsByTagName('img');
    
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/images/Group.png');
    expect(images[1]).toHaveAttribute('src', defaultProps.src);
    expect(images[1]).toHaveAttribute('alt', defaultProps.alt);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <Character {...defaultProps} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
  });
});