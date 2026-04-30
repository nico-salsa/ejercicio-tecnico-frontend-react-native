import type {FinancialProductInput} from '../types/financialProduct';

export interface ProductFormValues {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export function createInitialProductFormValues(): ProductFormValues {
  return {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };
}

export function normalizeProductFormValues(
  values: ProductFormValues,
): ProductFormValues {
  return {
    ...values,
    id: values.id.trim(),
    name: values.name.trim(),
    description: values.description.trim(),
    logo: values.logo.trim(),
    date_release: values.date_release.trim(),
    date_revision: values.date_revision.trim(),
  };
}

export function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function calculateRevisionDate(dateRelease: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateRelease)) {
    return '';
  }

  const [year, month, day] = dateRelease.split('-').map(Number);
  return `${year + 1}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`;
}

export function validateProductForm(
  values: ProductFormValues,
  options?: {
    existingId?: boolean;
    today?: string;
  },
): ProductFormErrors {
  const normalized = normalizeProductFormValues(values);
  const today = options?.today ?? getTodayIsoDate();
  const errors: ProductFormErrors = {};

  if (!normalized.id) {
    errors.id = 'El id es requerido.';
  } else if (normalized.id.length < 3 || normalized.id.length > 10) {
    errors.id = 'El id debe tener entre 3 y 10 caracteres.';
  } else if (options?.existingId) {
    errors.id = 'El id ya existe.';
  }

  if (!normalized.name) {
    errors.name = 'El nombre es requerido.';
  } else if (normalized.name.length < 5 || normalized.name.length > 100) {
    errors.name = 'El nombre debe tener entre 5 y 100 caracteres.';
  }

  if (!normalized.description) {
    errors.description = 'La descripcion es requerida.';
  } else if (
    normalized.description.length < 10 ||
    normalized.description.length > 200
  ) {
    errors.description = 'La descripcion debe tener entre 10 y 200 caracteres.';
  }

  if (!normalized.logo) {
    errors.logo = 'El logo es requerido.';
  }

  if (!normalized.date_release) {
    errors.date_release = 'La fecha de liberacion es requerida.';
  } else if (normalized.date_release < today) {
    errors.date_release =
      'La fecha de liberacion debe ser igual o mayor a la fecha actual.';
  }

  const expectedRevisionDate = calculateRevisionDate(normalized.date_release);

  if (!normalized.date_revision) {
    errors.date_revision = 'La fecha de revision es requerida.';
  } else if (!normalized.date_release) {
    errors.date_revision =
      'Define primero una fecha de liberacion valida.';
  } else if (normalized.date_revision !== expectedRevisionDate) {
    errors.date_revision =
      'La fecha de revision debe ser exactamente un anio posterior a la fecha de liberacion.';
  }

  return errors;
}

export function hasProductFormErrors(errors: ProductFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function toFinancialProductInput(
  values: ProductFormValues,
): FinancialProductInput {
  return normalizeProductFormValues(values);
}
