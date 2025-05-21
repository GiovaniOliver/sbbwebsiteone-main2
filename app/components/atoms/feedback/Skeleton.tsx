"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Skeleton component for displaying loading states
 * Uses Tailwind's animate-pulse for the loading animation
 */
const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      default: 'bg-muted',
      primary: 'bg-primary/20',
      secondary: 'bg-secondary/20',
    },
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
      '2xl': 'h-10 w-10',
      full: 'h-full w-full',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
      text: 'rounded',
    },
  },
  defaultVariants: {
    variant: 'default',
    shape: 'square',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

/**
 * Skeleton component for displaying loading states
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />
 * <Skeleton className="h-4 w-[250px]" />
 * <Skeleton variant="primary" size="lg" shape="circle" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size, shape, className }))}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants }; 