## Purpose

Definir la búsqueda de productos financieros desde la pantalla principal del listado.

## Requirements

### Requirement: El sistema SHALL filtrar productos financieros desde el campo de búsqueda
La aplicación SHALL permitir que el usuario escriba en el campo de búsqueda del listado y SHALL filtrar los productos cargados en la vista principal según el texto ingresado.

#### Scenario: Filtrado por nombre
- **WHEN** el usuario escriba un texto que coincida con el nombre de uno o más productos
- **THEN** la lista deberá mostrar solo los productos coincidentes

#### Scenario: Filtrado por identificador
- **WHEN** el usuario escriba un texto que coincida con el identificador de un producto
- **THEN** la lista deberá mostrar el producto correspondiente

### Requirement: La búsqueda SHALL usar comparación normalizada basica
El filtrado SHALL ignorar diferencias de mayúsculas y minúsculas y SHALL tratar espacios sobrantes al inicio o al final como irrelevantes para la comparación.

#### Scenario: Coincidencia case-insensitive
- **WHEN** el usuario ingrese el mismo termino con distinto uso de mayúsculas o minúsculas
- **THEN** el resultado del filtrado deberá ser equivalente

#### Scenario: Coincidencia con espacios sobrantes
- **WHEN** el usuario ingrese un termino con espacios al inicio o al final
- **THEN** el sistema deberá evaluar la coincidencia con el termino normalizado

### Requirement: La búsqueda SHALL reflejar sus resultados en la interfaz
La pantalla de listado SHALL actualizar el conteo visible de registros según el conjunto filtrado y SHALL mostrar un estado visual específico cuando la búsqueda no produzca coincidencias.

#### Scenario: Conteo filtrado
- **WHEN** el usuario aplique un termino de búsqueda con coincidencias
- **THEN** el total visible en pantalla deberá reflejar solo los productos mostrados

#### Scenario: Sin coincidencias
- **WHEN** el usuario aplique un termino de búsqueda que no coincida con ningún producto
- **THEN** la interfaz deberá mostrar un mensaje visual que indique que no se encontraron resultados para esa búsqueda
