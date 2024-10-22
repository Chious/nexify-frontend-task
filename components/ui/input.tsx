'use client';

import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, useState } from 'react';

type InputType = ComponentPropsWithoutRef<'input'> & {
  type: 'text' | 'date' | 'range';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rule: RegExp;
  errorMsg?: string;
};

const Input: React.FC<InputType> = ({
  type,
  value,
  onChange,
  rule,
  errorMsg,
  ...props
}) => {
  const [error, setError] = useState<string>('');
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      if (rule) {
        const error = rule.test(e.target.value);

        if (error) {
          setError(errorMsg || 'Invalid Input');
        } else {
          setError('');
        }
      }
    },
    [onChange, rule, errorMsg]
  );

  switch (type) {
    case 'text':
      return (
        <>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            {...props}
            className="w-full p-2 border rounded-md outline-none"
          />
          <p className={clsx('text-red-500', { invisible: !error })}>
            {errorMsg}
          </p>
        </>
      );
    case 'date':
      return (
        <>
          <input
            type="date"
            value={value}
            onChange={handleChange}
            {...props}
            className="w-full p-2 border rounded-md"
            max={new Date().toISOString().split('T')[0]}
          />
          <p className={clsx('text-red-500', { invisible: !error })}>
            {errorMsg}
          </p>
        </>
      );
    case 'range':
      return (
        <>
          <input
            type="range"
            value={value}
            onChange={handleChange}
            {...props}
            className="w-full p-2 border rounded-md"
            min={0}
            max={100000}
          />
          <p className={clsx('text-red-500', { invisible: !error })}>
            {errorMsg}
          </p>
        </>
      );
    default:
      return null;
  }
};

export default Input;
