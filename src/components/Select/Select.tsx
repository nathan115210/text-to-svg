import React from 'react';
import './Select.scss';
import CustomDropdown from '@/components/Select/CustomDropdown';

export interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void; // ✅ updated type
  options: string[];
  placeholder: string;
  dropdownGroupLabel: string;
}

export default function Select(props: SelectProps) {
  const { id, label, ...restProps } = props;

  return (
    <div className={'select'}>
      <label htmlFor={id} className="selectLabel">
        {label}
      </label>

      <CustomDropdown id={id} {...restProps} />
    </div>
  );
}
