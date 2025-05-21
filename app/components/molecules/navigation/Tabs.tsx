"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from "@/backend/lib/utils/utils"

/**
 * Root Tabs container
 */
const Tabs = TabsPrimitive.Root

/**
 * TabsList variants for styling the tabs container
 */
const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outline: "bg-transparent border",
        pills: "bg-transparent gap-2",
      },
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-base",
        lg: "h-12 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
)

/**
 * TabsList component for containing TabsTrigger elements
 * 
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & 
  VariantProps<typeof tabsListVariants>
>(({ className, variant, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size, fullWidth, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * TabsTrigger variants for styling the tab buttons
 */
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-background data-[state=active]:text-foreground",
        underline: "rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary shadow-none data-[state=active]:shadow-none",
        pills: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
      fullWidth: {
        true: "flex-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
)

/**
 * TabsTrigger component for the clickable tab buttons
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size, fullWidth, className }))}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * TabsContent variants for styling the tab content area
 */
const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border rounded-md p-4",
        card: "bg-card rounded-md p-4 shadow-sm",
      },
      animated: {
        true: "animate-in fade-in-75 ease-in slide-in-from-left-2",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
)

/**
 * TabsContent component for the content area of each tab
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>
>(({ className, variant, animated, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant, animated, className }))}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} 