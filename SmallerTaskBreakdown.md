# Smaller Task Breakdown

This document consolidates tasks identified across the files inside the `docs` folder. Each section lists the key tasks or action items extracted from the respective documentation files.

## UI Component Migration - Next Phase (`docs/ui-migration-next-phase.md`)

- **Priority 1 Components** to migrate: Alert Dialog, Dialog, Popover, Scroll Area.
- **Priority 2 Components** to migrate: Calendar, Sidebar, Dropdown Avatar Profile Options (User Profile Dropdown already migrated).
- **Migration steps** for each component include:
  1. Create a new directory and implement `index.tsx`.
  2. Update the barrel file and create a backward compatibility re-export.
  3. Run `fix-direct-imports.js` and remove the old file.
- **Documentation tasks**: update JSDoc examples, add accessibility notes, update main migration docs, and create a demo page.
- **Cleanup tasks**: remove unnecessary re-exports, enforce consistent styling, refactor duplicates, and optimize performance.

## UI Component Migration Progress (`docs/ui-migration-progress.md`)

- Lists **pending components** still to migrate:
  - Layout: Accordion, Dialog, Drawer, Popover, Sheet, Table.
  - Form: Calendar, Command, Form, RadioGroup, Slider, Toggle.
  - Data Display: AspectRatio, Tooltip.
  - Navigation: Breadcrumb, Menubar, NavigationMenu, Pagination.
- Migration process steps mirror those in the migration strategy document.

## UI Migration Summary - Next Steps (`docs/ui-migration-summary.md`)

1. Continue migrating the components listed as pending.
2. Add remaining re-export files for backward compatibility.
3. Create comprehensive component documentation with usage examples.
4. Remove re-export files after imports are updated.
5. Thoroughly test all components after migration.

## UI Component Migration Strategy (`docs/ui-component-migration.md`)

- Create a directory for each component and implement `index.tsx`.
- Update the barrel file to re-export by type.
- Use `fix-direct-imports.js` to update imports.
- Provide re-export files for existing import paths.
- Remove old component files after migration while keeping re-exports temporarily.

## Frontend Implementation Status Checklist (`docs/frontend/status-checklist.md`)

- **Unimplemented layouts**: AuthenticatedPageLayout, DashboardLayout.
- **Missing guest page sections**: FeatureGrid, TestimonialSection, FAQSection.
- **Dashboard components not started**: ProfileCard, ProfileEditForm, AvatarUpload, BusinessCard, BusinessEditForm, BusinessMetrics, BusinessGallery, CommunityFeed, EventCard, DiscussionThread, MemberCard, CourseCard, ResourceCard, ProgressTracker.
- **Shared components to create**: Button, Input, Card, Modal, Toast, LoadingSpinner, DataTable, Chart, Timeline, Badge.
- **Implementation priorities**: finish shared components, implement dashboard layouts, add common sections, set up auth flows, implement dashboard components, add visualization components, testing infrastructure, dark mode, animations, advanced features, analytics, performance optimizations.
- **Next steps** include creating a shared UI library, setting up dashboard structure, implementing auth flows, adding common sections, standardizing styling, adding TypeScript types, comprehensive testing, and improving documentation.

## SBB Website Component Checklist (`docs/scratchpad.md`)

A detailed checklist for various feed and UI components. Remaining tasks include:

- **Comment feed enhancements**: sorting & filtering controls.
- **Share list features**: user list, sharing details, engagement actions, sorting/filtering, pagination.
- **Events feed**: event item details, categories & filters, expanded view, RSVP integrations, pagination.
- **Notification feed**: notification settings link, filtering & sorting, clear old notifications.
- **Share/Reshare composer**: compose modal, shared post appearance.
- **Messaging system**: message thread, conversation list, message composer.
- **Other feeds**: hashtag/topic feed, discovery/explore feed.
- **Utility & support**: report/block UI, language switcher, font size adjustment, high-contrast mode, engagement analytics, moderation queues.

