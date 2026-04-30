import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Text} from 'react-native';

import {ProductCreateScreen} from '../src/screens/ProductCreateScreen';
import * as productService from '../src/services/productService';

describe('ProductCreateScreen', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('muestra errores de validacion al enviar vacio', async () => {
    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductCreateScreen
          onBack={() => undefined}
          onCreateSuccess={() => undefined}
        />,
      );
    });

    const submitButton = screen!.root.findByProps({
      testID: 'product-form-submit',
    });

    await act(async () => {
      submitButton.props.onPress();
    });

    const content = screen!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('El id es requerido.');
    expect(content).toContain('El nombre es requerido.');
    expect(content).toContain('La descripcion es requerida.');
  });

  it('reinicia el formulario', async () => {
    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductCreateScreen
          onBack={() => undefined}
          onCreateSuccess={() => undefined}
        />,
      );
    });

    const nameInput = screen!.root.findByProps({testID: 'product-form-name'});
    const resetButton = screen!.root.findByProps({testID: 'product-form-reset'});

    await act(async () => {
      nameInput.props.onChangeText('Cuenta Premium');
    });

    await act(async () => {
      resetButton.props.onPress();
    });

    expect(screen!.root.findByProps({testID: 'product-form-name'}).props.value).toBe(
      '',
    );
  });

  it('crea un producto cuando el formulario es valido', async () => {
    const onCreateSuccess = jest.fn();
    jest
      .spyOn(productService, 'verifyFinancialProductId')
      .mockResolvedValue(false);
    jest.spyOn(productService, 'createFinancialProduct').mockResolvedValue({
      id: 'nuevo',
      name: 'Cuenta Premium',
      description: 'Descripcion valida para el producto nuevo',
      logo: 'https://example.com/logo.png',
      date_release: '2026-05-02',
      date_revision: '2027-05-02',
    });

    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductCreateScreen
          onBack={() => undefined}
          onCreateSuccess={onCreateSuccess}
        />,
      );
    });

    const fields = {
      dateRelease: screen!.root.findByProps({testID: 'product-form-date-release'}),
      description: screen!.root.findByProps({testID: 'product-form-description'}),
      id: screen!.root.findByProps({testID: 'product-form-id'}),
      logo: screen!.root.findByProps({testID: 'product-form-logo'}),
      name: screen!.root.findByProps({testID: 'product-form-name'}),
    };
    const submitButton = screen!.root.findByProps({
      testID: 'product-form-submit',
    });

    await act(async () => {
      fields.id.props.onChangeText('nuevo');
      fields.name.props.onChangeText('Cuenta Premium');
      fields.description.props.onChangeText(
        'Descripcion valida para el producto nuevo',
      );
      fields.logo.props.onChangeText('https://example.com/logo.png');
      fields.dateRelease.props.onChangeText('2026-05-02');
    });

    expect(
      screen!.root.findByProps({testID: 'product-form-date-revision'}).props.value,
    ).toBe('2027-05-02');

    await act(async () => {
      submitButton.props.onPress();
    });

    expect(productService.verifyFinancialProductId).toHaveBeenCalledWith('nuevo');
    expect(productService.createFinancialProduct).toHaveBeenCalled();
    expect(onCreateSuccess).toHaveBeenCalled();
  });

  it('muestra error cuando el id ya existe', async () => {
    jest
      .spyOn(productService, 'verifyFinancialProductId')
      .mockResolvedValue(true);

    let screen: renderer.ReactTestRenderer;

    await act(async () => {
      screen = renderer.create(
        <ProductCreateScreen
          onBack={() => undefined}
          onCreateSuccess={() => undefined}
        />,
      );
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'product-form-id'}).props.onChangeText('nuevo');
      screen!.root.findByProps({testID: 'product-form-name'}).props.onChangeText(
        'Cuenta Premium',
      );
      screen!.root
        .findByProps({testID: 'product-form-description'})
        .props.onChangeText('Descripcion valida para el producto nuevo');
      screen!.root.findByProps({testID: 'product-form-logo'}).props.onChangeText(
        'https://example.com/logo.png',
      );
      screen!.root
        .findByProps({testID: 'product-form-date-release'})
        .props.onChangeText('2026-05-02');
    });

    await act(async () => {
      screen!.root.findByProps({testID: 'product-form-submit'}).props.onPress();
    });

    const content = screen!.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .join(' ');

    expect(content).toContain('El id ya existe.');
  });
});
