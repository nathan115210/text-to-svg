import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton, { SkeletonType } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders with default type (Text)', () => {
    render(<Skeleton />);
    const wrapper = screen.getByTestId('skeleton-wrapper');
    expect(wrapper).toHaveClass('skeleton-wrapper', SkeletonType.Text);
  });

  it('renders with variant prop', () => {
    render(<Skeleton variant={SkeletonType.Card} />);
    const wrapper = screen.getByTestId('skeleton-wrapper');
    expect(wrapper).toHaveClass('skeleton-wrapper', SkeletonType.Card);
  });

  it('renders inner skeleton element', () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
  });
});
