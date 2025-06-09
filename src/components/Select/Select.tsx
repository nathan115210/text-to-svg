import React from 'react';
import './Select.scss';
import CustomDropdown from '@/components/Select/CustomDropdown';

export interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  defaultValue: string;
  dropdownGroupLabel: string;
  'data-testid'?: string;
}

const Select: React.FC<SelectProps> = ({ id, label, ...restProps }) => {
  return (
    <div className={'select'}>
      <label htmlFor={id} className="selectLabel">
        {label}
      </label>
      <CustomDropdown id={id} {...restProps} />
    </div>
  );
};

export default React.memo(Select);
