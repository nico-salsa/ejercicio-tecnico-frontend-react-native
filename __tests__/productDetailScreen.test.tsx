import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Text} from 'react-native';

import {ProductDetailScreen} from '../src/screens/ProductDetailScreen';
import type {FinancialProduct} from '../src/types/financialProduct';

const product: FinancialProduct = {
  id: 'trj-crd',
  name: 'Tarjetas de Credito',
  description: 'Tarjeta de consumo bajo la modalidad de credito',
  logo: 'https://example.com/logo.png',
  date_release: '2026-05-02',
  date_revision: '2027-05-02',
};

describe('ProductDetailScreen', () => {
  it('abre y cierra el modal de eliminacion al cancelar', async () => {
    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductDetailScreen
          onBack={() => undefined}
          onDelete={async () => undefined}
          onEdit={() => undefined}
          product={product}
        />,
      );
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'open-delete-product'}).props.onPress();
    });

    let content = screen!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('¿Estas seguro de eliminar el producto Tarjetas de Credito?');

    await act(async () => {
      screen!.root.findByProps({testID: 'cancel-delete-product'}).props.onPress();
    });

    content = screen!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).not.toContain(
      '¿Estas seguro de eliminar el producto Tarjetas de Credito?',
    );
  });

  it('muestra error si falla la eliminacion', async () => {
    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductDetailScreen
          onBack={() => undefined}
          onDelete={async () => {
            throw new Error('No fue posible eliminar el producto financiero.');
          }}
          onEdit={() => undefined}
          product={product}
        />,
      );
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'open-delete-product'}).props.onPress();
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'confirm-delete-product'}).props.onPress();
    });

    const content = screen!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('No fue posible eliminar el producto financiero.');
  });
});
