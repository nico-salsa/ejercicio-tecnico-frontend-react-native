## Context

F1 ya consume productos desde la API local y renderiza la maquetacion D1, incluyendo un campo de busqueda visible. Sin embargo, ese control no participa del flujo y hoy no modifica el listado. La aplicacion ya dispone de un design system propio en React Native, por lo que F2 debe integrarse sobre esa base y no introducir estilos ni patrones paralelos.

El filtrado no requiere nuevas llamadas al backend, porque la funcionalidad pedida puede resolverse sobre el conjunto cargado en memoria desde `GET /bp/products`. Eso reduce complejidad, mantiene la experiencia inmediata y evita dependencias extra para una busqueda local de catalogo.

## Goals / Non-Goals

**Goals:**
- Hacer funcional el campo de busqueda del listado usando el design system existente.
- Filtrar por texto los productos cargados sin romper la navegacion a detalle.
- Reflejar en pantalla un estado vacio especifico cuando la busqueda no tenga coincidencias.
- Mantener la implementacion simple, testeable y alineada con D1.

**Non-Goals:**
- No agregar debounce remoto ni consultas incrementalmente al backend.
- No implementar ordenamiento, filtros avanzados ni resaltado de coincidencias.
- No modificar aun las acciones de editar o eliminar.

## Decisions

### Decision: filtrar localmente sobre los productos cargados
El hook de productos seguira siendo la fuente de datos remota, y el filtrado se aplicara en la capa de pantalla o en un hook derivado a partir del arreglo ya cargado.

Rationale:
- F2 pide busqueda sobre el listado, no un contrato nuevo de API.
- La cantidad de registros esperada para esta prueba es baja.
- La respuesta visual es inmediata y sencilla de probar.

Alternatives considered:
- Consultar la API por cada cambio de texto. Rechazado porque no existe endpoint dedicado y anade complejidad innecesaria.

### Decision: buscar por nombre e identificador con normalizacion basica
La busqueda considerara `name` e `id`, ignorando mayusculas, minusculas y espacios sobrantes.

Rationale:
- Es una experiencia mas util que limitarse a un solo campo.
- Sigue siendo una regla facil de explicar y testear.

### Decision: mantener el componente de campo dentro del design system
El `TextInput` dejara de estar deshabilitado y seguira usando la primitiva `AppField` del design system.

Rationale:
- Conserva coherencia con el cambio previo.
- Evita que F2 rompa la regla de maquetacion propia compartida.

### Decision: mostrar estado vacio especifico para busqueda sin resultados
Cuando exista un termino de busqueda y no haya coincidencias, la pantalla mostrara un mensaje distinto al estado de lista vacia proveniente de la API.

Rationale:
- El usuario debe distinguir entre "no hay datos" y "tu filtro no encontro coincidencias".

## Risks / Trade-offs

- [Riesgo] El filtrado local puede quedar duplicado si futuras funcionalidades agregan mas criterios. -> Mitigacion: encapsular la logica en una utilidad o hook derivado pequeño.
- [Riesgo] Buscar solo por coincidencia simple puede sentirse limitado. -> Mitigacion: dejar la normalizacion basica y abrir espacio para ampliar luego si el ejercicio lo pide.
- [Riesgo] Cambiar el campo de placeholder a control real puede afectar pruebas existentes. -> Mitigacion: actualizar las pruebas del listado y validar manualmente el flujo.

## Migration Plan

1. Activar el campo de busqueda y conectarlo a estado local.
2. Derivar la coleccion filtrada desde los productos cargados.
3. Ajustar conteo y mensaje visual de no coincidencias.
4. Actualizar pruebas y documentacion de prueba manual.

Rollback:
- Si el filtrado rompe el flujo del listado, se puede volver al control visual previo porque no cambia contratos de API ni persistencia.

## Open Questions

- Ninguna bloqueante. Si la entrevista pidiera busqueda por descripcion o debounce, se puede ampliar sobre esta misma base.
