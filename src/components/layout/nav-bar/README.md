# NavBar Component

This directory contains the main navigation bar component and its sub-components, organized following React best practices.

## Structure

```
nav-bar/
├── index.ts                 # Main export file
├── NavBar.tsx              # Parent component (main entry point)
├── components/             # Sub-components directory
│   ├── index.ts            # Sub-components exports
│   ├── DesktopNavBar.tsx   # Desktop navigation
│   ├── MobileNavBar.tsx    # Mobile navigation
│   ├── NavItem.tsx         # Navigation item component
│   ├── NavLink.tsx         # Navigation link component
│   ├── DropdownMenu.tsx    # Desktop dropdown menu
│   └── MobileDropdown.tsx  # Mobile dropdown menu
└── types/                  # TypeScript definitions
    └── navigation.ts       # Navigation-related types
```

## Usage

### Basic Import (Recommended)
```tsx
import NavBar from '@/components/layout/nav-bar';
```

### Named Imports (If needed)
```tsx
import { NavBar, DesktopNavBar, MobileNavBar } from '@/components/layout/nav-bar';
```

### Internal Component Imports
```tsx
// Within the nav-bar directory
import { NavLink, DropdownMenu } from './';
import { NavItem } from '../types/navigation';
```

## Component Hierarchy

- **NavBar** (Parent Component)
  - **DesktopNavBar** (Hidden on mobile)
    - DropdownMenu
    - NavLink
  - **MobileNavBar** (Hidden on desktop)
    - MobileDropdown
    - NavLink

## Organization Principles

1. **Parent Component**: `NavBar.tsx` serves as the main component that orchestrates desktop and mobile versions
2. **Sub-components**: Organized in the `components/` directory for clear separation
3. **Clean Exports**: Both main and sub-components are exported through index files
4. **Type Safety**: All types are centralized in the `types/` directory
5. **Encapsulation**: Internal imports use relative paths, external imports use the main export

## Best Practices

- Always import the main component from the index file
- Use named imports only when you need specific sub-components
- Keep component-specific logic within their respective files
- Update the types in `types/navigation.ts` when adding new navigation features 
