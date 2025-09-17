import React from 'react';
import { cn } from '../../../utils/cn';

export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  className,
  labelClassName,
  errorClassName,
  description,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className={cn('text-sm font-medium text-gray-700', labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      {error && (
        <p className={cn('text-xs text-red-600', errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
};

export { FormField };