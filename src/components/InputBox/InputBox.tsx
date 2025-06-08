'use client';

import React from 'react';
import './InputBox.scss';

export enum InputWarningType {
  INVALID_NUMBER_VALUE = 'Value must be at least 1',
  INVALID_NUMBER_FORMAT = 'Value must be a valid number',
  REQUIRED_FIELD = 'This field is required',
}

// Union of the enum’s keys: 'INVALID_NUMBER_VALUE' | 'REQUIRED_FIELD'
type WarningKey = keyof typeof InputWarningType;

interface InputBoxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange' | 'name'
  > {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number';
  name: string;
  placeholder?: string;
  suffix?: string;
}

export default function InputBox({
  label,
  value,
  onChange,
  type = typeof value === 'number' ? 'number' : 'text',
  name,
  placeholder = '',
  required = false,
  suffix,
  ...rest
}: InputBoxProps) {
  const id = React.useId();
  const isNumber = type === 'number';

  const [inputValue, setInputValue] = React.useState<string | number>(value);
  const [warning, setWarning] = React.useState<WarningKey | null>(null);

  // Sync if parent updates externally
  React.useEffect(() => {
    setInputValue(String(value));
    setWarning(null);

    console.log('value', value, typeof value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (isNumber) {
      // 1) allow empty
      if (raw === '') {
        setInputValue('');
        setWarning(required ? 'REQUIRED_FIELD' : null);
        onChange('');
        return;
      }

      // Detect non-numeric formats (e.g. "+23", letters)
      // Regex: optional decimals, digits only
      if (Number.isNaN(raw)) {
        //TODO: create a helper to cover all /most cases
        setInputValue(raw);
        console.log('invalid');
        setWarning('INVALID_NUMBER_FORMAT');
        return;
      }

      const asNum = Number(raw);

      // 2) non-numeric: show “invalid number” but keep raw so user sees it
      if (Number.isNaN(asNum)) {
        setInputValue(raw);
        setWarning('INVALID_NUMBER_VALUE');
        return;
      }

      // 3) clamp below 1
      if (asNum < 1) {
        setInputValue('1');
        setWarning('INVALID_NUMBER_VALUE');
        onChange(1);
        return;
      }

      // 4) valid ≥ 1
      setInputValue(raw);
      setWarning(null);
      onChange(asNum);
    } else {
      // TEXT MODE
      setInputValue(raw);
      // only warn if required and now empty
      if (required && raw.trim() === '') {
        setWarning('REQUIRED_FIELD');
      } else {
        setWarning(null);
      }
      onChange(raw);
    }
  };

  const handleBlur = () => {
    // If required text field left empty on blur, show “required” warning
    if (!isNumber && required && String(inputValue).trim() === '') {
      setWarning('REQUIRED_FIELD');
    }
  };

  const stopWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // avoid accidental wheel-changes on number fields
    (e.target as HTMLInputElement).blur();
    e.stopPropagation();
  };

  return (
    <div className="inputBox">
      <label className="label" htmlFor={`${name}-${id}`}>
        {label}
      </label>
      <div className="inputWrapper">
        <input
          id={`${name}-${id}`}
          name={name}
          className={`input${warning ? ' input--invalid' : ''}`}
          placeholder={placeholder}
          value={inputValue}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={isNumber ? stopWheel : undefined}
          {...(isNumber
            ? { type: 'number', min: 1, step: 'any', inputMode: 'decimal' }
            : { type: 'text' })}
          {...rest}
        />
        {/*TODO: make this suffix to be selectable*/}
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      {warning && <p className="warning">{InputWarningType[warning]}</p>}
    </div>
  );
}
