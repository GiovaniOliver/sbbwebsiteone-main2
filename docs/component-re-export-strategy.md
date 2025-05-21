# Component Re-export Strategy

This document outlines the recommended approach for creating re-export files to maintain backward compatibility when migrating components.

## Overview

When migrating components to a new directory structure, it's important to maintain backward compatibility with existing imports. This is done by creating re-export files that point to the new directory structure.

## Re-export Patterns

### ❌ Problematic Pattern: Direct Re-export

```typescript
// This pattern can lead to circular reference errors
export * from './component-name/index';
```

### ✅ Recommended Pattern: Import and Re-export

```typescript
// This pattern avoids circular reference errors
import * as ComponentNamespace from './component-name/index';

// Re-export specific components
export const ComponentOne = ComponentNamespace.ComponentOne;
export const ComponentTwo = ComponentNamespace.ComponentTwo;
// ... re-export additional components

// Re-export types if needed
export type ComponentProps = ComponentNamespace.ComponentProps;
```

## Implementation Steps

1. **Create Component Directory**: Create a new directory for the component at `app/components/ui/{component-name}`

2. **Implement Component**: Create an `index.tsx` file in the directory with the component implementation

3. **Create Re-export File**: Create a re-export file at `app/components/ui/{component-name}.tsx` using the recommended pattern

4. **Update Barrel File**: Update the barrel file (`app/components/ui/index.ts`) to include the component

5. **Update Imports**: Run the `fix-direct-imports.js` script to update imports across the codebase

## Type Handling

When re-exporting TypeScript types:

```typescript
// Re-export types
export type ComponentProps = ComponentNamespace.ComponentProps;
export type ComponentState = ComponentNamespace.ComponentState;
```

## Example: Dropdown Menu Re-export

```typescript
/**
 * Re-export file for backwards compatibility
 * 
 * This file maintains backward compatibility with existing imports while
 * the actual implementation has been moved to the dropdown-menu directory.
 */

import * as DropdownMenuComponents from './dropdown-menu/index';

// Re-export all dropdown menu components
export const DropdownMenu = DropdownMenuComponents.DropdownMenu;
export const DropdownMenuTrigger = DropdownMenuComponents.DropdownMenuTrigger;
export const DropdownMenuContent = DropdownMenuComponents.DropdownMenuContent;
// ... re-export additional components
```

## Common Issues

### Circular References

Circular references occur when a module imports from itself through a chain of imports. This can happen with the direct re-export pattern:

```
ComponentA imports from ComponentB
ComponentB imports from re-export file
Re-export file exports from ComponentA directory
```

Using the recommended import and re-export pattern prevents this issue.

### Import Path Variations

Components may be imported using different paths:

- Absolute: `import { Component } from '@/app/components/ui/component'`
- Relative: `import { Component } from '../../ui/component'`
- Direct file: `import { Component } from './component'`

All these paths should be handled by the re-export file and import update script. 