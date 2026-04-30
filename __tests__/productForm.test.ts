import {
  calculateRevisionDate,
  createInitialProductFormValues,
  validateProductForm,
} from '../src/utils/productForm';

describe('product form utils', () => {
  it('crea un formulario inicial vacio', () => {
    expect(createInitialProductFormValues()).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
  });

  it('calcula la fecha de revision un anio despues', () => {
    expect(calculateRevisionDate('2026-05-02')).toBe('2027-05-02');
  });

  it('valida campos requeridos y longitudes', () => {
    const errors = validateProductForm(
      {
        id: 'ab',
        name: 'sol',
        description: 'corta',
        logo: '',
        date_release: '',
        date_revision: '',
      },
      {today: '2026-05-01'},
    );

    expect(errors.id).toBeDefined();
    expect(errors.name).toBeDefined();
    expect(errors.description).toBeDefined();
    expect(errors.logo).toBeDefined();
    expect(errors.date_release).toBeDefined();
    expect(errors.date_revision).toBeDefined();
  });

  it('valida fecha minima y fecha de revision exacta', () => {
    const errors = validateProductForm(
      {
        id: 'nuevo',
        name: 'Nombre correcto',
        description: 'Descripcion valida y suficientemente larga',
        logo: 'https://example.com/logo.png',
        date_release: '2026-04-30',
        date_revision: '2027-05-01',
      },
      {today: '2026-05-01'},
    );

    expect(errors.date_release).toContain('igual o mayor');
    expect(errors.date_revision).toContain('exactamente un anio');
  });

  it('marca error cuando el id ya existe', () => {
    const errors = validateProductForm(
      {
        id: 'existente',
        name: 'Nombre correcto',
        description: 'Descripcion valida y suficientemente larga',
        logo: 'https://example.com/logo.png',
        date_release: '2026-05-01',
        date_revision: '2027-05-01',
      },
      {existingId: true, today: '2026-05-01'},
    );

    expect(errors.id).toBe('El id ya existe.');
  });
});
