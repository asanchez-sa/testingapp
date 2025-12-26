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

## ⚡ Quick Start: Generate a New Component

Use Plop to quickly scaffold a new component with all 7 required files automatically:

```bash
cd packages/ui
bun run generate

# Or directly
bun run generate:component
```

**The generator will create:**
- ✅ Component implementation (`.tsx`)
- ✅ TypeScript types (`.types.ts`)
- ✅ Constants (`.constants.ts`)
- ✅ Styles (`.styles.ts`)
- ✅ Documentation (`.md`)
- ✅ Storybook stories (`.stories.tsx`)
- ✅ Index exports (`index.ts`)

**Interactive prompts:**
1. Component name (PascalCase, e.g., `Avatar`)
2. Atomic Design level (atoms, molecules, organisms, templates)
3. Brief description
4. Has variants? (yes/no)
5. Has sizes? (yes/no)

📖 **Full Generator Guide**: See `plop/GENERATOR_GUIDE.md` for detailed documentation.

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

Each component **MUST** follow this structure:

- `{component}.tsx` - Main component implementation
- `{component}.types.ts` - TypeScript interfaces and types
- `{component}.constants.ts` - Component-specific constants
- `{component}.styles.ts` - StyleSheet definitions
- `{component}.md` - Component documentation
- `{component}.stories.tsx` - **REQUIRED** Storybook stories for visual testing
- `index.ts` - Component exports

### Example: Complete Button Component Structure

```
packages/ui/src/components/atoms/button/
├── button.tsx              # Component implementation
├── button.types.ts         # TypeScript types
├── button.constants.ts     # Component constants
├── button.styles.ts        # Styles
├── button.md               # Documentation
├── button.stories.tsx      # ⭐ REQUIRED: Storybook stories
└── index.ts                # Exports
```

**Important**: Every component must include a `.stories.tsx` file for visual testing and documentation in Storybook.

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

### Option 1: Use the Generator (Recommended) ⭐

The fastest and most consistent way to create components:

```bash
cd packages/ui
bun run generate
```

Follow the interactive prompts and all 7 files will be created automatically!

### Option 2: Manual Creation

If you prefer to create components manually:

```bash
# For an atom (example: Avatar)
mkdir -p packages/ui/src/components/atoms/avatar

# Create ALL required files (including stories!)
touch packages/ui/src/components/atoms/avatar/{avatar.tsx,avatar.types.ts,avatar.constants.ts,avatar.styles.ts,avatar.md,avatar.stories.tsx,index.ts}

# For a molecule (example: InputField)
mkdir -p packages/ui/src/components/molecules/input-field

# Create ALL required files
touch packages/ui/src/components/molecules/input-field/{input-field.tsx,input-field.types.ts,input-field.constants.ts,input-field.styles.ts,input-field.md,input-field.stories.tsx,index.ts}
```

### 2. Implement Component Files

Follow the Button component (`packages/ui/src/components/atoms/button/`) as a reference implementation for all files.

### 3. Create Storybook Stories (REQUIRED)

Every component **MUST** have a `.stories.tsx` file. Example template:

```typescript
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert } from 'react-native';
import { Avatar } from './avatar';

const meta = {
  title: 'Atoms/Avatar',  // Atoms|Molecules|Organisms|Templates
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Avatar size',
    },
    source: {
      control: 'text',
      description: 'Image source URL',
    },
  },
  args: {
    size: 'medium',
    source: 'https://example.com/avatar.jpg',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
```

#### Story Naming Convention by Atomic Level:

```typescript
// Atoms
title: 'Atoms/Button'
title: 'Atoms/Avatar'
title: 'Atoms/Text'

// Molecules
title: 'Molecules/InputField'
title: 'Molecules/Card'

// Organisms
title: 'Organisms/Form'
title: 'Organisms/Header'

// Templates
title: 'Templates/ScreenLayout'
```

### 4. Export Component

Add export to the appropriate index file:

```typescript
// For atoms: packages/ui/src/components/atoms/index.ts
export * from './avatar';

// For molecules: packages/ui/src/components/molecules/index.ts
export * from './input-field';
```

### 5. Document Component

Create comprehensive documentation in `{component}.md` including:
- Component overview
- Props table
- Usage examples
- Variants and states
- Accessibility notes

### 6. Test in Storybook

```bash
# Start Storybook app
turbo -F storybook dev

# Regenerate stories if needed
cd apps/storybook
bun run storybook-generate
```

Navigate to your component in the Storybook app to verify all variants work correctly.

## 🧪 Testing

```bash
# Run tests (when implemented)
bun test
```

## 📚 Storybook Integration

This package is fully integrated with Storybook for React Native for visual component development and testing.

### Running Storybook

```bash
# From project root
bun run dev

# Or specifically for storybook app
turbo -F storybook dev
```

### Storybook Features

- 👁️ **Visual Testing**: View components in isolation
- 🎮 **Interactive Controls**: Modify props in real-time via controls panel
- 📱 **Device Testing**: Test on real devices and simulators
- 🔄 **Variant Comparison**: Compare different variants side-by-side
- 📸 **Documentation**: Auto-generated component documentation

### Story Best Practices

**Every component MUST include stories for:**
- ✅ Default state
- ✅ All variants (e.g., primary, secondary, outline)
- ✅ All sizes (e.g., small, medium, large)
- ✅ Disabled state
- ✅ Edge cases
- ✅ Composition examples (showing multiple variants together)

### Story Controls

Make stories interactive with `argTypes`:

```typescript
argTypes: {
  variant: { 
    control: 'select', 
    options: ['primary', 'secondary', 'outline'],
    description: 'Button variant style',
  },
  disabled: { 
    control: 'boolean',
    description: 'Disable the button',
  },
  size: { 
    control: 'select', 
    options: ['small', 'medium', 'large'],
    description: 'Button size',
  },
}
```

### Storybook File Location

Stories are co-located with their components:

```
packages/ui/src/components/
├── atoms/
│   ├── button/
│   │   └── button.stories.tsx
│   └── avatar/
│       └── avatar.stories.tsx
├── molecules/
│   └── card/
│       └── card.stories.tsx
└── organisms/
    └── form/
        └── form.stories.tsx
```

### Story Discovery

The Storybook app automatically discovers all `.stories.tsx` files:

```typescript
// apps/storybook/.rnstorybook/main.ts
stories: [
  "../../../packages/ui/src/components/**/*.stories.?(ts|tsx|js|jsx)",
]
```

## 📄 License

Private - Part of Superapp monorepo

## 👥 Contributing

This is a private monorepo package. Follow the project's coding standards and conventions when adding new components.

### Component Checklist

Before submitting a new component, ensure:

- ✅ All 7 required files are created (tsx, types, constants, styles, md, **stories**, index)
- ✅ Component follows Atomic Design principles
- ✅ TypeScript types are properly exported
- ✅ Storybook stories cover all variants and states
- ✅ Component documentation is complete
- ✅ Code passes `bun run check-types`
- ✅ Code is formatted with `bun x ultracite fix`
- ✅ Component is tested in Storybook app

## 📚 Resources

- [Storybook React Native Docs](https://github.com/storybookjs/react-native)
- [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built with ❤️ using React Native, TypeScript, Atomic Design, and Storybook**
