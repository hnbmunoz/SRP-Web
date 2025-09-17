import React from 'react';
import { cn } from '../../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

const iconColorClasses = {
  default: 'text-gray-500',
  primary: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
  info: 'text-cyan-500',
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = 'default',
  trend,
  className,
  onClick,
}) => {
  const isClickable = !!onClick;

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition-all duration-200',
        isClickable && 'cursor-pointer hover:shadow-md hover:border-gray-300',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className={cn('flex-shrink-0', iconColorClasses[iconColor])}>
                {icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600 truncate">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
            
            {trend && (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatCard };