import React, {useState} from 'react';

import {ProductCreateScreen} from './src/screens/ProductCreateScreen';
import {ProductDetailScreen} from './src/screens/ProductDetailScreen';
import {ProductEditScreen} from './src/screens/ProductEditScreen';
import {ProductListScreen} from './src/screens/ProductListScreen';
import {useFinancialProducts} from './src/hooks/useFinancialProducts';
import type {FinancialProduct} from './src/types/financialProduct';

type ViewState =
  | {type: 'list'}
  | {type: 'detail'; product: FinancialProduct}
  | {type: 'create'}
  | {type: 'edit'; product: FinancialProduct};

function App(): React.JSX.Element {
  const {addProduct, error, isLoading, products, retry, updateProduct} =
    useFinancialProducts();
  const [view, setView] = useState<ViewState>({type: 'list'});

  if (view.type === 'detail') {
    return (
      <ProductDetailScreen
        onBack={() => setView({type: 'list'})}
        onEdit={() => setView({type: 'edit', product: view.product})}
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

  if (view.type === 'edit') {
    return (
      <ProductEditScreen
        onBack={() => setView({type: 'detail', product: view.product})}
        onEditSuccess={product => {
          updateProduct(product);
          setView({type: 'list'});
        }}
        product={view.product}
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
