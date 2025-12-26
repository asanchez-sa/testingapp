import type { GestureResponderEvent } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  /**
   * The text to display on the button
   */
  title: string;

  /**
   * Function to call when the button is pressed
   */
  onPress: (event: GestureResponderEvent) => void;

  /**
   * If true, the button will be disabled and not pressable
   * @default false
   */
  disabled?: boolean;

  /**
   * The visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * If true, the button will take the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Test ID for testing purposes
   */
  testID?: string;
}
