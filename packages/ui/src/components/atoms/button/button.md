# Button Component

A highly customizable button component for React Native applications following Atomic Design principles.

## Overview

The Button component is an atomic UI element that provides a consistent, accessible, and customizable button interface across your application.

## Import

```typescript
// Direct import (recommended for tree-shaking)
import { Button } from '@superapp/ui/components/atoms/button';

// Alternative: from main index
import { Button } from '@superapp/ui';
```

## Basic Usage

```typescript
import { Button } from '@superapp/ui/components/atoms/button';

function MyComponent() {
  return (
    <Button
      title="Click me"
      onPress={() => console.log('Button pressed')}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | *required* | The text to display on the button |
| `onPress` | `(event: GestureResponderEvent) => void` | *required* | Function to call when the button is pressed |
| `disabled` | `boolean` | `false` | If true, the button will be disabled and not pressable |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | The visual variant of the button |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the button |
| `fullWidth` | `boolean` | `false` | If true, the button will take the full width of its container |
| `testID` | `string` | `undefined` | Test ID for testing purposes |

## Variants

### Primary (default)
```typescript
<Button title="Primary Button" onPress={handlePress} />
<Button title="Primary Button" onPress={handlePress} variant="primary" />
```

### Secondary
```typescript
<Button title="Secondary Button" onPress={handlePress} variant="secondary" />
```

### Outline
```typescript
<Button title="Outline Button" onPress={handlePress} variant="outline" />
```

### Ghost
```typescript
<Button title="Ghost Button" onPress={handlePress} variant="ghost" />
```

## Sizes

### Small
```typescript
<Button title="Small Button" onPress={handlePress} size="small" />
```

### Medium (default)
```typescript
<Button title="Medium Button" onPress={handlePress} size="medium" />
```

### Large
```typescript
<Button title="Large Button" onPress={handlePress} size="large" />
```

## States

### Disabled
```typescript
<Button title="Disabled Button" onPress={handlePress} disabled />
```

### Full Width
```typescript
<Button title="Full Width Button" onPress={handlePress} fullWidth />
```

## Examples

### Combined Props
```typescript
<Button
  title="Large Secondary Button"
  onPress={handlePress}
  variant="secondary"
  size="large"
  fullWidth
/>
```

### With Alert
```typescript
import { Alert } from 'react-native';

<Button
  title="Show Alert"
  onPress={() => Alert.alert('Success', 'Button was pressed!')}
  variant="primary"
/>
```

## Accessibility

The Button component automatically handles:
- Press feedback (opacity change)
- Disabled state styling
- Touch target sizing

## Customization

You can customize the button colors and sizes by modifying the constants:

```typescript
// Import constants
import { BUTTON_COLORS, BUTTON_SIZES } from '@superapp/ui/components/atoms/button';
```

## Notes

- The button uses `Pressable` from React Native for better press handling
- Press feedback is applied automatically with opacity changes
- All variants support all sizes
- The component is fully typed with TypeScript
