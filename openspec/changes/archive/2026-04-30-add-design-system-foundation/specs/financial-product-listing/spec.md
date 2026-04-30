## MODIFIED Requirements

### Requirement: La interfaz SHALL reflejar visualmente el diseño D1 completo
La implementacion de F1 SHALL reproducir la composicion visual de las dos pantallas del diseño D1. La pantalla de listado MUST incluir un campo de busqueda visible. La pantalla de detalle MUST incluir los controles visuales de editar y eliminar mostrados en el diseño. La composicion visual de ambas pantallas MUST construirse sobre el design system compartido del frontend y no sobre estilos ad hoc aislados por pantalla.

#### Scenario: Campo de busqueda visible en listado
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** debera ver un campo de busqueda alineado con la maqueta D1

#### Scenario: Acciones visibles en detalle
- **WHEN** el usuario abra la pantalla de detalle
- **THEN** debera ver botones visuales de editar y eliminar alineados con la maqueta D1

#### Scenario: Pantallas construidas con base visual comun
- **WHEN** un desarrollador revise la implementacion del listado o del detalle
- **THEN** debera encontrar que ambas pantallas reutilizan tokens o primitivas del design system compartido
