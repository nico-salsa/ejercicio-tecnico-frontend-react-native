## MODIFIED Requirements

### Requirement: La interfaz SHALL reflejar visualmente el diseno D1 completo
La implementacion del listado SHALL reproducir la composicion visual de las dos pantallas del diseno D1. La pantalla de listado MUST incluir un campo de busqueda visible y funcional para filtrar productos dentro de la misma vista principal. La misma pantalla MUST incluir un bloque visible de conteo de registros alineado con D1 y consistente con el estado actual del listado, sin subtitulos auxiliares fuera de la metrica principal. La pantalla de listado MUST incluir ademas un boton principal `Agregar` alineado con la ubicacion principal definida por D3 para abrir el formulario de registro. Ese boton MUST usar la apariencia destacada del diseno D3, con color de accion amarillo y posicion fija al pie de la vista principal. La pantalla de detalle MUST incluir los controles visuales de editar y eliminar mostrados en el diseno. Las acciones `Editar` y `Eliminar` MUST estar activas y la accion `Eliminar` MUST abrir un modal de confirmacion alineado con D4. La composicion visual de ambas pantallas MUST construirse sobre el design system compartido del frontend y no sobre estilos ad hoc aislados por pantalla.

#### Scenario: Campo de busqueda visible en listado
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** debera ver un campo de busqueda alineado con la maqueta D1

#### Scenario: Conteo visible en listado
- **WHEN** el usuario abra la pantalla principal con registros cargados
- **THEN** debera ver un bloque de conteo de registros alineado con la maqueta D1

#### Scenario: Accion principal de alta visible
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** debera ver un boton principal `Agregar` para iniciar el registro de un producto

#### Scenario: Accion de edicion activa en detalle
- **WHEN** el usuario abra el detalle de un producto y pulse `Editar`
- **THEN** la aplicacion debera navegar a la pantalla de edicion de ese producto

#### Scenario: Accion de eliminacion activa en detalle
- **WHEN** el usuario abra el detalle de un producto y pulse `Eliminar`
- **THEN** la aplicacion debera abrir el modal de confirmacion para eliminar ese producto

#### Scenario: Acciones visibles en detalle
- **WHEN** el usuario abra la pantalla de detalle
- **THEN** debera ver botones visuales de editar y eliminar alineados con la maqueta D1

#### Scenario: Pantallas construidas con base visual comun
- **WHEN** un desarrollador revise la implementacion del listado o del detalle
- **THEN** debera encontrar que ambas pantallas reutilizan tokens o primitivas del design system compartido
