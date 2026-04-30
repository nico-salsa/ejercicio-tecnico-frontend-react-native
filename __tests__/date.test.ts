import {formatProductDate} from '../src/utils/date';

describe('formatProductDate', () => {
  it('formatea fechas validas', () => {
    expect(formatProductDate('2025-01-01')).toBe('01/01/2025');
  });

  it('retorna el valor original si la fecha es invalida', () => {
    expect(formatProductDate('sin-fecha')).toBe('sin-fecha');
  });
});
