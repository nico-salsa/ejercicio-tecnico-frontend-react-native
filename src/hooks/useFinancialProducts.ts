import {useCallback, useEffect, useState} from 'react';

import {fetchFinancialProducts} from '../services/productService';
import type {FinancialProduct} from '../types/financialProduct';

interface UseFinancialProductsResult {
  addProduct: (product: FinancialProduct) => void;
  error: string | null;
  isLoading: boolean;
  products: FinancialProduct[];
  removeProduct: (productId: string) => void;
  retry: () => Promise<void>;
  updateProduct: (product: FinancialProduct) => void;
}

export function useFinancialProducts(): UseFinancialProductsResult {
  const [products, setProducts] = useState<FinancialProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const nextProducts = await fetchFinancialProducts();
      setProducts(nextProducts);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Ocurrio un error inesperado al cargar productos.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return {
    addProduct: (product: FinancialProduct) => {
      setProducts(currentProducts => [product, ...currentProducts]);
    },
    error,
    isLoading,
    products,
    removeProduct: (productId: string) => {
      setProducts(currentProducts =>
        currentProducts.filter(product => product.id !== productId),
      );
    },
    retry: loadProducts,
    updateProduct: (product: FinancialProduct) => {
      setProducts(currentProducts =>
        currentProducts.map(currentProduct =>
          currentProduct.id === product.id ? product : currentProduct,
        ),
      );
    },
  };
}
