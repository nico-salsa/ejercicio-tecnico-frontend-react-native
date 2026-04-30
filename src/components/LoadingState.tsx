import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {colors, spacing} from '../designSystem';

export function LoadingState(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.info} size="small" />
      <Text style={styles.text}>Cargando productos financieros...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  text: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.md,
  },
});
