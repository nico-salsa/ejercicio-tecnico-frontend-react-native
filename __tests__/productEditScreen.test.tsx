import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Text} from 'react-native';

import {ProductEditScreen} from '../src/screens/ProductEditScreen';
import * as productService from '../src/services/productService';
import type {FinancialProduct} from '../src/types/financialProduct';

const baseProduct: FinancialProduct = {
  id: 'trj-crd',
  name: 'Tarjetas de Credito',
  description: 'Tarjeta de consumo bajo la modalidad de credito',
  logo: 'https://example.com/logo.png',
  date_release: '2026-05-02',
  date_revision: '2027-05-02',
};

describe('ProductEditScreen', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('mantiene el id deshabilitado en el formulario de edicion', async () => {
    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductEditScreen
          onBack={() => undefined}
          onEditSuccess={() => undefined}
          product={baseProduct}
        />,
      );
    });

    expect(screen!.root.findByProps({testID: 'product-form-id'}).props.editable).toBe(
      false,
    );
  });

  it('actualiza el producto cuando el formulario es valido', async () => {
    const onEditSuccess = jest.fn();
    const updatedProduct: FinancialProduct = {
      ...baseProduct,
      name: 'Tarjetas Gold',
      description: 'Producto actualizado para clientes frecuentes',
      logo: 'https://example.com/logo-updated.png',
    };

    jest
      .spyOn(productService, 'updateFinancialProduct')
      .mockResolvedValue(updatedProduct);

    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductEditScreen
          onBack={() => undefined}
          onEditSuccess={onEditSuccess}
          product={baseProduct}
        />,
      );
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'product-form-name'}).props.onChangeText(
        'Tarjetas Gold',
      );
      screen!.root
        .findByProps({testID: 'product-form-description'})
        .props.onChangeText('Producto actualizado para clientes frecuentes');
      screen!.root.findByProps({testID: 'product-form-logo'}).props.onChangeText(
        'https://example.com/logo-updated.png',
      );
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'product-form-submit'}).props.onPress();
    });

    expect(productService.updateFinancialProduct).toHaveBeenCalledWith(
      'trj-crd',
      expect.objectContaining({
        name: 'Tarjetas Gold',
        description: 'Producto actualizado para clientes frecuentes',
        logo: 'https://example.com/logo-updated.png',
      }),
    );
    expect(onEditSuccess).toHaveBeenCalledWith(updatedProduct);
  });

  it('muestra errores de validacion cuando un campo editado queda invalido', async () => {
    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductEditScreen
          onBack={() => undefined}
          onEditSuccess={() => undefined}
          product={baseProduct}
        />,
      );
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'product-form-name'}).props.onChangeText('abc');
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'product-form-submit'}).props.onPress();
    });

    const content = screen!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('El nombre debe tener entre 5 y 100 caracteres.');
  });
});
