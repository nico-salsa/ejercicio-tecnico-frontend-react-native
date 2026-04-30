## ADDED Requirements

### Requirement: El sistema SHALL filtrar productos financieros desde el campo de busqueda
La aplicacion SHALL permitir que el usuario escriba en el campo de busqueda del listado y SHALL filtrar los productos cargados en la vista principal segun el texto ingresado.

#### Scenario: Filtrado por nombre
- **WHEN** el usuario escriba un texto que coincida con el nombre de uno o mas productos
- **THEN** la lista debera mostrar solo los productos coincidentes

#### Scenario: Filtrado por identificador
- **WHEN** el usuario escriba un texto que coincida con el identificador de un producto
- **THEN** la lista debera mostrar el producto correspondiente

### Requirement: La busqueda SHALL usar comparacion normalizada basica
El filtrado SHALL ignorar diferencias de mayusculas y minusculas y SHALL tratar espacios sobrantes al inicio o al final como irrelevantes para la comparacion.

#### Scenario: Coincidencia case-insensitive
- **WHEN** el usuario ingrese el mismo termino con distinto uso de mayusculas o minusculas
- **THEN** el resultado del filtrado debera ser equivalente

#### Scenario: Coincidencia con espacios sobrantes
- **WHEN** el usuario ingrese un termino con espacios al inicio o al final
- **THEN** el sistema debera evaluar la coincidencia con el termino normalizado

### Requirement: La busqueda SHALL reflejar sus resultados en la interfaz
La pantalla de listado SHALL actualizar el conteo visible de registros segun el conjunto filtrado y SHALL mostrar un estado visual especifico cuando la busqueda no produzca coincidencias.

#### Scenario: Conteo filtrado
- **WHEN** el usuario aplique un termino de busqueda con coincidencias
- **THEN** el total visible en pantalla debera reflejar solo los productos mostrados

#### Scenario: Sin coincidencias
- **WHEN** el usuario aplique un termino de busqueda que no coincida con ningun producto
- **THEN** la interfaz debera mostrar un mensaje visual que indique que no se encontraron resultados para esa busqueda
