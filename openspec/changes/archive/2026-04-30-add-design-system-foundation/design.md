## Context

La aplicacion ya cuenta con una implementacion funcional de F1, pero su UI se apoya en `StyleSheet.create` dentro de cada componente sin una capa comun que centralice tokens, variantes o reglas de composicion. El ejercicio exige maquetacion propia sin frameworks de estilos ni componentes prefabricados, y ademas el usuario quiere usar esa restriccion como ventaja para construir una base mas reusable y defendible en entrevista.

En React Native no existe un `design system css` literal como en web tradicional. El equivalente tecnico correcto es un design system interno compuesto por tokens de color, tipografia, espaciado, radios y sombras, mas primitivas y recetas de componentes que expongan una API estable sobre `View`, `Text`, `Pressable`, `TextInput`, `ScrollView` y `StyleSheet`.

## Goals / Non-Goals

**Goals:**
- Centralizar decisiones visuales del frontend en una capa reusable de design system propia.
- Exponer tokens y helpers que permitan maquetar nuevas pantallas sin duplicar colores, espaciados y tipografias.
- Refactorizar F1 para validar que la base sirve en una pantalla de listado y en una pantalla de detalle.
- Mantener compatibilidad con React Native y Expo Web sin depender de frameworks de estilos externos.

**Non-Goals:**
- No crear un motor de tematizacion dinamica ni dark mode en este cambio.
- No introducir librerias de UI como NativeBase, React Native Paper, Tamagui o similares.
- No redisenar el flujo funcional de F1 ni adelantar comportamiento de F2-F6.

## Decisions

### Decision: modelar el design system como modulo interno de React Native
Se creara un modulo `src/designSystem` con tokens, helpers de layout y componentes base en lugar de un archivo CSS.

Rationale:
- React Native no interpreta CSS tradicional como fuente principal de estilos.
- `StyleSheet` da compatibilidad nativa y web dentro del stack actual.
- Permite demostrar criterio tecnico: el sistema es propio y portable a pantallas futuras.

Alternatives considered:
- Crear solo constantes de colores. Rechazado porque deja sin resolver composicion y reutilizacion real.
- Usar una libreria third-party de theming. Rechazado por la restriccion de la prueba y porque debilita la defensa de la solucion.

### Decision: separar el design system en tokens, primitivas y recetas
La capa se organizara en tres niveles:
- Tokens: color, tipografia, espaciado, radios, bordes, sombras y dimensiones.
- Primitivas: componentes base como `AppScreen`, `Surface`, `AppText`, `AppButton`, `AppField`, `Stack`.
- Recetas: helpers especificos para patrones visuales repetidos como tarjetas, filas de detalle y captions.

Rationale:
- Evita mezclar decisiones globales con implementaciones concretas.
- Facilita la adopcion incremental en nuevas funcionalidades.
- Hace mas clara la defensa tecnica frente a una entrevista.

### Decision: usar F1 como primera consumidora del sistema
La implementacion actual de listado y detalle se migrara para consumir el design system y servir como referencia para F2-F6.

Rationale:
- Reduce deuda tecnica antes de seguir agregando funcionalidades.
- Permite verificar visual y tecnicamente que el sistema cubre casos reales.
- El header y el isotipo del banco quedan dentro del mismo lenguaje visual compartido.

### Decision: mantener la identidad visual alineada con D1
El design system no sera un tema abstracto desconectado de la prueba; sus tokens y recetas se calibraran con la maqueta D1 ya implementada.

Rationale:
- La meta no es crear un kit generico, sino una base reusable que preserve el look exigido por la prueba.
- Evita re-trabajo visual cuando se implementen busqueda, formulario, modal y acciones futuras.

## Risks / Trade-offs

- [Riesgo] La abstraccion puede crecer demasiado pronto y volver lenta la implementacion. -> Mitigacion: limitar el cambio a tokens, primitivas y patrones ya usados por F1.
- [Riesgo] El nombre "design system css" puede inducir una expectativa web literal. -> Mitigacion: documentar expresamente que en React Native el equivalente es un sistema de diseño basado en `StyleSheet`.
- [Riesgo] La refactorizacion visual puede introducir regresiones en F1. -> Mitigacion: validar con pruebas existentes y una verificacion manual del flujo listado/detalle.

## Migration Plan

1. Crear la estructura `src/designSystem` con tokens y primitivas base.
2. Refactorizar componentes comunes y pantallas de F1 para consumir esa capa.
3. Actualizar pruebas necesarias y documentacion de arquitectura visual.
4. Dejar el design system como baseline para las siguientes funcionalidades.

Rollback:
- Si la refactorizacion introduce un problema serio, se puede volver a los estilos locales previos porque el cambio estara aislado al frontend y no modifica contratos de API.

## Open Questions

- Ninguna bloqueante para este cambio. Las variantes adicionales del sistema quedaran abiertas para F2-F6 segun aparezcan nuevos patrones de UI.
