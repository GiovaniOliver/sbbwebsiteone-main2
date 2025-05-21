"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from "@/lib/utils"

/**
 * Avatar Root Variants
 */
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
        '2xl': 'h-16 w-16',
      },
      ring: {
        none: '',
        default: 'ring-2 ring-white',
        primary: 'ring-2 ring-primary',
        secondary: 'ring-2 ring-secondary',
      },
    },
    defaultVariants: {
      size: 'md',
      ring: 'none',
    },
  }
);

/**
 * Avatar component built on Radix UI Avatar
 * 
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & 
  VariantProps<typeof avatarVariants>
>(({ className, size, ring, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, ring, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * Image component for the Avatar
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    status?: 'online' | 'offline' | 'away' | 'busy';
  }
>(({ className, status, ...props }, ref) => {
  // Create a status indicator element if status is provided
  const statusIndicator = status && (
    <span 
      className={cn(
        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white",
        status === 'online' && "bg-green-500",
        status === 'offline' && "bg-gray-500",
        status === 'away' && "bg-yellow-500",
        status === 'busy' && "bg-red-500"
      )}
    />
  )

  return (
    <>
      <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
      />
      {statusIndicator}
    </>
  )
})
AvatarImage.displayName = "AvatarImage"

/**
 * Fallback component for the Avatar when the image fails to load
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClassNames = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    error: 'bg-red-100 text-red-600',
  }[variant]

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full",
        variantClassNames,
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback, avatarVariants } 