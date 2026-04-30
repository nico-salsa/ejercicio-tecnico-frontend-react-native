## Why

La pantalla principal ya muestra el campo de busqueda del diseño D1, pero hoy solo existe como placeholder visual. Implementar F2 ahora completa ese bloque central del flujo de consulta y evita que la UI siga mostrando un control inerte.

## What Changes

- Implementar filtrado de productos financieros mediante el campo de texto existente en la pantalla de listado.
- Mantener la maquetacion D1 actual y montar el comportamiento sobre el design system ya creado.
- Ajustar el conteo y los estados visuales del listado para que reflejen el resultado filtrado.
- Corregir el contrato de F1 para que el buscador deje de ser un placeholder y pase a ser una interaccion funcional.

## Capabilities

### New Capabilities
- `financial-product-search`: Define la capacidad de filtrar productos financieros desde el listado mediante un campo de texto.

### Modified Capabilities
- `financial-product-listing`: El campo de busqueda visible del listado deja de ser un placeholder y pasa a filtrar resultados dentro de la vista principal.

## Impact

- Afecta la pantalla de listado, el hook de productos y el componente del campo de busqueda.
- Reutiliza el design system del frontend para mantener consistencia visual.
- Requiere pruebas unitarias sobre el filtrado y actualizacion de estados del listado.
