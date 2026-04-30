import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {AppText, colors, sizing, spacing} from '../designSystem';
import type {FinancialProduct} from '../types/financialProduct';

interface ProductListItemProps {
  onPress: () => void;
  product: FinancialProduct;
}

export function ProductListItem({
  onPress,
  product,
}: ProductListItemProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityLabel={`Abrir detalle de ${product.name}`}
      onPress={onPress}
      style={styles.container}
      testID={`product-item-${product.id}`}>
      <View>
        <AppText variant="bodyStrong">{product.name}</AppText>
        <AppText style={styles.id} variant="metric">
          ID: {product.id}
        </AppText>
      </View>
      <AppText style={styles.chevron}>›</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chevron: {
    color: colors.textSoft,
    fontSize: 22,
    fontWeight: '400',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: sizing.listRowHeight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  id: {
    marginTop: spacing.xxs,
  },
});
