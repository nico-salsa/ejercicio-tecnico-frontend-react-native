## Why

El flujo actual solo permite consultar productos existentes. F4 completa el siguiente paso natural del catálogo: permitir crear un producto nuevo desde la app con un formulario validado y consistente con la maqueta.

## What Changes

- Agregar un botón principal `Agregar` en la pantalla de listado para navegar al formulario de registro.
- Implementar la pantalla de creación de producto alineada con D2 y D3.
- Validar todos los campos antes del envío, incluyendo verificación remota de unicidad del `id`.
- Mostrar estados visuales de error por campo y permitir reiniciar el formulario.
- Actualizar el listado local tras una creación exitosa.

## Capabilities

### New Capabilities
- `financial-product-creation`: Define la creación de productos financieros desde un formulario con validaciones locales y remotas.

### Modified Capabilities
- `financial-product-listing`: El listado debe incluir un botón principal `Agregar` para navegar al formulario de registro.

## Impact

- Afecta navegación local, pantalla de listado, capa de servicios y estado de productos.
- Requiere nuevos componentes de formulario y validación sobre el design system existente.
- Introduce integración con `POST /bp/products` y `GET /bp/products/verification/:id`.
