import { Pressable, Text } from "react-native";
import { BUTTON_DEFAULTS, BUTTON_SIZES } from "./button.constants";
import { styles } from "./button.styles";
import type { ButtonProps } from "./button.types";

export function Button({
  title,
  onPress,
  disabled = BUTTON_DEFAULTS.disabled,
  variant = BUTTON_DEFAULTS.variant,
  size = BUTTON_DEFAULTS.size,
  fullWidth = BUTTON_DEFAULTS.fullWidth,
  testID,
}: ButtonProps) {
  const sizeConfig = BUTTON_SIZES[size];

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          paddingVertical: sizeConfig.paddingVertical,
          paddingHorizontal: sizeConfig.paddingHorizontal,
        },
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
      ]}
      testID={testID}
    >
      <Text
        style={[
          styles.text,
          { fontSize: sizeConfig.fontSize },
          variant === "outline" && styles.textOutline,
          variant === "ghost" && styles.textGhost,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
