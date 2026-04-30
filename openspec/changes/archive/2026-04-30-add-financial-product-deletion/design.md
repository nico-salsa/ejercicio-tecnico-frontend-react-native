## Context

El detalle del producto ya concentra las acciones de administracion del catalogo. F6 debe aprovechar ese punto de entrada para evitar sumar complejidad de navegacion. La referencia D4 muestra un overlay oscuro con una hoja modal inferior, mensaje de confirmacion y dos acciones claras.

## Goals / Non-Goals

**Goals:**
- Activar `Eliminar` desde el detalle.
- Mostrar un modal de confirmacion alineado con D4.
- Permitir cancelar sin efectos laterales.
- Eliminar en backend y actualizar el estado local sin recargar el catalogo completo.

**Non-Goals:**
- No implementar recuperacion o papelera.
- No agregar eliminacion masiva.
- No mover la accion de eliminar fuera del detalle.

## Decisions

### Decision: manejar la confirmacion dentro de la pantalla de detalle
La pantalla de detalle abrira y cerrara el modal, y delegara la eliminacion real a un callback asincrono recibido desde `App`.

Rationale:
- Mantiene el contexto visual del producto siendo eliminado.
- Evita distribuir estado de UI transitorio a nivel global.

### Decision: actualizar el catalogo local por remocion in-memory
Tras un `DELETE` exitoso, el producto se eliminara del arreglo local compartido y la app regresara al listado.

Rationale:
- Mantiene la UI consistente inmediatamente.
- Evita una recarga completa innecesaria.

### Decision: usar un modal nativo con hoja inferior estilizada
La implementacion usara `Modal` de React Native y componentes del design system para construir la capa visual D4 sin frameworks externos.

Rationale:
- Cumple la restriccion de maquetacion sin librerias prefabricadas.
- Mantiene compatibilidad con web y nativo dentro del stack actual.

## Risks / Trade-offs

- [Riesgo] El modal puede quedar visualmente pobre en web si se usa estilo minimo. -> Mitigacion: construir overlay, card inferior, botones y cierre alineados a D4.
- [Riesgo] Si falla el `DELETE`, el usuario podria perder contexto. -> Mitigacion: mantener el modal abierto y mostrar error visible.
- [Riesgo] El detalle usa una referencia vieja del producto tras editar y antes de eliminar. -> Mitigacion: F6 se apoya en el `id`, no en copia mutable del objeto.

## Migration Plan

1. Extender servicios y estado local con eliminacion.
2. Construir modal de confirmacion y conectarlo al detalle.
3. Actualizar `App` para remover productos y volver al listado tras exito.
4. Actualizar pruebas del servicio y del flujo principal.
5. Dejar `README.md` final de uso del proyecto.

Rollback:
- Si el modal introduce inestabilidad, la accion puede volver a quedar deshabilitada mientras se conserva el resto del CRUD.
