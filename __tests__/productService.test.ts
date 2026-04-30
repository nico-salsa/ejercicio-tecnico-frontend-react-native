import {fetchFinancialProducts} from '../src/services/productService';

describe('fetchFinancialProducts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('retorna los productos recibidos desde la API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({
        data: [
          {
            id: 'uno',
            name: 'Cuenta Nomina',
            description: 'Producto base',
            logo: 'https://example.com/logo.png',
            date_release: '2025-01-01',
            date_revision: '2026-01-01',
          },
        ],
      }),
      ok: true,
    } as Response);

    await expect(fetchFinancialProducts()).resolves.toHaveLength(1);
  });

  it('lanza error si la respuesta no es exitosa', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(fetchFinancialProducts()).rejects.toThrow(
      'No fue posible consultar los productos financieros.',
    );
  });
});
