import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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
      testID={`product-item-${product.id}`}
      style={styles.container}>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.id}>ID: {product.id}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chevron: {
    color: '#94A3B8',
    fontSize: 22,
    fontWeight: '400',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 66,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  id: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
  name: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
});
