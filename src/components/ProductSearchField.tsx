import React from 'react';
import {StyleSheet} from 'react-native';

import {AppField, spacing} from '../designSystem';

interface ProductSearchFieldProps {
  onChangeText: (value: string) => void;
  value: string;
}

export function ProductSearchField({
  onChangeText,
  value,
}: ProductSearchFieldProps): React.JSX.Element {
  return (
    <AppField
      autoCapitalize="none"
      autoCorrect={false}
      containerStyle={styles.container}
      onChangeText={onChangeText}
      placeholder="Search..."
      testID="product-search-input"
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
});
