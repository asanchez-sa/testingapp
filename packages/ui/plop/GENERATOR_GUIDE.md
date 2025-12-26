# Component Generator Guide

## 🚀 Quick Start

Generate a new component with all required files automatically:

```bash
cd packages/ui
bun run generate

# Or directly
bun run generate:component
```

## 📝 Interactive Prompts

The generator will ask you:

### 1. Component Name
- **Format**: PascalCase (e.g., `Avatar`, `InputField`, `UserCard`)
- **Examples**: 
  - ✅ `Avatar`
  - ✅ `InputField`
  - ✅ `SearchBar`
  - ❌ `avatar` (lowercase)
  - ❌ `input-field` (kebab-case)

### 2. Atomic Design Level
Choose where your component fits:
- **Atoms**: Basic building blocks (Button, Text, Icon, Avatar)
- **Molecules**: Simple combinations (InputField, Card, SearchBar)
- **Organisms**: Complex components (Form, Header, Navigation)
- **Templates**: Page layouts (ScreenLayout, AuthLayout)

### 3. Description
A brief description of what the component does.
- Example: "User profile avatar component"
- Used in documentation and Storybook

### 4. Has Variants?
Does your component have visual variants?
- **Yes**: Different styles (primary, secondary, outline, etc.)
- **No**: Single visual style
- Examples with variants: Buttons, Cards, Badges
- Examples without: Avatar, Divider, Spacer

### 5. Has Sizes?
Does your component have different sizes?
- **Yes**: Multiple size options (small, medium, large)
- **No**: Fixed size or flexible sizing
- Examples with sizes: Buttons, Icons, Avatars
- Examples without: Divider, Container

## 📦 Generated Files

The generator creates 7 files automatically:

```
src/components/{level}/{component-name}/
├── {component-name}.tsx              # Component implementation
├── {component-name}.types.ts         # TypeScript interfaces
├── {component-name}.constants.ts     # Component constants
├── {component-name}.styles.ts        # StyleSheet styles
├── {component-name}.md               # Documentation
├── {component-name}.stories.tsx      # Storybook stories
└── index.ts                          # Exports
```

## 🎯 Example Usage

### Example 1: Creating an Avatar Component

```bash
$ bun run generate

? Component name: Avatar
? Atomic Design level: Atoms
? Description: User profile avatar component
? Has variants? No
? Has sizes? Yes

✅ Component "Avatar" created successfully!
```

**Result**: Creates `src/components/atoms/avatar/` with all 7 files.

### Example 2: Creating a Card Component

```bash
$ bun run generate

? Component name: Card
? Atomic Design level: Molecules
? Description: Reusable card container component
? Has variants? Yes
? Has sizes? No

✅ Component "Card" created successfully!
```

**Result**: Creates `src/components/molecules/card/` with all 7 files.

## 🔧 After Generation

### 1. Implement Component Logic
Edit `{component-name}.tsx` to add your component's functionality.

### 2. Customize Styles
Modify `{component-name}.styles.ts` to match your design requirements.

### 3. Update Constants
Adjust values in `{component-name}.constants.ts` (colors, sizes, etc.).

### 4. Complete Types
Add any additional props in `{component-name}.types.ts`.

### 5. Write Documentation
Enhance `{component-name}.md` with detailed usage examples.

### 6. Expand Stories
Add more stories in `{component-name}.stories.tsx` for edge cases.

### 7. Test in Storybook
```bash
cd ../../apps/storybook
bun run dev
```

Navigate to your component in Storybook to verify it works.

## 📚 Import Your Component

### Direct Import (Recommended)
```typescript
import { Avatar } from '@superapp/ui/components/atoms/avatar';
```

### From Main Index
```typescript
import { Avatar } from '@superapp/ui';
```

## ✅ Component Checklist

After generating and implementing your component:

- [ ] Component logic implemented
- [ ] Styles customized
- [ ] All props documented in types
- [ ] Constants adjusted
- [ ] Documentation complete
- [ ] Stories cover all variants/sizes
- [ ] Tested in Storybook
- [ ] TypeScript passes: `bun run check-types`
- [ ] Code formatted: `bun x ultracite fix`

## 🎨 Tips

### When to Use Variants?
Use variants when your component has distinct visual styles:
- Buttons: primary, secondary, outline, ghost
- Cards: elevated, outlined, filled
- Badges: success, warning, error, info

### When to Use Sizes?
Use sizes when your component should be available in different dimensions:
- Buttons: small (mobile), medium (default), large (accessibility)
- Icons: 16px, 24px, 32px
- Avatars: 24px, 40px, 56px, 80px

### Naming Conventions
- **Single word**: `Avatar`, `Card`, `Badge`
- **Multiple words**: `InputField`, `SearchBar`, `UserCard`
- **Avoid**: `Input_Field`, `search-bar`, `usercard`

## 🚫 Common Mistakes

### ❌ Incorrect Component Names
```bash
avatar          # Should be Avatar
input-field     # Should be InputField
BUTTON          # Should be Button
```

### ❌ Wrong Atomic Level
- Don't put complex forms in Atoms
- Don't put simple buttons in Organisms
- Follow the Atomic Design hierarchy

### ✅ Correct Approach
```bash
Avatar          # ✓
InputField      # ✓
Button          # ✓
```

## 🔄 Regenerating a Component

If you want to regenerate a component:

1. Delete the existing component folder
2. Run the generator again
3. Re-implement your custom logic

**Note**: The generator will NOT overwrite existing components to prevent data loss.

## 📖 Resources

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Storybook React Native](https://github.com/storybookjs/react-native)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Pro Tip**: Use the generator for every new component to maintain consistency across your UI library!
