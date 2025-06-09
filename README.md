## About

This is my personal website built with Next.js (SSG), Tailwind and Typescript. The Blog Content is managed as markdown files using mdx.

## Dependencies

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)

## Getting started

If you will like to use this as your template, clone this repo and run like a nextjs app.


## Component Structure
The component directory contains the main navigation bar component and its sub-components, organized following React best practices.

### Structure

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

## License

MIT
