import React from 'react';
import { render } from '@testing-library/react';
import Skeleton from '../index';

describe('Skeleton Component', () => {
  it('renders the correct number of skeleton items', () => {
    const { container } = render(<Skeleton count={5} />);
    expect(container.querySelectorAll('.ant-card').length).toBe(5);
  });

  it('renders the default number of skeleton items when count is not provided', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelectorAll('.ant-card').length).toBe(8);
  });
});