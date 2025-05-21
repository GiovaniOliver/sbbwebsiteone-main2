"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-gray-100',
  {
    variants: {
      variant: {
        default: 'bg-gray-100',
        primary: 'bg-indigo-100',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        error: 'bg-red-100',
      },
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-indigo-600 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-gray-600',
        primary: 'bg-indigo-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        shimmer: 'animate-shimmer',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'none',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  indicatorClassName?: string;
  indicatorAnimation?: 'none' | 'pulse' | 'shimmer';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      max = 100,
      showValue = false,
      indicatorClassName,
      indicatorAnimation,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={cn(progressVariants({ variant, size, className }))}
          {...props}
        >
          <div
            className={cn(
              progressIndicatorVariants({
                variant,
                animation: indicatorAnimation,
              }),
              indicatorClassName
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <div className="mt-1 flex justify-between text-sm text-gray-600">
            <span>{value}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress, progressVariants }; 