import React from 'react';
import {StyleSheet} from 'react-native';

import {AppText, Stack, colors, spacing} from '../designSystem';

interface ProductRecordCountProps {
  filteredCount: number;
  hasActiveFilter: boolean;
  totalCount: number;
}

export function ProductRecordCount({
  filteredCount,
  hasActiveFilter,
  totalCount,
}: ProductRecordCountProps): React.JSX.Element {
  const primaryLabel = hasActiveFilter
    ? `${filteredCount} de ${totalCount} registros`
    : `${totalCount} registros`;

  const secondaryLabel = hasActiveFilter
    ? 'Cantidad visible segun la busqueda'
    : 'Cantidad obtenida desde la API';

  return (
    <Stack gap={spacing.xxs} style={styles.container}>
      <AppText style={styles.primaryLabel} variant="bodyStrong">
        {primaryLabel}
      </AppText>
      <AppText variant="caption">{secondaryLabel}</AppText>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm + 2,
  },
  primaryLabel: {
    color: colors.accent,
    textTransform: 'capitalize',
  },
});
