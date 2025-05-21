# Component Migration Troubleshooting Guide

This document outlines common issues encountered during component migration and provides solutions to resolve them.

## Common Issues

### 1. Circular Reference Errors

**Symptoms:**
- Attempted import error messages in the console
- Components not being exported from their respective files
- Build failures with cryptic error messages about exports

**Cause:**
Circular references occur when a module imports from itself through a chain of imports:
```
ComponentA imports from ComponentB
ComponentB imports from re-export file
Re-export file exports from ComponentA directory
```

**Solution:**
Use the import and explicit re-export pattern described in `docs/component-re-export-strategy.md`:

```typescript
// Instead of:
export * from './component-name/index';

// Use:
import * as ComponentNamespace from './component-name/index';
export const Component = ComponentNamespace.Component;
// ... and so on for each export
```

### 2. Missing Component Exports

**Symptoms:**
- "Component is not exported from..." errors
- Components undefined in the rendering tree

**Cause:**
- Re-export files might not be exporting all the required components
- Component might be exported with a different name than expected

**Solution:**
- Ensure all components are explicitly re-exported in the re-export file
- Check component names and ensure they match between the implementation and re-export
- Verify that types are also being re-exported if needed

### 3. Import Path Issues

**Symptoms:**
- Components not found despite being in the codebase
- Import errors with specific path patterns

**Cause:**
Different import path patterns across the codebase:
- Absolute: `import { Component } from '@/app/components/ui/component'`
- Relative: `import { Component } from '../../ui/component'`
- Direct file: `import { Component } from './component'`

**Solution:**
- Use the `fix-direct-imports.js` script to update imports across the codebase
- Ensure re-export files exist for components with different import patterns
- Consider using the barrel file to standardize imports

### 4. Type Errors in Re-exports

**Symptoms:**
- TypeScript errors about missing types or incompatible types
- Type information lost in re-exports

**Cause:**
Types need to be explicitly re-exported alongside components

**Solution:**
Explicitly re-export types:
```typescript
import * as ComponentNamespace from './component-name/index';
export const Component = ComponentNamespace.Component;
export type ComponentProps = ComponentNamespace.ComponentProps;
```

### 5. Build Errors After Migration

**Symptoms:**
- Next.js build errors
- "Module not found" errors
- Components render incorrectly

**Cause:**
- Incomplete migration
- Missing re-exports
- Build cache issues

**Solution:**
- Clear the Next.js build cache: `rm -rf .next`
- Verify all components are correctly re-exported
- Check import paths in all files using the component
- Run the development server with `npm run dev` to verify changes

## Debugging Techniques

### 1. Check Export Chain

Trace the export chain from the component implementation to its usage:
1. Check the component's implementation in `/component-name/index.tsx`
2. Verify the re-export file at `/component-name.tsx`
3. Check the barrel file inclusion at `index.ts`
4. Examine the import in the consuming component

### 2. Isolate Components

Create a simple test page that only imports the problematic component to isolate the issue.

### 3. Log Component Structure

Add logging to verify the component structure:
```typescript
console.log('Component Structure:', ComponentNamespace);
```

## Prevention Strategies

1. **Follow Re-export Pattern**: Always use the import and explicit re-export pattern
2. **Create Test Pages**: Create test pages to verify component rendering
3. **Update Documentation**: Keep migration progress and patterns documented
4. **Run Tests**: Test the application after each component migration 