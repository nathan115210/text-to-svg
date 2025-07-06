'use client';

import React, { useState, useRef, useEffect } from 'react';
import './BottomSheetModal.scss';
import { ChevronUpIcon, ChevronDownIcon } from '@/components/Icons/Icons';
import IconButton from '@/components/IconButton/IconButton';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';

const BottomSheetModal = ({
  children,
  defaultOpen,
  onClose,
  hideTrigger,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onClose?: () => void;
  hideTrigger?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  console.log('open', open);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  // Toggle open/close when the button is clicked
  const handleToggle = () => setOpen(!open);

  // Close when clicking outside
  useClickOutside(sheetRef, handleClose);
  // Close when pressing the Escape key
  useEscapeKey(handleClose);

  // Update internal state when defaultOpen prop changes
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <div
      ref={sheetRef}
      className={`bottom-sheet-modal ${open ? 'open' : ''} ${hideTrigger ? 'hide-trigger' : ''}`}
    >
      {!hideTrigger && (
        <IconButton
          icon={open ? ChevronDownIcon : ChevronUpIcon}
          onClick={handleToggle}
          ariaLabel={open ? 'Collapse menu' : 'Expand menu'}
        />
      )}
      {open && <div className="sheet-content">{children}</div>}
    </div>
  );
};

export default BottomSheetModal;
