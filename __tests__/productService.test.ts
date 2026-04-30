import {
  createFinancialProduct,
  fetchFinancialProducts,
  updateFinancialProduct,
  verifyFinancialProductId,
} from '../src/services/productService';

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

  it('verifica si un identificador ya existe', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => true,
      ok: true,
    } as Response);

    await expect(verifyFinancialProductId('uno')).resolves.toBe(true);
  });

  it('crea un producto financiero', async () => {
    const createdProduct = {
      id: 'nuevo',
      name: 'Cuenta Inversion',
      description: 'Producto creado desde frontend',
      logo: 'https://example.com/logo.png',
      date_release: '2026-05-01',
      date_revision: '2027-05-01',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: createdProduct}),
      ok: true,
    } as Response);

    await expect(createFinancialProduct(createdProduct)).resolves.toEqual(
      createdProduct,
    );
  });

  it('actualiza un producto financiero', async () => {
    const updatedProduct = {
      name: 'Cuenta Inversion Plus',
      description: 'Producto actualizado desde frontend',
      logo: 'https://example.com/logo-updated.png',
      date_release: '2026-05-01',
      date_revision: '2027-05-01',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: updatedProduct}),
      ok: true,
    } as Response);

    await expect(
      updateFinancialProduct('uno', updatedProduct),
    ).resolves.toEqual({
      id: 'uno',
      ...updatedProduct,
    });
  });
});
