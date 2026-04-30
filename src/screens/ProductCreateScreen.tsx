import React from 'react';

import {createFinancialProduct, verifyFinancialProductId} from '../services/productService';
import type {FinancialProduct} from '../types/financialProduct';
import {toFinancialProductInput, validateProductForm} from '../utils/productForm';
import {ProductFormScreen} from './ProductFormScreen';

interface ProductCreateScreenProps {
  onBack: () => void;
  onCreateSuccess: (product: FinancialProduct) => void;
}

export function ProductCreateScreen({
  onBack,
  onCreateSuccess,
}: ProductCreateScreenProps): React.JSX.Element {
  return (
    <ProductFormScreen
      heading="Formulario de Registro"
      onBack={onBack}
      onBeforeSubmit={async values => {
        const existingId = await verifyFinancialProductId(values.id.trim());
        return validateProductForm(values, {existingId});
      }}
      onSubmit={async values => {
        const createdProduct = await createFinancialProduct(
          toFinancialProductInput(values),
        );
        onCreateSuccess(createdProduct);
      }}
      submitErrorTitle="No fue posible registrar el producto"
      submitLabel="Agregar"
    />
  );
}
