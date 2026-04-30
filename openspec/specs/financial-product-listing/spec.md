## Purpose

Definir la funcionalidad base de listado, detalle, busqueda, conteo y alta de productos financieros, incluyendo la maquetacion completa de D1 y la validacion manual local del flujo.

## Requirements

### Requirement: El sistema SHALL listar productos financieros desde la API local
La aplicacion SHALL consumir el endpoint local de productos financieros y SHALL mostrar los registros obtenidos en una pantalla de listado. Cada item del listado MUST presentar al menos el nombre del producto, su identificador y una affordance visual de navegacion acorde al diseno D1.

#### Scenario: Listado exitoso de productos
- **WHEN** la API local responda correctamente con productos financieros
- **THEN** la aplicacion debera mostrar cada producto en la pantalla principal del listado

#### Scenario: Lista vacia
- **WHEN** la API local responda sin productos
- **THEN** la aplicacion debera mostrar un estado visual de lista vacia

#### Scenario: Error al cargar productos
- **WHEN** ocurra un error al consumir la API local
- **THEN** la aplicacion debera mostrar un mensaje visual de error en la pantalla de listado

### Requirement: El sistema SHALL navegar al detalle del producto seleccionado
La aplicacion SHALL permitir seleccionar un item del listado y SHALL navegar a una segunda vista donde se muestre la informacion completa del producto financiero seleccionado.

#### Scenario: Navegacion al detalle
- **WHEN** el usuario seleccione un producto del listado
- **THEN** la aplicacion debera abrir una segunda pantalla con el detalle de ese producto

#### Scenario: Presentacion completa del detalle
- **WHEN** la pantalla de detalle se renderice
- **THEN** debera mostrar el identificador, nombre, descripcion, logo, fecha de liberacion y fecha de revision del producto

### Requirement: La interfaz SHALL reflejar visualmente el diseno D1 completo
La implementacion del listado SHALL reproducir la composicion visual de las dos pantallas del diseno D1. La pantalla de listado MUST incluir un campo de busqueda visible y funcional para filtrar productos dentro de la misma vista principal. La misma pantalla MUST incluir un bloque visible de conteo de registros alineado con D1 y consistente con el estado actual del listado. La pantalla de listado MUST incluir ademas un boton principal `Agregar` alineado con la ubicacion principal definida por D3 para abrir el formulario de registro. La pantalla de detalle MUST incluir los controles visuales de editar y eliminar mostrados en el diseno, aunque su comportamiento no sea obligatorio en este cambio. La composicion visual de ambas pantallas MUST construirse sobre el design system compartido del frontend y no sobre estilos ad hoc aislados por pantalla.

#### Scenario: Campo de busqueda visible en listado
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** debera ver un campo de busqueda alineado con la maqueta D1

#### Scenario: Conteo visible en listado
- **WHEN** el usuario abra la pantalla principal con registros cargados
- **THEN** debera ver un bloque de conteo de registros alineado con la maqueta D1

#### Scenario: Accion principal de alta visible
- **WHEN** el usuario abra la pantalla principal del listado
- **THEN** debera ver un boton principal `Agregar` para iniciar el registro de un producto

#### Scenario: Acciones visibles en detalle
- **WHEN** el usuario abra la pantalla de detalle
- **THEN** debera ver botones visuales de editar y eliminar alineados con la maqueta D1

#### Scenario: Pantallas construidas con base visual comun
- **WHEN** un desarrollador revise la implementacion del listado o del detalle
- **THEN** debera encontrar que ambas pantallas reutilizan tokens o primitivas del design system compartido

### Requirement: Los controles visuales fuera del alcance funcional de F1 SHALL poder mostrarse como placeholders
Los elementos del diseno D1 que no correspondan al alcance funcional estricto del listado y detalle ya implementados, como las acciones de editar y eliminar, MAY mostrarse como placeholders visuales sin comportamiento de negocio implementado, siempre que su presencia no confunda el flujo principal.

#### Scenario: Placeholder de acciones del detalle
- **WHEN** los botones de editar y eliminar todavia no implementen navegacion o mutacion
- **THEN** la interfaz podra mostrarlos deshabilitados o con interaccion neutra

### Requirement: La funcionalidad SHALL poder validarse manualmente
La entrega del listado SHALL incluir una forma clara de ejecutar la aplicacion y probar manualmente el flujo de listado, busqueda, conteo, alta y detalle usando el backend local documentado para la prueba.

#### Scenario: Instrucciones de prueba manual
- **WHEN** la implementacion del flujo este finalizada
- **THEN** el equipo debera proporcionar pasos concretos para levantar la app y validar el flujo manualmente
