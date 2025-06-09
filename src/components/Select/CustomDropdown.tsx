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

interface DropdownOptionsProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

const DropdownOptions = React.memo<DropdownOptionsProps>(
  ({ options, value, onSelect }) => (
    <div className="dropdownOptions">
      {options.map((option) => (
        <button
          key={option}
          className={`dropdownOption ${
            value === option ? 'dropdownOptionSelected' : ''
          }`}
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  ),
  (prev, next) =>
    prev.value === next.value &&
    prev.options.length === next.options.length &&
    prev.options.every((o, i) => o === next.options[i]),
);
DropdownOptions.displayName = 'DropdownOptions';

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

  const selectedOption = options.find((o) => o === value) || defaultValue;

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div className="customDropdown" ref={dropdownRef} id={id}>
      <button
        className="dropdownTrigger"
        onClick={() => setIsOpen((o) => !o)}
        type="button"
        data-testid={props['data-testid']}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={
            selectedOption === defaultValue
              ? 'defaultValueText'
              : 'selectedText'
          }
        >
          {selectedOption}
        </span>
        <ChevronDownIcon
          className={`dropdownIcon ${isOpen ? 'dropdownIconOpen' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="dropdownMenu">
          {groupLabel && <div className="dropdownHeader">{groupLabel}</div>}
          <DropdownOptions
            options={options}
            value={value}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CustomDropdown);
