import React from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { cn } from '../../../utils/cn';
import { Button } from '../Button';
import { Input } from '../Form';

export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'checkbox' | 'text' | 'date';
  options?: Array<{ value: string; label: string }>;
  value?: any;
  placeholder?: string;
}

export interface SearchFilterProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onFilterChange?: (key: string, value: any) => void;
  onClearFilters?: () => void;
  showClearButton?: boolean;
  className?: string;
  compact?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  onFilterChange,
  onClearFilters,
  showClearButton = true,
  className,
  compact = false,
}) => {
  const hasActiveFilters = filters.some(filter => {
    if (filter.type === 'checkbox') return filter.value;
    return filter.value && filter.value !== '';
  });

  const renderFilter = (filter: FilterOption) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            key={filter.key}
            value={filter.value || ''}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value || undefined)}
            className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            <option value="">{filter.placeholder || `All ${filter.label}`}</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div key={filter.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={filter.key}
              checked={filter.value || false}
              onChange={(e) => onFilterChange?.(filter.key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={filter.key} className="text-sm text-gray-700">
              {filter.label}
            </label>
          </div>
        );

      case 'text':
        return (
          <Input
            key={filter.key}
            type="text"
            placeholder={filter.placeholder || filter.label}
            value={filter.value || ''}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
          />
        );

      case 'date':
        return (
          <Input
            key={filter.key}
            type="date"
            value={filter.value || ''}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  if (compact) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="flex-1">
          <Input
            leftIcon={<FaSearch />}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        
        {filters.length > 0 && (
          <div className="flex items-center gap-2">
            {filters.map(renderFilter)}
          </div>
        )}
        
        {showClearButton && hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            icon={<FaTimes />}
          >
            Clear
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900">
          <FaFilter className="text-gray-500" />
          Filters
        </h3>
        {showClearButton && hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Search */}
      <div>
        <Input
          leftIcon={<FaSearch />}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Filters Grid */}
      {filters.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filters.map(filter => (
            <div key={filter.key} className="space-y-2">
              {filter.type !== 'checkbox' && (
                <label className="block text-sm font-medium text-gray-700">
                  {filter.label}
                </label>
              )}
              {renderFilter(filter)}
            </div>
          ))}
        </div>
      )}

      {/* Checkbox filters in separate section */}
      {filters.some(f => f.type === 'checkbox') && (
        <div className="flex flex-wrap gap-4">
          {filters
            .filter(f => f.type === 'checkbox')
            .map(renderFilter)}
        </div>
      )}
    </div>
  );
};

export { SearchFilter };