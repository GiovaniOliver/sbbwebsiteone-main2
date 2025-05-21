/**
 * UI Component Library
 * 
 * This file serves as a centralized export for all UI components.
 * Import components from this file to ensure consistency and simplify imports.
 * 
 * @example
 * ```tsx
 * import { Button, Avatar, Skeleton } from '@/app/components/ui';
 * ```
 */

/**
 * UI Components barrel file
 * This file re-exports all UI components from a single location
 * for easier importing across the application.
 */

// Layout Components
export * from './card';
export * from './tabs';
export * from './badge';
export * from './separator';

// Form Components
export * from './button';
export * from './input';
export * from './textarea';
export * from './select';
export * from './checkbox';
export * from './switch';
export * from './label';

// Data Display Components
export * from './avatar';
export * from './skeleton';
export * from './alert';
export * from './progress';
export * from './dropdown-menu';
export * from './toast';
export * from './user-profile-dropdown';

/**
 * Components that are not yet migrated to the new directory structure:
 * - toast
 */

// Layout Components
export * from './dialog';
export * from './scroll-area';
export * from './popover'; 