import React from 'react';
import {StyleSheet} from 'react-native';

import {AppText, colors, spacing} from '../designSystem';

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

  return (
    <AppText style={styles.primaryLabel} variant="bodyStrong">
      {primaryLabel}
    </AppText>
  );
}

const styles = StyleSheet.create({
  primaryLabel: {
    color: colors.accent,
    marginTop: spacing.sm + 2,
    textTransform: 'capitalize',
  },
});
