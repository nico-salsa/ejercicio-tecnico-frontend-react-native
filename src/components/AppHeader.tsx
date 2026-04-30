import React from 'react';
import {StyleSheet} from 'react-native';

import {AppText, BankMark, Stack, borders, colors, spacing} from '../designSystem';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({title = 'BANCO'}: AppHeaderProps): React.JSX.Element {
  return (
    <Stack
      align="center"
      direction="row"
      gap={spacing.xs}
      justify="center"
      style={styles.container}>
      <BankMark />
      <AppText variant="overline">{title}</AppText>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: borders.thin,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
  },
});
