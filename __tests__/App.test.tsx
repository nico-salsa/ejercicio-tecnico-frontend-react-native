import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Text} from 'react-native';

import App from '../App';

const mockProducts = [
  {
    id: 'trj-crd',
    name: 'Tarjetas de Credito',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'assets-1.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01',
  },
  {
    id: 'cta-aho',
    name: 'Cuenta de Ahorro',
    description: 'Producto de ahorro tradicional',
    logo: 'assets-2.png',
    date_release: '2025-02-01',
    date_revision: '2026-02-01',
  },
];

describe('App', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza el listado despues de cargar productos y muestra el conteo total', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: mockProducts}),
      ok: true,
    } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    const texts = app!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('Tarjetas de Credito');
    expect(content).toContain('2 registros');

    await act(async () => {
      app!.unmount();
    });
  });

  it('navega al detalle al seleccionar un producto', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: mockProducts}),
      ok: true,
    } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    const productButton = app!.root.findByProps({
      testID: 'product-item-trj-crd',
    });

    await act(async () => {
      productButton.props.onPress();
    });

    const texts = app!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('trj-crd');
    expect(content).toContain('Tarjetas de Credito');
    expect(content).toContain('Editar');
    expect(content).toContain('Eliminar');

    await act(async () => {
      app!.unmount();
    });
  });

  it('navega a la pantalla de edicion desde el detalle', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: mockProducts}),
      ok: true,
    } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    await act(async () => {
      app!.root.findByProps({testID: 'product-item-trj-crd'}).props.onPress();
    });

    await act(async () => {
      app!.root.findByProps({testID: 'open-edit-product'}).props.onPress();
    });

    expect(app!.root.findByProps({testID: 'product-form-id'}).props.editable).toBe(
      false,
    );

    const content = app!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('Formulario de Edicion');

    await act(async () => {
      app!.unmount();
    });
  });

  it('elimina un producto desde el detalle tras confirmar en el modal', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: async () => ({data: mockProducts}),
        ok: true,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
      } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    await act(async () => {
      app!.root.findByProps({testID: 'product-item-trj-crd'}).props.onPress();
    });

    await act(async () => {
      app!.root.findByProps({testID: 'open-delete-product'}).props.onPress();
    });

    await act(async () => {
      app!.root.findByProps({testID: 'confirm-delete-product'}).props.onPress();
    });

    const content = app!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('Cuenta de Ahorro');
    expect(content).not.toContain('Tarjetas de Credito');

    await act(async () => {
      app!.unmount();
    });
  });

  it('filtra el listado y actualiza el conteo relativo', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: mockProducts}),
      ok: true,
    } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    const searchInput = app!.root.findByProps({
      testID: 'product-search-input',
    });

    await act(async () => {
      searchInput.props.onChangeText('ahorro');
    });

    const texts = app!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('Cuenta de Ahorro');
    expect(content).not.toContain('Tarjetas de Credito');
    expect(content).toContain('1 de 2 registros');

    await act(async () => {
      app!.unmount();
    });
  });

  it('mantiene el conteo visible cuando la busqueda no tiene coincidencias', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({data: mockProducts}),
      ok: true,
    } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    const searchInput = app!.root.findByProps({
      testID: 'product-search-input',
    });

    await act(async () => {
      searchInput.props.onChangeText('hipoteca');
    });

    const texts = app!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('Sin resultados');
    expect(content).toContain('No se encontraron productos para "hipoteca".');
    expect(content).toContain('0 de 2 registros');

    await act(async () => {
      app!.unmount();
    });
  });

  it('muestra estado de error cuando falla la API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    let app: renderer.ReactTestRenderer;

    await act(async () => {
      app = renderer.create(<App />);
    });

    const texts = app!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('No fue posible cargar el listado');

    await act(async () => {
      app!.unmount();
    });
  });
});
