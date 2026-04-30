## MODIFIED Requirements

### Requirement: El sistema SHALL permitir crear un producto financiero desde un formulario
La aplicacion SHALL permitir navegar desde el listado hacia un formulario de registro y SHALL permitir crear un producto financiero mediante un boton `Agregar`. La implementacion del formulario MUST ser reutilizable tambien para el modo de edicion, conservando las mismas reglas de validacion visual para los campos compartidos.

#### Scenario: Navegacion al formulario
- **WHEN** el usuario pulse el boton principal `Agregar` desde el listado
- **THEN** la aplicacion debera abrir la pantalla de registro de producto

#### Scenario: Creacion exitosa
- **WHEN** el usuario complete el formulario con datos validos y confirme `Agregar`
- **THEN** la aplicacion debera enviar el producto al backend y reflejar el nuevo registro en el catalogo
