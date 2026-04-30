import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {FeedbackState} from '../components/FeedbackState';
import {LoadingState} from '../components/LoadingState';
import {ProductListItem} from '../components/ProductListItem';
import {ProductSearchField} from '../components/ProductSearchField';
import {ScreenLayout} from '../components/ScreenLayout';
import {useFinancialProducts} from '../hooks/useFinancialProducts';
import type {FinancialProduct} from '../types/financialProduct';

interface ProductListScreenProps {
  onSelectProduct: (product: FinancialProduct) => void;
}

export function ProductListScreen({
  onSelectProduct,
}: ProductListScreenProps): React.JSX.Element {
  const {error, isLoading, products, retry} = useFinancialProducts();

  const renderItem: ListRenderItem<FinancialProduct> = ({item}) => (
    <ProductListItem onPress={() => onSelectProduct(item)} product={item} />
  );

  return (
    <ScreenLayout>
      <ProductSearchField />

      {isLoading ? <LoadingState /> : null}

      {!isLoading && error ? (
        <FeedbackState
          actionLabel="Reintentar"
          message={error}
          onPress={() => {
            void retry();
          }}
          title="No fue posible cargar el listado"
        />
      ) : null}

      {!isLoading && !error && products.length === 0 ? (
        <FeedbackState
          message="Aun no hay productos financieros disponibles para mostrar."
          title="Listado vacio"
        />
      ) : null}

      {!isLoading && !error && products.length > 0 ? (
        <View style={styles.listCard}>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : null}

      {!isLoading && !error && products.length > 0 ? (
        <Text style={styles.caption}>
          {products.length} productos cargados desde la API.
        </Text>
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  listCard: {
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
