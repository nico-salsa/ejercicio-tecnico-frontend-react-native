import React, {useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';

import {FeedbackState} from '../components/FeedbackState';
import {LoadingState} from '../components/LoadingState';
import {ProductListItem} from '../components/ProductListItem';
import {ProductRecordCount} from '../components/ProductRecordCount';
import {ProductSearchField} from '../components/ProductSearchField';
import {ScreenLayout} from '../components/ScreenLayout';
import {Surface, colors, radii} from '../designSystem';
import {useFinancialProducts} from '../hooks/useFinancialProducts';
import type {FinancialProduct} from '../types/financialProduct';
import {filterFinancialProducts, normalizeSearchTerm} from '../utils/search';

interface ProductListScreenProps {
  onSelectProduct: (product: FinancialProduct) => void;
}

export function ProductListScreen({
  onSelectProduct,
}: ProductListScreenProps): React.JSX.Element {
  const {error, isLoading, products, retry} = useFinancialProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = filterFinancialProducts(products, searchQuery);
  const hasSearchQuery = normalizeSearchTerm(searchQuery).length > 0;

  const renderItem: ListRenderItem<FinancialProduct> = ({item}) => (
    <ProductListItem onPress={() => onSelectProduct(item)} product={item} />
  );

  return (
    <ScreenLayout>
      <ProductSearchField onChangeText={setSearchQuery} value={searchQuery} />

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

      {!isLoading && !error && products.length > 0 && filteredProducts.length === 0 ? (
        <FeedbackState
          message={`No se encontraron productos para "${searchQuery.trim()}".`}
          title="Sin resultados"
        />
      ) : null}

      {!isLoading && !error && filteredProducts.length > 0 ? (
        <Surface style={styles.listCard} variant="card">
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </Surface>
      ) : null}

      {!isLoading && !error && products.length > 0 ? (
        <ProductRecordCount
          filteredCount={filteredProducts.length}
          hasActiveFilter={hasSearchQuery}
          totalCount={products.length}
        />
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  listCard: {
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
