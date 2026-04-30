## Context

La aplicación ya muestra productos y permite filtrarlos, pero el conteo visible todavía se presenta como una frase auxiliar. F3 pide mostrar la cantidad de registros obtenidos en el listado bajo la maquetación D1, lo que justifica convertir el conteo en un elemento explícito de interfaz y no en un simple texto residual.

El proyecto ya cuenta con design system propio y con búsqueda local funcional, así que F3 debe apoyarse sobre esa base. Además, el conteo no debe entrar en contradicción con F2: cuando haya filtro activo, la interfaz tiene que dejar claro cuántos registros se están viendo respecto del total obtenido.

## Goals / Non-Goals

**Goals:**
- Mostrar un bloque de conteo claro en la pantalla principal del listado.
- Expresar el total obtenido desde API y el subconjunto visible cuando exista filtro activo.
- Mantener la composición visual alineada con D1 y con el design system actual.

**Non-Goals:**
- No cambiar contratos de API ni agregar nuevas consultas para contar registros.
- No alterar la navegación a detalle ni el comportamiento del buscador fuera del conteo.
- No introducir una capa de analytics o telemetría sobre resultados.

## Decisions

### Decision: derivar el conteo desde los datos ya cargados
El conteo se calculará a partir de `products` y `filteredProducts`, sin introducir estado extra ni llamadas remotas.

Rationale:
- La fuente de verdad ya existe en la pantalla.
- Evita inconsistencias entre el listado y el contador.

### Decision: usar una pieza visual dedicada para el conteo
Se creará un componente pequeño del listado para renderizar el conteo como bloque explícito en vez de una frase genérica incrustada.

Rationale:
- Mejora legibilidad y reutilización.
- Facilita que F3 quede defendible como funcionalidad propia.

### Decision: mostrar total simple y total relativo según el contexto
Sin filtro activo, la UI mostrará el total obtenido. Con filtro activo, la UI mostrará el subconjunto visible respecto del total cargado.

Rationale:
- Cubre simultáneamente el requerimiento de F3 y la coherencia con F2.
- Evita que el usuario interprete el filtro como reducción real de datos remotos.

## Risks / Trade-offs

- [Riesgo] El conteo puede sentirse redundante si se duplica semánticamente con el estado de búsqueda. -> Mitigacion: usar una redacción compacta y clara.
- [Riesgo] Cambiar el texto del conteo puede romper pruebas previas. -> Mitigacion: actualizar pruebas del listado para validar el nuevo contrato visual.
- [Riesgo] La maquetación puede alejarse de D1 si el bloque crece demasiado. -> Mitigacion: mantener el componente mínimo y apoyado en el design system.

## Migration Plan

1. Crear el componente de conteo de registros.
2. Integrarlo en la pantalla principal del listado.
3. Ajustar las pruebas del flujo y la documentación manual.

Rollback:
- Si el bloque visual no convence, se puede volver al texto previo sin tocar la lógica de carga o búsqueda.

## Open Questions

- Ninguna bloqueante. Si más adelante se requiere paginación, este conteo podrá adaptarse para distinguir total de página y total global.
