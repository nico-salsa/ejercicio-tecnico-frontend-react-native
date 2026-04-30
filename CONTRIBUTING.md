# Contribucion

## Commits

Todos los commits deben seguir Conventional Commits en espanol.

Ejemplos validos:

- `feat: agrega estructura base del frontend`
- `fix: corrige configuracion de cobertura`
- `chore: ajusta pipeline de integracion continua`
- `docs: documenta flujo de ramas`
- `test: agrega pruebas del componente principal`

## Flujo Git

- Rama estable: `main`
- Rama de integracion: `develop`
- Rama de trabajo: `feature/*`

## Reglas de merge

- `main` solo recibe cambios desde `develop`
- `develop` solo recibe cambios desde `feature/*`
- No se permiten merges laterales entre ramas `feature/*`
- No se deben hacer pushes directos a `main`

## Remoto oficial

El remoto oficial del proyecto es:

`https://github.com/nico-salsa/ejercicio-tecnico-frontend-react-native.git`

## Calidad minima

- Cobertura unitaria minima: 70%
- Todo cambio debe pasar `npm run lint`
- Todo cambio debe pasar `npm run test:coverage`
