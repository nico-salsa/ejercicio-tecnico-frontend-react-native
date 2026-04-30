import {API_CONFIG} from '../config/api';
import type {
  FinancialProduct,
  FinancialProductInput,
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

export async function verifyFinancialProductId(id: string): Promise<boolean> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.productsPath}/verification/${id}`,
  );

  if (!response.ok) {
    throw new Error('No fue posible verificar el identificador del producto.');
  }

  return (await response.json()) as boolean;
}

export async function createFinancialProduct(
  payload: FinancialProductInput,
): Promise<FinancialProduct> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.productsPath}`,
    {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  if (!response.ok) {
    throw new Error('No fue posible crear el producto financiero.');
  }

  const body = (await response.json()) as {data: FinancialProduct};
  return body.data;
}
