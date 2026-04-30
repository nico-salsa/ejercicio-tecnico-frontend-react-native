import React, {useState} from 'react';

import {ProductCreateScreen} from './src/screens/ProductCreateScreen';
import {ProductDetailScreen} from './src/screens/ProductDetailScreen';
import {ProductListScreen} from './src/screens/ProductListScreen';
import {useFinancialProducts} from './src/hooks/useFinancialProducts';
import type {FinancialProduct} from './src/types/financialProduct';

type ViewState =
  | {type: 'list'}
  | {type: 'detail'; product: FinancialProduct}
  | {type: 'create'};

function App(): React.JSX.Element {
  const {addProduct, error, isLoading, products, retry} = useFinancialProducts();
  const [view, setView] = useState<ViewState>({type: 'list'});

  if (view.type === 'detail') {
    return (
      <ProductDetailScreen
        onBack={() => setView({type: 'list'})}
        product={view.product}
      />
    );
  }

  if (view.type === 'create') {
    return (
      <ProductCreateScreen
        onBack={() => setView({type: 'list'})}
        onCreateSuccess={product => {
          addProduct(product);
          setView({type: 'list'});
        }}
      />
    );
  }

  return (
    <ProductListScreen
      error={error}
      isLoading={isLoading}
      onCreateProduct={() => setView({type: 'create'})}
      onSelectProduct={product => setView({type: 'detail', product})}
      products={products}
      retry={retry}
    />
  );
}

export default App;
