'use client';

import React from 'react';
import './IconButton.scss';

export interface IconButtonProps {
  /** Icon component to render inside the button */
  icon: React.FC<{ className?: string }>;
  /** Click handler */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label (for screen readers) */
  ariaLabel: string;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
}

export default function IconButton({
  icon: Icon,
  onClick,
  ariaLabel,
  type = 'button',
  disabled = false,
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`iconButton ${disabled ? 'iconButton--disabled' : ''}`}
    >
      <Icon className="iconButton__icon" />
    </button>
  );
}
