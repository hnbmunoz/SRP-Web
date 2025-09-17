import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        // Status-specific variants
        active: "border-transparent bg-green-100 text-green-800",
        inactive: "border-transparent bg-gray-100 text-gray-800",
        pending: "border-transparent bg-yellow-100 text-yellow-800",
        approved: "border-transparent bg-blue-100 text-blue-800",
        paid: "border-transparent bg-green-100 text-green-800",
        cancelled: "border-transparent bg-red-100 text-red-800",
        draft: "border-transparent bg-gray-100 text-gray-800",
        expired: "border-transparent bg-red-100 text-red-800",
        discontinued: "border-transparent bg-gray-100 text-gray-800",
        "in-stock": "border-transparent bg-green-100 text-green-800",
        "low-stock": "border-transparent bg-yellow-100 text-yellow-800",
        "out-of-stock": "border-transparent bg-red-100 text-red-800",
        "on-leave": "border-transparent bg-yellow-100 text-yellow-800",
        terminated: "border-transparent bg-red-100 text-red-800",
        suspended: "border-transparent bg-orange-100 text-orange-800",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };