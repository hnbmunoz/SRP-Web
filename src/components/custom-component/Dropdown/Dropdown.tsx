import React from 'react';
import Select, {
  components,
  type SingleValue,
  type MultiValue,
  type ActionMeta,
  type StylesConfig,
  type DropdownIndicatorProps,
  type ClearIndicatorProps,
  type InputActionMeta,
  type OptionProps,
  type SingleValueProps
} from 'react-select';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string | number;
  label: string;
  isDisabled?: boolean;
  color?: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: DropdownOption | DropdownOption[] | null;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'filled';
  icon?: React.ReactNode;
  className?: string;
  onChange?: (
    newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
    actionMeta: ActionMeta<DropdownOption>
  ) => void;
  onInputChange?: (inputValue: string, actionMeta: InputActionMeta) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  maxMenuHeight?: number;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  closeMenuOnSelect?: boolean;
  hideSelectedOptions?: boolean;
  noOptionsMessage?: (obj: { inputValue: string }) => string;
  loadingMessage?: (obj: { inputValue: string }) => string;
}

// Custom dropdown indicator component
const DropdownIndicator = (props: DropdownIndicatorProps<DropdownOption>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className={styles.dropdownIcon} />
    </components.DropdownIndicator>
  );
};

// Custom clear indicator component
const ClearIndicator = (props: ClearIndicatorProps<DropdownOption>) => {
  return (
    <components.ClearIndicator {...props}>
      <XMarkIcon className={styles.clearIcon} />
    </components.ClearIndicator>
  );
};

// Custom option component to support icons
const Option = (props: OptionProps<DropdownOption>) => {
  const { data, children } = props;
  return (
    <components.Option {...props}>
      <div className={styles.optionContent}>
        {data.icon && <span className={styles.optionIcon}>{data.icon}</span>}
        <span>{children}</span>
      </div>
    </components.Option>
  );
};

// Custom single value component to support icons
const SingleValue = (props: SingleValueProps<DropdownOption>) => {
  const { data, children } = props;
  return (
    <components.SingleValue {...props}>
      <div className={styles.singleValueContent}>
        {data.icon && <span className={styles.singleValueIcon}>{data.icon}</span>}
        <span>{children}</span>
      </div>
    </components.SingleValue>
  );
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  placeholder = 'Select an option...',
  isMulti = false,
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  isLoading = false,
  required = false,
  error,
  helperText,
  size = 'medium',
  variant = 'default',
  icon,
  className = '',
  onChange,
  onInputChange,
  onMenuOpen,
  onMenuClose,
  onFocus,
  onBlur,
  maxMenuHeight = 300,
  menuPlacement = 'auto',
  closeMenuOnSelect = true,
  hideSelectedOptions = false,
  noOptionsMessage = ({ inputValue }) => 
    inputValue ? `No options found for "${inputValue}"` : 'No options available',
  loadingMessage = ({ inputValue }) => 
    inputValue ? `Searching for "${inputValue}"...` : 'Loading...'
}) => {
  // Generate custom styles for react-select
  const customStyles: StylesConfig<DropdownOption, boolean> = {
    control: (provided) => ({
      ...provided,
      minHeight: size === 'small' ? '36px' : size === 'large' ? '52px' : '44px',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      '&:hover': {
        border: 'none'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: size === 'small' ? '0 8px' : size === 'large' ? '0 16px' : '0 12px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      paddingRight: size === 'small' ? '8px' : size === 'large' ? '16px' : '12px',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
      maxHeight: maxMenuHeight,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'var(--primary-color)' 
        : state.isFocused 
        ? 'rgba(0, 123, 186, 0.1)' 
        : 'transparent',
      color: state.isSelected ? 'white' : 'var(--text-primary)',
      cursor: 'pointer',
      borderRadius: '4px',
      margin: '2px 0',
      padding: '8px 12px',
      '&:hover': {
        backgroundColor: state.isSelected 
          ? 'var(--primary-color)' 
          : 'rgba(0, 123, 186, 0.1)',
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--text-secondary)',
      opacity: 0.7,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--text-primary)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 123, 186, 0.1)',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--primary-color)',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'var(--primary-color)',
      '&:hover': {
        backgroundColor: 'var(--primary-color)',
        color: 'white',
      }
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: 'var(--text-secondary)',
      fontStyle: 'italic',
    }),
    loadingMessage: (provided) => ({
      ...provided,
      color: 'var(--text-secondary)',
    }),
  };

  const containerClasses = [
    styles.dropdownContainer,
    styles[size],
    styles[variant],
    error ? styles.error : '',
    isDisabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.dropdownLabel}>
          {icon && <span className={styles.labelIcon}>{icon}</span>}
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.selectWrapper}>
        <Select<DropdownOption, boolean>
          options={options}
          value={value}
          onChange={onChange}
          onInputChange={onInputChange}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isLoading={isLoading}
          maxMenuHeight={maxMenuHeight}
          menuPlacement={menuPlacement}
          closeMenuOnSelect={closeMenuOnSelect}
          hideSelectedOptions={hideSelectedOptions}
          noOptionsMessage={noOptionsMessage}
          loadingMessage={loadingMessage}
          styles={customStyles}
          components={{
            DropdownIndicator,
            ClearIndicator,
            Option,
            SingleValue,
          }}
          className={styles.reactSelect}
          classNamePrefix="react-select"
        />
      </div>

      {(error || helperText) && (
        <div className={styles.messageContainer}>
          {error && <span className={styles.errorMessage}>{error}</span>}
          {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
        </div>
      )}
    </div>
  );
};

export default Dropdown;