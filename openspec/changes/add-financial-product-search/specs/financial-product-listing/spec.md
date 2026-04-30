## MODIFIED Requirements

### Requirement: La interfaz SHALL reflejar visualmente el diseño D1 completo
La implementación de F1 SHALL reproducir la composición visual de las dos pantallas del diseño D1. La pantalla de listado MUST incluir un campo de búsqueda visible y funcional para filtrar productos dentro de la misma vista principal. La pantalla de detalle MUST incluir los controles visuales de editar y eliminar mostrados en el diseño, aunque su comportamiento no sea obligatorio en este cambio.

#### Scenario: Campo de búsqueda visible en listado
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** deberá ver un campo de búsqueda alineado con la maqueta D1

#### Scenario: Acciones visibles en detalle
- **WHEN** el usuario abra la pantalla de detalle
- **THEN** deberá ver botones visuales de editar y eliminar alineados con la maqueta D1

### Requirement: Los controles visuales fuera del alcance funcional de F1 SHALL poder mostrarse como placeholders
Los elementos del diseño D1 que no correspondan al alcance funcional estricto de F1, como las acciones de editar y eliminar, MAY mostrarse como placeholders visuales sin comportamiento de negocio implementado, siempre que su presencia no confunda el flujo principal de listado y detalle.

#### Scenario: Placeholder de acciones del detalle
- **WHEN** los botones de editar y eliminar todavía no implementen navegación o mutación
- **THEN** la interfaz podrá mostrarlos deshabilitados o con interacción neutra
