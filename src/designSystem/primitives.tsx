import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {borders, colors, radii, shadows, spacing, sizing, typography} from './tokens';

type TextVariant =
  | 'body'
  | 'bodyStrong'
  | 'caption'
  | 'field'
  | 'heading'
  | 'headingSmall'
  | 'label'
  | 'link'
  | 'metric'
  | 'overline'
  | 'subtitle';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
}

interface StackProps extends ViewProps {
  align?: ViewStyle['alignItems'];
  direction?: ViewStyle['flexDirection'];
  gap?: number;
  justify?: ViewStyle['justifyContent'];
}

interface SurfaceProps extends ViewProps {
  padded?: boolean;
  variant?: 'card' | 'muted' | 'plain';
}

interface AppButtonProps {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  testID?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface AppFieldProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
}

// Las primitivas son wrappers pequenos sobre componentes nativos.
// Su trabajo es imponer el lenguaje visual comun, no esconder React Native.
export function AppText({
  style,
  variant = 'body',
  ...props
}: AppTextProps): React.JSX.Element {
  return <Text {...props} style={[typography[variant], style]} />;
}

export function Stack({
  align,
  children,
  direction = 'column',
  gap = 0,
  justify,
  style,
  ...props
}: StackProps): React.JSX.Element {
  return (
    <View
      {...props}
      style={[
        {
          alignItems: align,
          flexDirection: direction,
          gap,
          justifyContent: justify,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export function Surface({
  children,
  padded = false,
  style,
  variant = 'plain',
  ...props
}: SurfaceProps): React.JSX.Element {
  return (
    <View
      {...props}
      style={[
        styles.surfaceBase,
        variant === 'card' ? styles.surfaceCard : null,
        variant === 'muted' ? styles.surfaceMuted : null,
        padded ? styles.surfacePadded : null,
        style,
      ]}>
      {children}
    </View>
  );
}

export function AppButton({
  disabled = false,
  label,
  onPress,
  testID,
  variant = 'primary',
}: AppButtonProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonBase,
        variant === 'primary' ? styles.buttonPrimary : null,
        variant === 'secondary' ? styles.buttonSecondary : null,
        variant === 'danger' ? styles.buttonDanger : null,
        pressed ? styles.buttonPressed : null,
        disabled ? styles.buttonDisabled : null,
      ]}
      testID={testID}>
      <AppText
        style={variant === 'secondary' ? styles.buttonSecondaryText : styles.buttonPrimaryText}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function AppField({
  containerStyle,
  editable = true,
  placeholderTextColor = '#9CA3AF',
  ...props
}: AppFieldProps): React.JSX.Element {
  return (
    <View style={containerStyle}>
      <TextInput
        {...props}
        editable={editable}
        placeholderTextColor={placeholderTextColor}
        style={[styles.field, !editable ? styles.fieldDisabled : null]}
      />
    </View>
  );
}

export function ScreenContainer({children, style, ...props}: ViewProps): React.JSX.Element {
  return (
    <View {...props} style={[styles.screen, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    borderRadius: radii.sm,
    justifyContent: 'center',
    minHeight: sizing.touch,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonPrimary: {
    backgroundColor: colors.info,
  },
  buttonPrimaryText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  buttonSecondary: {
    backgroundColor: colors.accentSoft,
  },
  buttonSecondaryText: {
    color: '#355089',
    fontSize: 14,
    fontWeight: '700',
  },
  field: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: borders.thin,
    color: colors.textStrong,
    fontSize: typography.field.fontSize,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  fieldDisabled: {
    opacity: 0.75,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  surfaceBase: {
    backgroundColor: colors.background,
  },
  surfaceCard: {
    ...shadows.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: borders.thin,
    overflow: 'hidden',
  },
  surfaceMuted: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderSoft,
    borderRadius: radii.xl,
    borderWidth: borders.thin,
  },
  surfacePadded: {
    padding: spacing.xxl,
  },
});
