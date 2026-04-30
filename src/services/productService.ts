import {API_CONFIG} from '../config/api';
import type {
  FinancialProduct,
  FinancialProductsResponse,
} from '../types/financialProduct';

export async function fetchFinancialProducts(): Promise<FinancialProduct[]> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.productsPath}`,
  );

  if (!response.ok) {
    throw new Error('No fue posible consultar los productos financieros.');
  }

  const payload = (await response.json()) as FinancialProductsResponse;
  return payload.data ?? [];
}
