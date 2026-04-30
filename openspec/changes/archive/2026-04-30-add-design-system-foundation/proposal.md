## Why

La interfaz actual cumple F1, pero su maquetacion aun depende de estilos locales por componente y no de un lenguaje visual reutilizable. Definir un design system propio ahora permite cumplir de forma mas solida la restriccion de no usar frameworks de estilos prefabricados y deja una base consistente para F2-F6.

## What Changes

- Crear una capacidad nueva de design system interno para React Native basada en tokens, primitivas y recetas visuales reutilizables.
- Formalizar que la maquetacion del frontend debe construirse sobre ese sistema propio y no sobre frameworks de estilos externos.
- Refactorizar la implementacion visual actual de F1 para que consuma el design system compartido.
- Documentar el enfoque como equivalente tecnico de un "design system css" en un proyecto React Native.

## Capabilities

### New Capabilities
- `mobile-design-system`: Define los tokens, primitivas y reglas de composicion visual que el frontend React Native debe reutilizar para construir interfaces propias.

### Modified Capabilities
- `financial-product-listing`: La funcionalidad F1 debe componerse usando el design system compartido en lugar de estilos ad hoc por pantalla.

## Impact

- Afecta componentes visuales, pantallas y utilidades de estilo del frontend.
- Introduce una capa interna de design system para React Native sin incorporar frameworks visuales externos.
- Ajusta la documentacion tecnica y el baseline de specs para futuras funcionalidades.
