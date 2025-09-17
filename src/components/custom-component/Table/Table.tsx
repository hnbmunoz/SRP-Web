import React from 'react';
import { cn } from '../../../utils/cn';

export interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (record: T, index: number) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  bordered?: boolean;
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const Table = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyText = 'No data available',
  emptyIcon,
  onRowClick,
  rowKey = 'id',
  className,
  size = 'md',
  striped = true,
  bordered = true,
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  const getValue = (record: T, key: string) => {
    return key.split('.').reduce((obj, k) => obj?.[k], record);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        {emptyIcon && <div className="mb-4 text-4xl">{emptyIcon}</div>}
        <p className="text-lg font-medium">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider',
                  sizeClasses[size],
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  bordered && 'border-b border-gray-200'
                )}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(striped && 'divide-y divide-gray-200')}>
          {data.map((record, index) => (
            <tr
              key={getRowKey(record, index)}
              className={cn(
                'transition-colors',
                onRowClick && 'cursor-pointer hover:bg-gray-50',
                striped && index % 2 === 0 && 'bg-white',
                striped && index % 2 === 1 && 'bg-gray-50'
              )}
              onClick={() => onRowClick?.(record, index)}
            >
              {columns.map((column) => {
                const value = getValue(record, column.key);
                const content = column.render
                  ? column.render(value, record, index)
                  : value;

                return (
                  <td
                    key={column.key}
                    className={cn(
                      'px-6 py-4 whitespace-nowrap',
                      sizeClasses[size],
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      bordered && 'border-b border-gray-200'
                    )}
                  >
                    {content as React.ReactNode}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };