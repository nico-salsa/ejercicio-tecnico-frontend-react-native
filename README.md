# Ejercicio Tecnico Frontend React Native

Aplicacion React Native con TypeScript para administrar productos financieros de un banco. La solucion cubre listado, busqueda, conteo, creacion, edicion y eliminacion con confirmacion, consumiendo el backend local incluido en `repo-interview-main`.

## Alcance

- Listado de productos financieros desde API local
- Busqueda por nombre o identificador
- Conteo de registros visibles
- Creacion con validaciones y verificacion remota de `id`
- Edicion con `id` bloqueado
- Eliminacion con modal de confirmacion
- Design system propio sobre componentes nativos
- Pruebas unitarias con cobertura superior al minimo requerido

## Stack

- React Native
- Expo
- TypeScript
- Jest
- ESLint

## Estructura

- `src/components`: piezas de UI reutilizables
- `src/designSystem`: tokens, primitivas y recursos visuales comunes
- `src/screens`: pantallas y flujos principales
- `src/services`: consumo de API
- `src/hooks`: estado local del catalogo
- `src/utils`: reglas de negocio y helpers
- `repo-interview-main`: backend local para desarrollo y validacion manual

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Puesta en marcha

1. Instalar dependencias del backend:
   `cd repo-interview-main && npm install`
2. Levantar el backend:
   `npm run start:dev`
3. En otra terminal, instalar dependencias del frontend:
   `cd ..` y luego `npm install`
4. Levantar la app:
   `npm run web`

La app tambien puede abrirse con:

- `npm run start`
- `npm run android`

## Scripts

- `npm run start`: inicia Expo
- `npm run web`: inicia Expo Web
- `npm run android`: inicia Expo para Android
- `npm run lint`: valida el codigo con ESLint
- `npm run test`: ejecuta pruebas unitarias
- `npm run test:coverage`: ejecuta pruebas con cobertura

## Calidad

Antes de entregar o fusionar cambios:

- `npm run lint`
- `npm run test:coverage`

## Notas tecnicas

- La maquetacion no usa frameworks de estilos ni componentes prefabricados externos.
- El design system vive en `src/designSystem` y concentra colores, tipografia, espaciados y primitivas reutilizables.
- El backend local incluido se versiona para que la validacion manual sea reproducible.

## Gobernanza

Las reglas de ramas, commits y merge estan documentadas en [CONTRIBUTING.md](./CONTRIBUTING.md).
