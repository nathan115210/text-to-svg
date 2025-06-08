'use client';
import React from 'react';
import { ChevronDownIcon } from '@/components/Icons/Icons';

interface CustomDropdownProps {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  groupLabel?: string;
  'data-testid'?: string;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const { id, options, value, onChange, defaultValue, groupLabel } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option === value);

  return (
    <div className="customDropdown" ref={dropdownRef} id={id}>
      <button
        className="dropdownTrigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        data-testid={props['data-testid']}
      >
        <span className={selectedOption ? 'selectedText' : 'defaultValueText'}>
          {selectedOption || defaultValue}
        </span>
        <ChevronDownIcon
          className={`dropdownIcon ${isOpen ? 'dropdownIconOpen' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="dropdownMenu">
          {groupLabel && <div className="dropdownHeader">{groupLabel}</div>}
          <div className="dropdownOptions">
            {options.map((option) => {
              return (
                <button
                  key={option}
                  className={`dropdownOption ${
                    value === option ? 'dropdownOptionSelected' : ''
                  }`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
