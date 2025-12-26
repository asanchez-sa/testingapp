# @superapp/ui

A comprehensive UI component library for React Native applications built with Atomic Design principles and TypeScript.

## 📦 Overview

This package provides a collection of reusable, type-safe UI components organized following Atomic Design methodology:

- **Atoms**: Basic building blocks (Button, Text, Icon, etc.)
- **Molecules**: Simple component combinations (Input fields, Cards, etc.)
- **Organisms**: Complex components (Forms, Headers, etc.)
- **Templates**: Page-level layouts

## 🚀 Installation

This package is part of the Superapp monorepo and is already configured as a workspace package.

```bash
# Already installed via workspace
bun install
```

## 📖 Usage

### Direct Import (Recommended for Tree-Shaking)

Import components directly from their atomic design level for optimal bundle size:

```typescript
import { Button } from '@superapp/ui/components/atoms/button';
import { COLORS } from '@superapp/ui/constants';
import { getSpacing } from '@superapp/ui/utils';
```

### Convenience Import

Import from the main index (less optimized but more convenient):

```typescript
import { Button, COLORS, getSpacing } from '@superapp/ui';
```

## 🎨 Available Exports

### Components

#### Atoms
- **Button**: Customizable button component with variants and sizes
  - Variants: `primary`, `secondary`, `outline`, `ghost`
  - Sizes: `small`, `medium`, `large`
  - Full documentation: `src/components/atoms/button/button.md`

### Constants

#### Colors
```typescript
import { COLORS } from '@superapp/ui/constants';

// Usage
const primaryColor = COLORS.primary; // '#007AFF'
const backgroundColor = COLORS.background; // '#FFFFFF'
```

Available color categories:
- Primary colors (primary, secondary, success, warning, danger, info)
- Gray scale (gray50 - gray900)
- Semantic colors (background, surface, border, text, etc.)

#### Spacing
```typescript
import { SPACING, RADIUS } from '@superapp/ui/constants';

// Usage
const padding = SPACING.base; // 16
const borderRadius = RADIUS.md; // 8
```

Following an 8-point grid system:
- Spacing: `none`, `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- Radius: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`

#### Typography
```typescript
import { FONT_SIZES, FONT_WEIGHTS, TEXT_STYLES } from '@superapp/ui/constants';

// Usage
const titleStyle = TEXT_STYLES.h1;
const fontSize = FONT_SIZES.base; // 14
const fontWeight = FONT_WEIGHTS.bold; // '700'
```

### Utils

#### Color Utils
```typescript
import { hexToRgba, getColorWithOpacity, isLightColor } from '@superapp/ui/utils';

const transparentBlue = hexToRgba('#007AFF', 0.5);
const lightPrimary = getColorWithOpacity('primary', 0.3);
const isLight = isLightColor('#007AFF'); // false
```

#### Spacing Utils
```typescript
import { getSpacing, getRadius, createPadding, createMargin } from '@superapp/ui/utils';

const padding = createPadding('md', 'base');
// { paddingVertical: 12, paddingHorizontal: 16 }

const margin = createMargin('sm', 'lg');
// { marginVertical: 8, marginHorizontal: 24 }
```

#### Typography Utils
```typescript
import { getFontSize, getTextStyle, createTextStyle } from '@superapp/ui/utils';

const h1Style = getTextStyle('h1');
const customStyle = createTextStyle('lg', 'semibold', 'normal');
```

## 🏗️ Project Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   └── button/
│   │   │       ├── button.tsx           # Component implementation
│   │   │       ├── button.types.ts      # TypeScript types
│   │   │       ├── button.constants.ts  # Component constants
│   │   │       ├── button.styles.ts     # Styles
│   │   │       ├── button.md            # Documentation
│   │   │       └── index.ts             # Exports
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── hooks/                           # Custom React hooks
│   ├── contexts/                        # React contexts
│   ├── utils/                           # Utility functions
│   ├── types/                           # Shared TypeScript types
│   ├── constants/                       # Global constants
│   └── index.ts                         # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Component Structure Convention

Each component follows this structure:

- `{component}.tsx` - Main component implementation
- `{component}.types.ts` - TypeScript interfaces and types
- `{component}.constants.ts` - Component-specific constants
- `{component}.styles.ts` - StyleSheet definitions
- `{component}.md` - Component documentation
- `index.ts` - Component exports

## 🎯 Design Principles

### Atomic Design
Components are organized following Brad Frost's Atomic Design methodology:

1. **Atoms**: Indivisible UI elements (Button, Text, Input)
2. **Molecules**: Simple combinations of atoms (Search bar, Card)
3. **Organisms**: Complex UI sections (Header, Form, List)
4. **Templates**: Page layouts combining organisms

### Type Safety
- All components are fully typed with TypeScript
- Exported types for all props interfaces
- Strict type checking enabled

### Modularity
- Each component is self-contained
- Clear separation of concerns (logic, styles, types, constants)
- Optimized for tree-shaking

### Consistency
- Shared design tokens (colors, spacing, typography)
- Utility functions for common operations
- Standardized component APIs

## 🔧 Development

### Type Checking
```bash
# Check types across all packages
bun run check-types

# Check types for UI package only
cd packages/ui && bun run check-types
```

### Linting & Formatting
```bash
# Format all files
bun x ultracite fix

# Check for issues
bun x ultracite check
```

## 📚 Adding New Components

### 1. Create Component Structure

```bash
# For an atom
mkdir -p packages/ui/src/components/atoms/my-component

# Create files
touch packages/ui/src/components/atoms/my-component/{my-component.tsx,my-component.types.ts,my-component.constants.ts,my-component.styles.ts,my-component.md,index.ts}
```

### 2. Implement Component Files

Follow the Button component as a reference implementation.

### 3. Export Component

Add export to `packages/ui/src/components/atoms/index.ts`:

```typescript
export * from './my-component';
```

### 4. Document Component

Create comprehensive documentation in `my-component.md` including:
- Component overview
- Props table
- Usage examples
- Variants and states

## 🧪 Testing

```bash
# Run tests (when implemented)
bun test
```

## 📄 License

Private - Part of Superapp monorepo

## 👥 Contributing

This is a private monorepo package. Follow the project's coding standards and conventions when adding new components.

---

**Built with ❤️ using React Native, TypeScript, and Atomic Design**
