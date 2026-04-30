import {useCallback, useEffect, useState} from 'react';

import {fetchFinancialProducts} from '../services/productService';
import type {FinancialProduct} from '../types/financialProduct';

interface UseFinancialProductsResult {
  addProduct: (product: FinancialProduct) => void;
  error: string | null;
  isLoading: boolean;
  products: FinancialProduct[];
  retry: () => Promise<void>;
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
    retry: loadProducts,
  };
}
