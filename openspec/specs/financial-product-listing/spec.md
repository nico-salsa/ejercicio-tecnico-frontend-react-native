## Purpose

Definir la funcionalidad base de listado, detalle, búsqueda y conteo de productos financieros, incluyendo la maquetación completa de D1 y la validación manual local del flujo.

## Requirements

### Requirement: El sistema SHALL listar productos financieros desde la API local
La aplicación SHALL consumir el endpoint local de productos financieros y SHALL mostrar los registros obtenidos en una pantalla de listado. Cada item del listado MUST presentar al menos el nombre del producto, su identificador y una affordance visual de navegación acorde al diseño D1.

#### Scenario: Listado exitoso de productos
- **WHEN** la API local responda correctamente con productos financieros
- **THEN** la aplicación deberá mostrar cada producto en la pantalla principal del listado

#### Scenario: Lista vacía
- **WHEN** la API local responda sin productos
- **THEN** la aplicación deberá mostrar un estado visual de lista vacía

#### Scenario: Error al cargar productos
- **WHEN** ocurra un error al consumir la API local
- **THEN** la aplicación deberá mostrar un mensaje visual de error en la pantalla de listado

### Requirement: El sistema SHALL navegar al detalle del producto seleccionado
La aplicación SHALL permitir seleccionar un item del listado y SHALL navegar a una segunda vista donde se muestre la información completa del producto financiero seleccionado.

#### Scenario: Navegación al detalle
- **WHEN** el usuario seleccione un producto del listado
- **THEN** la aplicación deberá abrir una segunda pantalla con el detalle de ese producto

#### Scenario: Presentación completa del detalle
- **WHEN** la pantalla de detalle se renderice
- **THEN** deberá mostrar el identificador, nombre, descripción, logo, fecha de liberación y fecha de revisión del producto

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

### Requirement: Los controles visuales fuera del alcance funcional de F1 SHALL poder mostrarse como placeholders
Los elementos del diseño D1 que no correspondan al alcance funcional estricto del listado y detalle ya implementados, como las acciones de editar y eliminar, MAY mostrarse como placeholders visuales sin comportamiento de negocio implementado, siempre que su presencia no confunda el flujo principal.

#### Scenario: Placeholder de acciones del detalle
- **WHEN** los botones de editar y eliminar todavía no implementen navegación o mutación
- **THEN** la interfaz podrá mostrarlos deshabilitados o con interacción neutra

### Requirement: La funcionalidad SHALL poder validarse manualmente
La entrega del listado SHALL incluir una forma clara de ejecutar la aplicación y probar manualmente el flujo de listado, búsqueda, conteo y detalle usando el backend local documentado para la prueba.

#### Scenario: Instrucciones de prueba manual
- **WHEN** la implementación del flujo esté finalizada
- **THEN** el equipo deberá proporcionar pasos concretos para levantar la app y validar el flujo manualmente
