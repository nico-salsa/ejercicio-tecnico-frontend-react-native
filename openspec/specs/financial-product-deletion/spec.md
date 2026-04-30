## ADDED Requirements

### Requirement: El sistema SHALL permitir eliminar un producto financiero con confirmacion explicita
La aplicacion SHALL permitir iniciar la eliminacion de un producto financiero desde su pantalla de detalle. Antes de ejecutar la accion definitiva, la interfaz MUST mostrar un modal de confirmacion alineado con D4. El modal MUST ofrecer las acciones `Cancelar` y `Eliminar`. Al confirmar, la aplicacion MUST consumir `DELETE /bp/products/:id`, remover el producto del catalogo local y volver al listado. Si el usuario cancela, el modal MUST cerrarse sin cambios en el catalogo.

#### Scenario: Apertura del modal
- **WHEN** el usuario pulse `Eliminar` en el detalle de un producto
- **THEN** debera abrirse un modal de confirmacion con el nombre del producto

#### Scenario: Cancelacion sin cambios
- **WHEN** el usuario pulse `Cancelar` o cierre el modal
- **THEN** el modal debera ocultarse sin eliminar el producto

#### Scenario: Eliminacion exitosa
- **WHEN** el usuario confirme la eliminacion y el backend responda exitosamente
- **THEN** la aplicacion debera volver al listado y el producto ya no debera estar presente

#### Scenario: Error al eliminar
- **WHEN** el usuario confirme la eliminacion y la operacion falle
- **THEN** el modal debera mantenerse visible y mostrar un mensaje de error
