# UI Component Migration Strategy

This document outlines the strategy used for migrating UI components to a new directory structure.

## Directory Structure

The new directory structure organizes components by type and ensures a consistent import pattern:

```
app/components/ui/
├── component-name/
│   └── index.tsx
```

## Migration Process

1. **Create Component Directory**
   - Create a new directory for each component at `app/components/ui/{component-name}`
   - Implement the component in `index.tsx` within this directory

2. **Update Barrel File**
   - Update `app/components/ui/index.ts` to re-export from the new component directories
   - Group components by type (layout, form, data display, etc.)

3. **Update Imports**
   - Use the `fix-direct-imports.js` script to update imports across the codebase
   - New import pattern: `import { Component } from '@/app/components/ui/component'`

4. **Backward Compatibility**
   - For components already using the new import pattern but pointing to old files:
     - Create re-export files (e.g., `dropdown-menu.tsx`) that point to the new directory

5. **Cleanup**
   - Remove old component files after ensuring all imports are updated
   - Keep re-export files temporarily for backward compatibility

## Best Practices

### Component Implementation

- Use the `"use client"` directive for client-side components
- Use TypeScript for type safety
- Document components with JSDoc comments
- Implement accessibility features (ARIA attributes, keyboard navigation)
- Use consistent styling with Tailwind CSS

### Import Patterns

Old import patterns that are replaced:
```tsx
import { Component } from "../../ui/shared/component"
import { Component } from "@/app/components/ui/shared/component"
```

New standardized import pattern:
```tsx
import { Component } from "@/app/components/ui/component"
```

## Maintenance

- Keep the `ui-migration-progress.md` document updated with migration status
- Continue to identify and migrate remaining components
- Eventually remove backward compatibility re-export files when all imports are updated 