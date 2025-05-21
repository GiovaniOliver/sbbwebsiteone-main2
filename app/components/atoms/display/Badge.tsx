"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge component for displaying short status descriptors.
 * Supports different variants, sizes and an optional dot indicator.
 * 
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="destructive">Alert</Badge>
 * <Badge variant="success" dot>Online</Badge>
 * ```
 */
export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
        secondary:
          'border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200',
        destructive:
          'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        outline: 'text-gray-800',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const dotColorMap = {
  default: 'bg-indigo-800',
  secondary: 'bg-gray-800',
  destructive: 'bg-red-800',
  outline: 'bg-gray-800',
  success: 'bg-green-800',
  warning: 'bg-yellow-800',
} as const;

type BadgeVariant = keyof typeof dotColorMap;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size, dot, children, ...props }, ref) => {
    const badgeVariant = (variant || 'default') as BadgeVariant;
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', dotColorMap[badgeVariant])}
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge }; 