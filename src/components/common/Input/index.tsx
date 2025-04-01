import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import classNames from 'classnames';

export interface CustomInputProps extends AntInputProps {
  error?: boolean;
  label?: string;
  helperText?: string;
}

const Input: React.FC<CustomInputProps> = ({
  className,
  error,
  label,
  helperText,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <AntInput
        className={classNames(
          'w-full px-3 py-2 border rounded-md [.ant-input-affix-wrapper]:!text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:!text-white',
          {
            'border-red-500 focus:ring-red-500 focus:border-red-500': error,
            'border-gray-300': !error,
          },
          className
        )}
        {...props}
      />
      {helperText && (
        <p
          className={classNames('mt-1 text-sm', {
            'text-red-600': error,
            'text-gray-500': !error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;