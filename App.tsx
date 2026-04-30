import React, {useState} from 'react';

import {ProductDetailScreen} from './src/screens/ProductDetailScreen';
import {ProductListScreen} from './src/screens/ProductListScreen';
import type {FinancialProduct} from './src/types/financialProduct';

function App(): React.JSX.Element {
  const [selectedProduct, setSelectedProduct] =
    useState<FinancialProduct | null>(null);

  if (selectedProduct) {
    return (
      <ProductDetailScreen
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return <ProductListScreen onSelectProduct={setSelectedProduct} />;
}

export default App;
