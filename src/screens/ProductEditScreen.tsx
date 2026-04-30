import React from 'react';

import {updateFinancialProduct} from '../services/productService';
import type {FinancialProduct} from '../types/financialProduct';
import {type ProductFormValues, toFinancialProductInput} from '../utils/productForm';
import {ProductFormScreen} from './ProductFormScreen';

interface ProductEditScreenProps {
  onBack: () => void;
  onEditSuccess: (product: FinancialProduct) => void;
  product: FinancialProduct;
}

function toProductFormValues(product: FinancialProduct): ProductFormValues {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    logo: product.logo,
    date_release: product.date_release,
    date_revision: product.date_revision,
  };
}

export function ProductEditScreen({
  onBack,
  onEditSuccess,
  product,
}: ProductEditScreenProps): React.JSX.Element {
  return (
    <ProductFormScreen
      heading="Formulario de Edicion"
      initialValues={toProductFormValues(product)}
      isIdEditable={false}
      onBack={onBack}
      onSubmit={async values => {
        const payload = toFinancialProductInput(values);
        const updatedProduct = await updateFinancialProduct(product.id, {
          name: payload.name,
          description: payload.description,
          logo: payload.logo,
          date_release: payload.date_release,
          date_revision: payload.date_revision,
        });
        onEditSuccess(updatedProduct);
      }}
      submitErrorTitle="No fue posible actualizar el producto"
      submitLabel="Guardar"
    />
  );
}
