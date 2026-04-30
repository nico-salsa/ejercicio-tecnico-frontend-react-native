import React from 'react';
import {StyleSheet, TextInputProps, View} from 'react-native';

import {AppField, AppText, FieldMessage, spacing} from '../designSystem';

interface ProductFormFieldProps extends Omit<TextInputProps, 'style'> {
  error?: string;
  label: string;
}

export function ProductFormField({
  error,
  label,
  ...props
}: ProductFormFieldProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.label} variant="bodyStrong">
        {label}
      </AppText>
      <AppField hasError={Boolean(error)} {...props} />
      {error ? <FieldMessage tone="error">{error}</FieldMessage> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.sm,
  },
});
