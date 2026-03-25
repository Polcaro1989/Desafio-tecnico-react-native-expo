import type { ComponentProps, PropsWithChildren } from "react";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text as RNText,
  TextInput,
  View,
} from "react-native";

function createViewComponent(displayName: string) {
  function MockView({ children, ...props }: PropsWithChildren<Record<string, unknown>>) {
    return <View {...props}>{children}</View>;
  }

  MockView.displayName = displayName;

  return MockView;
}

function Text({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof RNText>>) {
  return <RNText {...props}>{children}</RNText>;
}

function Button({
  children,
  onPress,
  ...props
}: PropsWithChildren<ComponentProps<typeof Pressable>>) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function Input({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof View>>) {
  return <View {...props}>{children}</View>;
}

function InputField(props: ComponentProps<typeof TextInput>) {
  return <TextInput {...props} />;
}

function Spinner(props: ComponentProps<typeof ActivityIndicator>) {
  return <ActivityIndicator {...props} />;
}

export const Badge = createViewComponent("Badge");
export const BadgeText = Text;
export const Box = createViewComponent("Box");
export const ButtonSpinner = Spinner;
export const ButtonText = Text;
export const FormControl = createViewComponent("FormControl");
export const FormControlError = createViewComponent("FormControlError");
export const FormControlErrorText = Text;
export const FormControlHelper = createViewComponent("FormControlHelper");
export const FormControlHelperText = Text;
export const FormControlLabel = createViewComponent("FormControlLabel");
export const FormControlLabelText = Text;
export const GluestackUIProvider = ({
  children,
}: PropsWithChildren<{ config?: unknown }>) => <>{children}</>;
export const HStack = createViewComponent("HStack");
export { Input, InputField, Button, Spinner, Text };
export const VStack = createViewComponent("VStack");
