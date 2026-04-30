# ejercicio-tecnico-frontend-react-native

Base inicial del frontend en React Native con TypeScript para la prueba tecnica.

## Stack base

- React Native
- React
- TypeScript
- Jest para pruebas unitarias
- ESLint para validacion estatica

## Scripts

- `npm run start`: levanta Expo para probar la app
- `npm run web`: abre la app en navegador para validacion manual rapida
- `npm run lint`: ejecuta ESLint sobre el proyecto
- `npm run test`: ejecuta las pruebas unitarias
- `npm run test:coverage`: ejecuta las pruebas con reporte y umbral de cobertura

## Gobernanza

La documentacion de flujo Git, commits y remoto oficial esta en [CONTRIBUTING.md](CONTRIBUTING.md).

## Design system

La maquetacion del proyecto usa un design system propio en `src/designSystem`. En React Native esto reemplaza la idea de un "design system css": la base visual se implementa con `StyleSheet`, tokens de presentacion y primitivas reutilizables sobre componentes nativos, sin frameworks de estilos ni componentes prefabricados externos.

Capas actuales:
- `tokens.ts`: colores, espaciados, radios, tamanos y tipografia base.
- `primitives.tsx`: wrappers pequenos como `AppText`, `AppButton`, `AppField`, `Surface`, `Stack` y `ScreenContainer`.
- `bankMark.tsx`: isotipo del header integrado al mismo lenguaje visual.

F1 ya consume esta capa y queda como referencia para las siguientes funcionalidades.

## Backend local

El backend para desarrollo se encuentra en `repo-interview-main`. Se versiona junto al frontend para que la validacion manual local no dependa de cambios no rastreados, aunque sigue siendo un soporte de desarrollo y no la entrega principal del ejercicio de React Native.
