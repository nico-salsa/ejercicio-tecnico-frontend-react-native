## Purpose

Definir la visualización de la cantidad de registros obtenidos y visibles en la pantalla principal del listado.

## Requirements

### Requirement: El sistema SHALL mostrar la cantidad de registros obtenidos en el listado
La pantalla principal del listado SHALL mostrar la cantidad de registros obtenidos y visibles para el usuario como parte de la interfaz alineada con D1.

#### Scenario: Conteo base del listado
- **WHEN** la API devuelva productos y la pantalla principal se renderice sin filtro activo
- **THEN** la interfaz deberá mostrar la cantidad total de registros obtenidos

#### Scenario: Conteo con filtro activo
- **WHEN** exista un término de búsqueda que reduzca la lista visible
- **THEN** la interfaz deberá mostrar cuántos registros visibles hay respecto del total cargado

### Requirement: El conteo SHALL permanecer consistente con el estado visible del listado
El bloque de conteo SHALL actualizarse de acuerdo con el estado actual del listado y SHALL seguir siendo visible aun cuando la búsqueda no encuentre coincidencias, siempre que existan registros cargados desde la API.

#### Scenario: Sin coincidencias pero con datos cargados
- **WHEN** el usuario aplique una búsqueda sin coincidencias y el catálogo base no esté vacío
- **THEN** la interfaz deberá conservar un conteo coherente con el resultado visible y el total obtenido

#### Scenario: Sin datos en origen
- **WHEN** la API no entregue productos
- **THEN** la interfaz no deberá mostrar un conteo engañoso de registros
