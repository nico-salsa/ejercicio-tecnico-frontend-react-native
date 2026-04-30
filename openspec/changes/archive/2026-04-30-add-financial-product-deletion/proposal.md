## Why

La aplicacion ya cubre listado, busqueda, conteo, creacion y edicion, pero todavia no permite cerrar el ciclo CRUD del catalogo. F6 completa ese flujo incorporando una eliminacion confirmada por modal para evitar borrados accidentales.

## What Changes

- Activar la accion `Eliminar` desde el detalle del producto.
- Mostrar un modal de confirmacion basado en D4 con acciones `Cancelar` y `Eliminar`.
- Persistir la eliminacion mediante `DELETE /bp/products/:id`.
- Remover el producto del catalogo local al confirmar la operacion.
- Ajustar la documentacion final del proyecto para dejar instrucciones de uso y alcance tecnico.

## Capabilities

### New Capabilities
- `financial-product-deletion`: Define la eliminacion confirmada de productos financieros desde un modal.

### Modified Capabilities
- `financial-product-listing`: El detalle deja visibles y activas ambas acciones operativas, `Editar` y `Eliminar`.

## Impact

- Afecta detalle, capa de servicios, estado local del catalogo y pruebas del flujo principal.
- Introduce consumo de `DELETE /bp/products/:id`.
- Requiere modal reusable con overlay y estados de confirmacion/error.
