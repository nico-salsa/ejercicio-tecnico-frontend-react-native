import {filterFinancialProducts, normalizeSearchTerm} from '../src/utils/search';

const mockProducts = [
  {
    id: 'trj-crd',
    name: 'Tarjetas de Crédito',
    description: 'Tarjeta de consumo',
    logo: 'assets-1.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01',
  },
  {
    id: 'cta-aho',
    name: 'Cuenta de Ahorro',
    description: 'Ahorro tradicional',
    logo: 'assets-2.png',
    date_release: '2025-02-01',
    date_revision: '2026-02-01',
  },
];

describe('search utils', () => {
  it('normaliza mayusculas y espacios sobrantes', () => {
    expect(normalizeSearchTerm('  TaRjEtAs  ')).toBe('tarjetas');
  });

  it('filtra productos por nombre', () => {
    expect(filterFinancialProducts(mockProducts, 'ahorro')).toEqual([
      mockProducts[1],
    ]);
  });

  it('filtra productos por identificador', () => {
    expect(filterFinancialProducts(mockProducts, 'TRJ')).toEqual([
      mockProducts[0],
    ]);
  });

  it('devuelve todos los productos cuando no hay termino de busqueda', () => {
    expect(filterFinancialProducts(mockProducts, '   ')).toEqual(mockProducts);
  });
});
