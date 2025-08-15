import React from 'react';
import styles from './FormField.module.scss';
import { useThemeClass } from '../../../store/themeStore';

export interface FormFieldProps {
  label: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'password';
  placeholder?: string;
  isEditing?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  type = 'text',
  placeholder,
  isEditing = false,
  isLoading = false,
  icon,
  onChange,
  className = '',
  required = false,
  disabled = false
}) => {
  const { themeClass } = useThemeClass();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const renderLoadingPlaceholder = () => (
    <div className={styles.loadingPlaceholder}>
      <div className={styles.loadingBar}></div>
    </div>
  );

  const renderValue = () => {
    if (isLoading) {
      return renderLoadingPlaceholder();
    }

    if (isEditing) {
      return (
        <input
          type={type}
          value={value}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          onChange={handleChange}
          className={`${styles.formInput} ${disabled ? styles.disabled : ''}`}
          required={required}
          disabled={disabled}
        />
      );
    }

    return (
      <span className={`${styles.formValue} ${!value ? styles.empty : ''}`}>
        {value || placeholder || 'Not provided'}
      </span>
    );
  };

  return (
    <div className={`${styles.formGroup} ${styles[themeClass]} ${className} ${isLoading ? styles.loading : ''}`}>
      <label className={styles.formLabel}>
        {icon && <span className={styles.fieldIcon}>{icon}</span>}
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {renderValue()}
    </div>
  );
};

export default FormField;