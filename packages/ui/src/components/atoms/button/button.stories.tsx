import type { Meta, StoryObj } from "@storybook/react-native";
import { Alert } from "react-native";
import { Button } from "./button";

/**
 * Button component stories
 *
 * A highly customizable button component with multiple variants, sizes, and states.
 */
const meta = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    title: {
      control: "text",
      description: "The text to display on the button",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description: "The visual variant of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button takes full width",
    },
    onPress: {
      action: "pressed",
      description: "Function called when button is pressed",
    },
  },
  args: {
    title: "Button",
    variant: "primary",
    size: "medium",
    disabled: false,
    fullWidth: false,
    onPress: () => Alert.alert("Button Pressed", "You pressed the button!"),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default button with primary variant and medium size
 */
export const Default: Story = {};

/**
 * Primary button variant (default)
 */
export const Primary: Story = {
  args: {
    title: "Primary Button",
    variant: "primary",
  },
};

/**
 * Secondary button variant with purple background
 */
export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    variant: "secondary",
  },
};

/**
 * Outline button variant with transparent background and border
 */
export const Outline: Story = {
  args: {
    title: "Outline Button",
    variant: "outline",
  },
};

/**
 * Ghost button variant with transparent background
 */
export const Ghost: Story = {
  args: {
    title: "Ghost Button",
    variant: "ghost",
  },
};

/**
 * Small button size
 */
export const Small: Story = {
  args: {
    title: "Small Button",
    size: "small",
  },
};

/**
 * Medium button size (default)
 */
export const Medium: Story = {
  args: {
    title: "Medium Button",
    size: "medium",
  },
};

/**
 * Large button size
 */
export const Large: Story = {
  args: {
    title: "Large Button",
    size: "large",
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    disabled: true,
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    title: "Full Width Button",
    fullWidth: true,
  },
};

/**
 * Small primary button
 */
export const SmallPrimary: Story = {
  args: {
    title: "Small Primary",
    variant: "primary",
    size: "small",
  },
};

/**
 * Large secondary button
 */
export const LargeSecondary: Story = {
  args: {
    title: "Large Secondary",
    variant: "secondary",
    size: "large",
  },
};

/**
 * Full width outline button
 */
export const FullWidthOutline: Story = {
  args: {
    title: "Full Width Outline",
    variant: "outline",
    fullWidth: true,
  },
};

/**
 * Disabled secondary button
 */
export const DisabledSecondary: Story = {
  args: {
    title: "Disabled Secondary",
    variant: "secondary",
    disabled: true,
  },
};

/**
 * All size variants side by side (for visual comparison)
 */
export const AllSizes: Story = {
  render: () => (
    <>
      <Button onPress={() => Alert.alert("Small")} size="small" title="Small" />
      <Button
        onPress={() => Alert.alert("Medium")}
        size="medium"
        title="Medium"
      />
      <Button onPress={() => Alert.alert("Large")} size="large" title="Large" />
    </>
  ),
};

/**
 * All variant styles side by side (for visual comparison)
 */
export const AllVariants: Story = {
  render: () => (
    <>
      <Button
        onPress={() => Alert.alert("Primary")}
        title="Primary"
        variant="primary"
      />
      <Button
        onPress={() => Alert.alert("Secondary")}
        title="Secondary"
        variant="secondary"
      />
      <Button
        onPress={() => Alert.alert("Outline")}
        title="Outline"
        variant="outline"
      />
      <Button
        onPress={() => Alert.alert("Ghost")}
        title="Ghost"
        variant="ghost"
      />
    </>
  ),
};
