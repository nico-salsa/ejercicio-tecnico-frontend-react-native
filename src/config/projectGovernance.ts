export const projectGovernance = {
  stackLabel: 'React Native + React + TypeScript',
  coverageLabel: 'Cobertura minima obligatoria: 70%',
  remoteUrl:
    'https://github.com/nico-salsa/ejercicio-tecnico-frontend-react-native.git',
} as const;

export function formatGovernanceSummary(): string {
  return `${projectGovernance.stackLabel} | ${projectGovernance.coverageLabel}`;
}
