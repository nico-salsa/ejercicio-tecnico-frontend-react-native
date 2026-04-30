import {
  formatGovernanceSummary,
  projectGovernance,
} from '../src/config/projectGovernance';

describe('projectGovernance', () => {
  it('expone el remoto oficial', () => {
    expect(projectGovernance.remoteUrl).toBe(
      'https://github.com/nico-salsa/ejercicio-tecnico-frontend-react-native.git',
    );
  });

  it('declara la cobertura minima', () => {
    expect(projectGovernance.coverageLabel).toContain('70%');
  });

  it('genera un resumen legible de gobernanza', () => {
    expect(formatGovernanceSummary()).toContain(projectGovernance.stackLabel);
  });
});
