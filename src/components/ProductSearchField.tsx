import React from 'react';
import {StyleSheet} from 'react-native';

import {AppField, spacing} from '../designSystem';

export function ProductSearchField(): React.JSX.Element {
  return (
    <AppField containerStyle={styles.container} editable={false} placeholder="Search..." value="" />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
});
