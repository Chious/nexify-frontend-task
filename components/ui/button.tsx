import React from 'react';
import clsx from 'clsx';

type BottonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'blue' | 'green' | 'red';
  children: React.ReactNode;
};

export default function Button({
  variant = 'blue',
  children,
  ...props
}: BottonProps) {
  return (
    <button
      className={clsx(
        'rounded-sm p-2 text-white hover:opacity-80',
        variant === 'blue' && 'bg-blue',
        variant === 'green' && 'bg-green',
        variant === 'red' && 'bg-red'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
