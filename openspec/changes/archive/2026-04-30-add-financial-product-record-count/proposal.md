## Why

La funcionalidad de conteo ya aparece de forma informal en el listado, pero F3 exige tratarla como capacidad explícita de la pantalla principal. Formalizarla ahora evita que quede como un texto accesorio y asegura que el conteo siga una maquetación consistente con D1 y con el design system compartido.

## What Changes

- Definir la capacidad de mostrar la cantidad de registros obtenidos en la pantalla de listado.
- Ajustar la presentación del conteo para que sea un bloque visual claro y reutilizable dentro de D1.
- Integrar el conteo con el flujo existente de búsqueda para que la cifra visible siga siendo coherente con lo que el usuario ve en pantalla.

## Capabilities

### New Capabilities
- `financial-product-record-count`: Define la visualización de la cantidad de registros obtenidos y visibles en el listado principal.

### Modified Capabilities
- `financial-product-listing`: El listado debe incluir un bloque de conteo de registros alineado con D1 y consistente con el estado actual del listado.

## Impact

- Afecta la pantalla principal del listado y su composición visual.
- Reutiliza el design system existente para el bloque de conteo.
- Requiere pruebas unitarias para validar el texto y el comportamiento del conteo con y sin filtro.
