import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Text} from 'react-native';

import App from '../App';

const mockProducts = [
  {
    id: 'trj-crd',
    name: 'Tarjetas de Crédito',
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

  it('renderiza el listado despues de cargar productos', async () => {
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

    expect(content).toContain('Tarjetas de Crédito');
    expect(content).toContain('productos cargados desde la API.');

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
    expect(content).toContain('Tarjetas de Crédito');
    expect(content).toContain('Editar');
    expect(content).toContain('Eliminar');

    await act(async () => {
      app!.unmount();
    });
  });

  it('filtra el listado desde el campo de busqueda', async () => {
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
    expect(content).not.toContain('Tarjetas de Crédito');
    expect(content).toContain('productos coinciden con tu busqueda.');

    await act(async () => {
      app!.unmount();
    });
  });

  it('muestra un estado visual cuando la busqueda no tiene coincidencias', async () => {
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
