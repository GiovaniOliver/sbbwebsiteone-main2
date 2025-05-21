"use client";

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button component with various visual styles and states.
 * Supports loading states, icons, and can be rendered as a child component.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" leftIcon={<Icon />}>With Icon</Button>
 * <Button isLoading>Loading...</Button>
 * ```
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg hover:from-yellow-300 hover:to-orange-400 focus:ring-orange-400',
        secondary: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/30',
        outline: 'border-2 border-white text-white hover:bg-white/10 hover:border-white/80 focus:ring-white/30',
        ghost: 'hover:bg-white/10 text-white focus:ring-white/20',
        destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
        blue: 'bg-[#2563EB] hover:bg-blue-600 text-white focus:ring-blue-400',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading ? (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : leftIcon ? (
              <span className="mr-2">{leftIcon}</span>
            ) : null}
            {children}
            {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 