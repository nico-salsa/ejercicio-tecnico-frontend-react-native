## Context

La aplicación ya resuelve consulta, detalle, búsqueda y conteo. F4 introduce el primer flujo de mutación: crear productos. El proyecto todavía usa navegación local basada en estado dentro de `App.tsx`, por lo que conviene mantener esa estrategia para no abrir una dependencia de routing antes de F5/F6.

El backend local expone dos piezas necesarias para F4: creación de producto y verificación de unicidad de `id`. También existe una discrepancia importante: el enunciado funcional pide `Nombre` con mínimo 5 caracteres, pero el backend versionado valida `name` con mínimo 6. El frontend debe proteger la UX sin mentir sobre el contrato real.

## Goals / Non-Goals

**Goals:**
- Añadir un botón `Agregar` visible en el listado, alineado con D3.
- Implementar un formulario de alta alineado con D2.
- Validar todos los campos con mensajes visuales por campo.
- Consultar el servicio de verificación de `id` antes de crear el producto.
- Actualizar el listado local al volver desde una creación exitosa.

**Non-Goals:**
- No implementar edición en este cambio.
- No introducir librerías de formularios externas.
- No cambiar a navegación con React Navigation todavía.

## Decisions

### Decision: mantener navegación local con vista adicional en `App.tsx`
La app seguirá resolviendo pantallas mediante estado local, agregando una vista de creación al mismo flujo.

Rationale:
- Mantiene bajo el costo técnico.
- La app aún tiene pocos flujos y no necesita un router completo para F4.

### Decision: centralizar validación en utilidades puras del frontend
Las reglas del formulario se implementarán en utilidades puras y un estado de errores explícito, no dentro de componentes sueltos.

Rationale:
- Hace las reglas testeables.
- Evita mezclar validación con presentación.

### Decision: verificar unicidad del `id` bajo demanda
La verificación remota del `id` se ejecutará cuando el valor local sea sintácticamente válido y antes del envío final; también podrá revalidarse al enviar para evitar falsos positivos por cambios de estado.

Rationale:
- Reduce tráfico innecesario para valores obviamente inválidos.
- Mantiene el requisito funcional de comprobar unicidad.

### Decision: frontend alineado con requerimiento, backend respetado en envío
El frontend validará `name` con mínimo 5 para cumplir el enunciado, pero manejará el error de backend si el servicio rechaza un nombre de 5 caracteres por su regla actual de mínimo 6.

Rationale:
- Refleja el requerimiento solicitado al candidato.
- No oculta la discrepancia real del backend.

### Decision: extender el design system con primitivas de formulario y error
Se agregarán variantes o componentes pequeños para label, helper/error y agrupación de campos en lugar de estilos ad hoc por input.

Rationale:
- F4 introduce patrones repetitivos de formularios que vale la pena consolidar.
- Facilita reuso posterior en F5.

## Risks / Trade-offs

- [Riesgo] La navegación local puede volverse frágil a medida que crezcan pantallas. -> Mitigacion: encapsular los modos de vista con tipos claros y mantener callbacks simples.
- [Riesgo] La discrepancia de validación de `name` puede confundir al usuario. -> Mitigacion: capturar y mostrar el error remoto de forma clara y dejarlo explícito en la documentación técnica.
- [Riesgo] Verificación remota del `id` puede generar latencia perceptible. -> Mitigacion: mostrar estado visual de validación y evitar llamadas para valores localmente inválidos.

## Migration Plan

1. Extender servicios y tipos para creación y verificación de `id`.
2. Crear validadores, componentes y pantalla de formulario.
3. Integrar navegación desde el listado y actualización local tras alta exitosa.
4. Añadir pruebas y ajustar documentación.

Rollback:
- Si el flujo de alta falla, puede retirarse la vista de formulario y el botón `Agregar` sin afectar consulta o detalle.

## Open Questions

- La ubicación exacta del botón principal en D3 no viene acompañada aquí por un artefacto separable del hilo, así que se implementará como acción principal al pie del listado, consistente con la maqueta general y el design system.
