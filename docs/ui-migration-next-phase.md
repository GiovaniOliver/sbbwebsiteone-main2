# UI Component Migration - Next Phase

This document outlines the tasks for the next phase of UI component migration.

## Components to Migrate

Based on the remaining `.tsx` files in the `app/components/ui` directory, the following components should be migrated in the next phase:

### Priority 1: Core Components
- [ ] Alert Dialog (`alert-dialog.tsx`)
- [ ] Dialog (`dialog.tsx`)
- [ ] Popover (`popover.tsx`)
- [ ] Scroll Area (`scroll-area.tsx`)

### Priority 2: Specialized Components
- [ ] Calendar (`calendar.tsx`)
- [ ] Sidebar (`sidebar.tsx`)
- [x] User Profile Dropdown (`user-profile-dropdown.tsx`)
- [ ] Dropdown Avatar Profile Options (`dropdown-avatar-profile-options.tsx`)

## Migration Steps for Each Component

1. Create a directory for the component: `app/components/ui/{component-name}`
2. Create an `index.tsx` file in the directory with the component code
3. Update the barrel file (`app/components/ui/index.ts`) to include the component
4. Create a backward compatibility re-export file using the pattern in `docs/component-re-export-strategy.md`:
   ```typescript
   import * as ComponentNamespace from './component-name/index';
   export const Component = ComponentNamespace.Component;
   // ... and so on for each export
   ```
5. Update imports across the codebase using the `fix-direct-imports.js` script
6. Delete the old component file once all imports are updated

## Testing Strategy

After migrating each component:

1. Run the application to ensure it renders correctly
2. Test all interactive features of the component
3. Verify that all imports are working properly
4. Check for any console errors related to the component

## Documentation Tasks

- [ ] Update component JSDoc comments with usage examples
- [ ] Add accessibility considerations to each component
- [ ] Update the main UI migration documentation with any new patterns or challenges
- [ ] Create a storybook-like example page showcasing all migrated components

## Cleanup Tasks

- [ ] Review and remove any unnecessary re-export files
- [ ] Ensure consistent styling and naming conventions across all components
- [ ] Refactor any duplicate code identified during migration
- [ ] Optimize component performance where possible 