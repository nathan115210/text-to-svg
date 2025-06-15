'use client';

import React, { useState, useRef } from 'react';
import './BottomSheetModal.scss';
import { ChevronUpIcon, ChevronDownIcon } from '@/components/Icons/Icons';
import IconButton from '@/components/IconButton/IconButton';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';

const BottomSheetModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Toggle open/close when the button is clicked
  const handleToggle = () => setOpen(!open);

  // Close when clicking outside
  useClickOutside(sheetRef, () => setOpen(false));
  // Close when pressing the Escape key
  useEscapeKey(() => setOpen(false));
  return (
    <div ref={sheetRef} className={`bottom-sheet-modal ${open ? 'open' : ''}`}>
      <IconButton
        icon={open ? ChevronDownIcon : ChevronUpIcon}
        onClick={handleToggle}
        ariaLabel={open ? 'Collapse menu' : 'Expand menu'}
      />
      {open && <div className="sheet-content">{children}</div>}
    </div>
  );
};

export default BottomSheetModal;
