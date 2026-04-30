import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Image, Text} from 'react-native';

import {ProductDetailScreen} from '../src/screens/ProductDetailScreen';
import {formatProductDate} from '../src/utils/date';

const mockProduct = {
  id: 'cta-ahorro',
  name: 'Cuenta de Ahorro',
  description: 'Producto de ahorro tradicional',
  logo: 'assets-1.png',
  date_release: '2025-02-01',
  date_revision: '2026-02-01',
};

describe('ProductDetailScreen', () => {
  it('muestra el detalle completo del producto y los placeholders visuales', () => {
    let screen: renderer.ReactTestRenderer;

    act(() => {
      screen = renderer.create(
        <ProductDetailScreen onBack={() => undefined} product={mockProduct} />,
      );
    });

    const texts = screen!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('cta-ahorro');
    expect(content).toContain('Cuenta de Ahorro');
    expect(content).toContain('Producto de ahorro tradicional');
    expect(content).toContain(formatProductDate('2025-02-01'));
    expect(content).toContain('Editar');
    expect(content).toContain('Eliminar');
  });

  it('renderiza una imagen cuando el logo es remoto', () => {
    let screen: renderer.ReactTestRenderer;

    act(() => {
      screen = renderer.create(
        <ProductDetailScreen
          onBack={() => undefined}
          product={{
            ...mockProduct,
            logo: 'https://example.com/logo.png',
          }}
        />,
      );
    });

    expect(screen!.root.findAllByType(Image)).toHaveLength(1);
  });
});
