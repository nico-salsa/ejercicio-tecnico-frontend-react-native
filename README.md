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

## Backend local

El backend para desarrollo vive fuera del entregable del frontend. En este workspace se usa de forma local desde `repo-interview-main`, pero esa carpeta no forma parte del repositorio versionado.

## Prueba manual de F1

1. En una terminal, entra a `repo-interview-main`.
2. Ejecuta `npm install` si aun no has instalado dependencias del backend.
3. Ejecuta `npm run start:dev` para levantar la API en `http://localhost:3002`.
4. En otra terminal, vuelve a la raiz de este proyecto.
5. Ejecuta `npm install`.
6. Ejecuta `npm run web`.
7. Abre la URL local que muestre Expo en el navegador.
8. Verifica el listado de productos y haz clic sobre uno para abrir el detalle.

Nota:
- En F1 el campo de busqueda y los botones `Editar` / `Eliminar` se muestran como placeholders visuales alineados con D1.
- Si Expo cambia el puerto, usa exactamente la URL que imprima en consola en la linea `Web is waiting on http://localhost:XXXX`.
- El entrypoint web del proyecto usa `registerRootComponent` de Expo en [index.js](C:/Sofka%20U/reto%204/ejercicio-tecnico-frontend-react-native/index.js:1), que es el registro correcto para evitar pantallas en blanco por montaje incompleto en web.
- Si pruebas desde navegador, el backend local debe permitir CORS. En este workspace eso queda resuelto con `cors: true` en [repo-interview-main/src/main.ts](C:/Sofka%20U/reto%204/ejercicio-tecnico-frontend-react-native/repo-interview-main/src/main.ts:1). Si cambias ese backend o lo vuelves a descomprimir, reinicia el servicio despues de reaplicar ese ajuste.
