import './Skeleton.scss';
import React from 'react';

export enum SkeletonType {
  Text = 'text',
  Panel = 'panel',
  Button = 'button',
  Card = 'card',
  Circle = 'circle',
  Rect = 'rect',
  Heading = 'heading',
  Select = 'select',
}

export default function Skeleton({
  variant = SkeletonType.Text,
}: {
  variant?: SkeletonType;
}) {
  return (
    <div
      className={`skeleton-wrapper ${variant}`}
      data-testid="skeleton-wrapper"
    >
      <div className="skeleton" data-testid="skeleton" />
    </div>
  );
}
