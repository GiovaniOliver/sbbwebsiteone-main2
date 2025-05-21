# Frontend Component Structure

## Overview

The SBB DAO frontend is built using Next.js with a component-based architecture. This document outlines the structure and organization of the frontend components.

## Component Organization

Components are organized into the following categories:

1. **UI Components**: Reusable UI elements that form the building blocks of the application
2. **Layout Components**: Components that define the overall layout structure
3. **Feature Components**: Components specific to a particular feature or page
4. **Form Components**: Reusable form elements and validation logic
5. **Data Display Components**: Components for displaying data in various formats
6. **User Components**: Components related to user profiles and authentication

### Directory Structure

```
app/
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── ...
│   ├── forms/               # Form components
│   │   ├── text-input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── usersmaincomponents/ # Feature-specific components
│   │   ├── homefeed/
│   │   ├── profile/
│   │   ├── messages/
│   │   └── ...
│   ├── auth/                # Authentication components
│   │   ├── auth-form.tsx
│   │   ├── sign-in-button.tsx
│   │   └── ...
│   └── shared/              # Shared utility components
│       ├── error-boundary.tsx
│       ├── loading-spinner.tsx
│       └── ...
```

## Component Patterns

### Atomic Design Methodology

The component architecture follows the Atomic Design methodology with:

1. **Atoms**: Basic UI components (buttons, inputs, icons)
2. **Molecules**: Combinations of atoms (form fields, search bars)
3. **Organisms**: Complex UI sections (navigation, comment sections)
4. **Templates**: Page layouts without specific content
5. **Pages**: Complete pages with implemented organisms and real content

### Component Composition

Components are designed to be composable, allowing for flexible combinations and reuse. For example:

```tsx
// Example of component composition
<Card>
  <CardHeader>
    <CardTitle>Post Title</CardTitle>
    <CardDescription>Post metadata</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Post content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Like</Button>
    <Button>Comment</Button>
  </CardFooter>
</Card>
```

### Props and TypeScript

All components are strongly typed using TypeScript interfaces:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  loading, 
  children, 
  ...props 
}: ButtonProps) {
  // Component implementation
}
```

## Key Components

### Layout Components

#### AppLayout

The main application layout used for authenticated pages:

```tsx
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
```

#### AuthLayout

Layout for authentication pages:

```tsx
function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Logo className="mx-auto mb-6" />
        {children}
      </div>
    </div>
  );
}
```

### Feature Components

#### Post Component

Displays a single post with interaction options:

```tsx
interface PostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
}

function Post({ post, onLike, onComment }: PostProps) {
  // Component implementation
}
```

#### UserProfile Component

Displays a user profile with relevant information:

```tsx
interface UserProfileProps {
  profile: Profile;
  isCurrentUser: boolean;
  onFollow?: (userId: string) => void;
}

function UserProfile({ profile, isCurrentUser, onFollow }: UserProfileProps) {
  // Component implementation
}
```

## State Management

### Local State

Local component state is managed using React's useState and useReducer hooks:

```tsx
function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Component implementation
}
```

### Global State

Global state is managed using React Context API, SWR, and React Query:

```tsx
// User context example
export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, error, mutate } = useSWR<User>('/api/user');
  
  // Provider implementation
}
```

## Styling Approach

The application uses a combination of:

1. **TailwindCSS**: For utility-based styling
2. **CSS Modules**: For component-specific styling when needed
3. **Radix UI**: For accessible component primitives
4. **clsx/tailwind-merge**: For conditional class name composition

Example:

```tsx
import { cn } from '@/lib/utils';

function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-colors focus:outline-none focus:ring-2",
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
        },
        className
      )}
      {...props}
    />
  );
}
```

## Responsive Design

Components are designed to be responsive using:

1. **TailwindCSS breakpoints**: For responsive layouts
2. **Container queries**: For component-specific responsiveness
3. **Mobile-first approach**: Designing for mobile first, then enhancing for larger screens

Example:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {posts.map(post => (
    <PostCard key={post.id} post={post} />
  ))}
</div>
```

## Component Testing

Components are tested using:

1. **Unit tests**: For individual component testing
2. **Integration tests**: For testing component interactions
3. **Snapshot tests**: For UI regression testing
4. **Accessibility tests**: For ensuring accessibility compliance

## Performance Considerations

1. **Code Splitting**: Components are code-split by route
2. **Dynamic Imports**: Large components are loaded dynamically
3. **Memoization**: React.memo for expensive renders
4. **Virtual Lists**: For displaying large data sets
5. **Image Optimization**: Using Next.js Image component for optimized images

## Component Documentation

Components are documented using:

1. **TypeScript types**: For props and return values
2. **JSDoc comments**: For additional context
3. **Storybook stories**: For visual documentation (if applicable)
4. **Usage examples**: For demonstrating common use cases

## Conclusion

The component architecture of the SBB DAO frontend is designed to be modular, reusable, and maintainable. By following consistent patterns and organization, the application can scale while maintaining code quality and developer productivity.
