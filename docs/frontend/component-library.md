# SBB DAO Component Library

## Overview
This document outlines all components used in the SBB DAO frontend, organized by category and usage.

## Layout Components

### Navigation
- `NavbarGuest` - Main navigation bar for guest pages
- `Navbar` - Main navigation bar for authenticated pages
- `Footer` - Site-wide footer component

### Page Layouts
- `GuestPageLayout` - Layout wrapper for guest pages
- `AuthenticatedPageLayout` - Layout wrapper for authenticated pages
- `DashboardLayout` - Layout wrapper for dashboard pages

## Guest Page Components

### Hero Sections
- `HomeHero` - Home page hero section
- `BusinessOwnersHero` - Business owners page hero
- `CommunitySupportersHero` - Community supporters page hero
- `DAOFeaturesHero` - DAO features page hero
- `HowItWorksHero` - How it works page hero
- `SBBUniversityHero` - SBB University page hero

### Common Sections
- `JoinOurCommunitySection` - Reusable community join section
- `SuccessStories` - Success stories grid section
- `FeatureGrid` - Feature showcase grid
- `TestimonialSection` - Testimonials carousel
- `FAQSection` - FAQ accordion section

## Dashboard Components

### Profile Management
- `ProfileCard` - User profile display card
- `ProfileEditForm` - Profile editing form
- `AvatarUpload` - Avatar upload component

### Business Management
- `BusinessCard` - Business profile card
- `BusinessEditForm` - Business editing form
- `BusinessMetrics` - Business performance metrics
- `BusinessGallery` - Business image gallery

### Community Features
- `CommunityFeed` - Community activity feed
- `EventCard` - Event display card
- `DiscussionThread` - Discussion thread component
- `MemberCard` - Community member card

### Educational Resources
- `CourseCard` - Course display card
- `ResourceCard` - Resource display card
- `ProgressTracker` - Learning progress tracker

## Shared Components

### UI Elements
- `Button` - Reusable button component
- `Input` - Form input component
- `Card` - Base card component
- `Modal` - Modal dialog component
- `Toast` - Notification toast component
- `LoadingSpinner` - Loading indicator

### Data Display
- `DataTable` - Data table component
- `Chart` - Chart visualization component
- `Timeline` - Timeline display component
- `Badge` - Status badge component

## Component Guidelines

### Styling
- Use Tailwind CSS for styling
- Follow consistent color scheme
- Maintain responsive design
- Implement dark mode support

### Accessibility
- Include ARIA labels
- Ensure keyboard navigation
- Maintain color contrast
- Support screen readers

### Performance
- Implement lazy loading
- Optimize images
- Use proper caching
- Minimize re-renders

### State Management
- Use React Context for global state
- Implement proper loading states
- Handle error states
- Manage form state

## Component Dependencies

### External Libraries
- Next.js
- React
- Tailwind CSS
- LiveKit
- Supabase Client
- Chart.js
- React Query

### Internal Dependencies
- `@/lib/utils` - Utility functions
- `@/hooks` - Custom React hooks
- `@/context` - React context providers
- `@/types` - TypeScript type definitions

## Component Development Guidelines

### Code Organization
- One component per file
- Clear file naming convention
- Proper TypeScript types
- Comprehensive documentation

### Testing
- Unit tests for components
- Integration tests for features
- E2E tests for critical paths
- Accessibility testing

### Documentation
- Component purpose
- Props interface
- Usage examples
- Edge cases
- Accessibility considerations

# UI Component Library

This document provides an overview of the reusable UI components available in the SBB DAO frontend.

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/Button';

// Usage examples
<Button>Default Button</Button>
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>

// Sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>

// With loading state
<Button loading>Loading Button</Button>

// With icons
<Button leftIcon={<Icon />}>Button with Left Icon</Button>
<Button rightIcon={<Icon />}>Button with Right Icon</Button>
```

### Input

A form input component with support for labels, icons, and error states.

```tsx
import { Input } from '@/components/ui/Input';

// Basic usage
<Input placeholder="Enter text..." />

// With label
<Input label="Username" placeholder="Enter username..." />

// With error
<Input
  label="Email"
  placeholder="Enter email..."
  error="Please enter a valid email"
/>

// With icons
<Input
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Different sizes
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />
```

### Card

A container component for grouping related content.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';

// Basic usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    Card footer content
  </CardFooter>
</Card>

// With variants
<Card variant="ghost">Ghost Card</Card>
<Card variant="outline">Outline Card</Card>

// With different padding
<Card padding="sm">Small Padding</Card>
<Card padding="md">Medium Padding</Card>
<Card padding="lg">Large Padding</Card>
```

### Badge

A small component for displaying status, labels, or counts.

```tsx
import { Badge } from '@/components/ui/Badge';

// Basic usage
<Badge>Default Badge</Badge>

// With variants
<Badge variant="primary">Primary Badge</Badge>
<Badge variant="secondary">Secondary Badge</Badge>
<Badge variant="success">Success Badge</Badge>
<Badge variant="warning">Warning Badge</Badge>
<Badge variant="error">Error Badge</Badge>

// With dot
<Badge dot>With Dot</Badge>

// Different sizes
<Badge size="sm">Small Badge</Badge>
<Badge size="md">Medium Badge</Badge>
<Badge size="lg">Large Badge</Badge>
```

### Alert

A component for displaying important messages or notifications.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';

// Basic usage
<Alert>
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Alert description text</AlertDescription>
</Alert>

// With variants
<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed successfully</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please review your input</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
</Alert>
```

### Avatar

A component for displaying user avatars with support for images and fallbacks.

```tsx
import { Avatar } from '@/components/ui/Avatar';

// Basic usage
<Avatar src="/path/to/image.jpg" alt="User" />

// With fallback
<Avatar fallback="JD" />

// With status
<Avatar
  src="/path/to/image.jpg"
  alt="User"
  status="online"
/>

// Different sizes
<Avatar size="xs" src="/path/to/image.jpg" />
<Avatar size="sm" src="/path/to/image.jpg" />
<Avatar size="md" src="/path/to/image.jpg" />
<Avatar size="lg" src="/path/to/image.jpg" />
<Avatar size="xl" src="/path/to/image.jpg" />
<Avatar size="2xl" src="/path/to/image.jpg" />

// With ring
<Avatar ring="primary" src="/path/to/image.jpg" />
```

### Progress

A component for displaying progress or loading states.

```tsx
import { Progress } from '@/components/ui/Progress';

// Basic usage
<Progress value={60} max={100} />

// With variants
<Progress variant="primary" value={75} max={100} />
<Progress variant="success" value={90} max={100} />
<Progress variant="warning" value={45} max={100} />
<Progress variant="error" value={30} max={100} />

// Different sizes
<Progress size="sm" value={60} max={100} />
<Progress size="md" value={60} max={100} />
<Progress size="lg" value={60} max={100} />

// With value display
<Progress value={60} max={100} showValue />

// With animation
<Progress
  value={60}
  max={100}
  indicatorAnimation="pulse"
/>
```

### Skeleton

A component for displaying loading states with animated placeholders.

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

// Basic usage
<Skeleton />

// Different sizes
<Skeleton size="xs" />
<Skeleton size="sm" />
<Skeleton size="md" />
<Skeleton size="lg" />
<Skeleton size="xl" />
<Skeleton size="2xl" />
<Skeleton size="full" />

// Different shapes
<Skeleton shape="circle" />
<Skeleton shape="square" />
<Skeleton shape="text" />

// With variants
<Skeleton variant="primary" />
<Skeleton variant="secondary" />
```

## Best Practices

1. **Component Composition**: Use these components as building blocks to create more complex UI elements.
2. **Consistent Styling**: Maintain consistent styling by using the provided variants and sizes.
3. **Accessibility**: All components are built with accessibility in mind. Use appropriate ARIA labels and roles when needed.
4. **Responsive Design**: Components are responsive by default. Use Tailwind's responsive modifiers for custom adjustments.
5. **Type Safety**: All components are fully typed with TypeScript for better development experience.

## Customization

Components can be customized using Tailwind CSS classes through the `className` prop. The base styles are built using Tailwind's utility classes and can be extended or overridden as needed.

## Dependencies

These components rely on the following dependencies:
- `class-variance-authority`: For managing component variants
- `clsx`: For conditional class name composition
- `tailwind-merge`: For merging Tailwind CSS classes

Make sure these dependencies are installed in your project. 