import type {FinancialProduct} from '../types/financialProduct';

export function normalizeSearchTerm(value: string): string {
  return value.trim().toLowerCase();
}

export function filterFinancialProducts(
  products: FinancialProduct[],
  query: string,
): FinancialProduct[] {
  const normalizedQuery = normalizeSearchTerm(query);

  if (!normalizedQuery) {
    return products;
  }

  return products.filter(product => {
    const searchableName = normalizeSearchTerm(product.name);
    const searchableId = normalizeSearchTerm(product.id);

    return (
      searchableName.includes(normalizedQuery) ||
      searchableId.includes(normalizedQuery)
    );
  });
}
