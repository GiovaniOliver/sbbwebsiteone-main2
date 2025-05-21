# UI Component Standards

## Component Organization

All UI components should be organized in a consistent structure using the following conventions:

### File Structure

```
app/
  components/
    ui/                 # Base UI components directory
      [component-name]/    # Each component in its own directory
        index.tsx          # Main export file
        variants.ts        # (Optional) Component variants
        types.ts           # (Optional) Component types
```

### Component Category Organization

All UI components are organized into the following categories:

1. **Data Display** - Components used for displaying data
   - Avatar
   - Badge  
   - Card
   - Table
   - Skeleton
   
2. **Inputs** - Components that collect user input
   - Button
   - Checkbox
   - Input
   - Select
   - Textarea
   
3. **Navigation** - Components for navigating the application
   - Tabs
   - Navigation Menu
   - Pagination
   
4. **Feedback** - Components that provide feedback to users
   - Alert
   - Progress
   - Toast
   
5. **Layout** - Components for layout structure
   - Separator
   - Dialog
   - Dropdown

## Naming Conventions

### Component Files

- Component directories should use **kebab-case**: `button/`, `data-table/`
- Component file names should use **kebab-case**: `index.tsx`, `button-variants.ts`
- Export component names should use **PascalCase**: `Button`, `DataTable`

### Component Props

- All component props should use **PascalCase** for the interface name: `ButtonProps`
- Prop interfaces should extend native HTML element props when appropriate
- Component variants should be defined using class-variance-authority (cva)

## Import Conventions

```tsx
// Preferred import style
import { Button } from "@/app/components/ui/button";

// For components with multiple exports
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/app/components/ui/tabs";
```

## Component Implementation Standards

### 1. All components should be properly typed with TypeScript

```tsx
// Example of properly typed component
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

### 2. All components should support composition with `className`

```tsx
const Component = ({ className, ...props }: Props) => {
  return <div className={cn("base-styles", className)} {...props} />;
};
```

### 3. All components should use React.forwardRef when appropriate

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

### 4. All components should include proper accessibility attributes

- ARIA attributes
- Keyboard navigation
- Focus management

### 5. Components based on Radix UI should follow Radix naming conventions

```tsx
// Example for Tabs component
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
```

## Component Usage Examples

### Button Component

```tsx
<Button variant="default">Default Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
```

### Avatar Component

```tsx
<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Skeleton Component

```tsx
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
```

## Migration Plan

When consolidating duplicate components:

1. Identify all usages of the component 
2. Choose the more robust implementation
3. Update all import paths
4. Ensure backward compatibility or document breaking changes 