## MODIFIED Requirements

### Requirement: La interfaz SHALL reflejar visualmente el diseño D1 completo
La implementación del listado SHALL reproducir la composición visual de las dos pantallas del diseño D1. La pantalla de listado MUST incluir un campo de búsqueda visible y funcional para filtrar productos dentro de la misma vista principal. La misma pantalla MUST incluir un bloque visible de conteo de registros alineado con D1 y consistente con el estado actual del listado. La pantalla de detalle MUST incluir los controles visuales de editar y eliminar mostrados en el diseño, aunque su comportamiento no sea obligatorio en este cambio. La composición visual de ambas pantallas MUST construirse sobre el design system compartido del frontend y no sobre estilos ad hoc aislados por pantalla.

#### Scenario: Campo de búsqueda visible en listado
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** deberá ver un campo de búsqueda alineado con la maqueta D1

#### Scenario: Conteo visible en listado
- **WHEN** el usuario abra la pantalla principal con registros cargados
- **THEN** deberá ver un bloque de conteo de registros alineado con la maqueta D1

#### Scenario: Acciones visibles en detalle
- **WHEN** el usuario abra la pantalla de detalle
- **THEN** deberá ver botones visuales de editar y eliminar alineados con la maqueta D1

#### Scenario: Pantallas construidas con base visual comun
- **WHEN** un desarrollador revise la implementación del listado o del detalle
- **THEN** deberá encontrar que ambas pantallas reutilizan tokens o primitivas del design system compartido
