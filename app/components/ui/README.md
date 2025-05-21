# SBB DAO UI Component Library

This directory contains all the shared UI components used throughout the SBB DAO application. The component library follows a consistent structure and naming convention to ensure maintainability and ease of use.

## Component Organization

Components are organized by function:

- **Data Display** (`/avatar`, `/skeleton`, etc.) - Components for displaying data
- **Inputs** (`/button`, `/input`, etc.) - Components for user input
- **Navigation** (`/tabs`, etc.) - Components for navigation
- **Feedback** (`/alert`, `/progress`, etc.) - Components for user feedback
- **Layout** (`/dialog`, `/separator`, etc.) - Components for layout structure

## Component Structure

Each component is contained in its own directory with a consistent structure:

```
/component-name
  index.tsx      # Main component
  variants.ts    # (Optional) Component variants
  examples.tsx   # (Optional) Usage examples
```

## Usage

Import components directly from their directories:

```tsx
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
```

Or using the centralized export:

```tsx
import { Button, Skeleton, Avatar } from "@/app/components/ui";
```

## Component Documentation

Detailed documentation for each component can be found in:
- JSDoc comments in the component source code
- [UI Component Standards](/docs/frontend/ui-component-standards.md)

## Key Principles

1. **Consistent Naming** - All components use PascalCase for exports and kebab-case for files
2. **Type Safety** - All components are fully typed with TypeScript
3. **Accessibility** - Components include proper ARIA attributes and keyboard navigation
4. **Composition** - Components are designed for composition using the `className` prop
5. **Variants** - Component variants are defined using class-variance-authority (cva)

## Contributing

When creating or modifying components:

1. Follow the established directory structure
2. Include proper documentation with JSDoc comments
3. Use consistent naming conventions
4. Add the component to the barrel export in `index.ts`
5. Update the documentation if needed 