## Purpose

Definir la creacion de productos financieros desde un formulario validado dentro de la app.

## Requirements

### Requirement: El sistema SHALL permitir crear un producto financiero desde un formulario
La aplicacion SHALL permitir navegar desde el listado hacia un formulario de registro y SHALL permitir crear un producto financiero mediante un boton `Agregar`.

#### Scenario: Navegacion al formulario
- **WHEN** el usuario pulse el boton principal `Agregar` desde el listado
- **THEN** la aplicacion debera abrir la pantalla de registro de producto

#### Scenario: Creacion exitosa
- **WHEN** el usuario complete el formulario con datos validos y confirme `Agregar`
- **THEN** la aplicacion debera enviar el producto al backend y reflejar el nuevo registro en el catalogo

### Requirement: El formulario SHALL permitir reiniciar sus campos
La pantalla de registro SHALL incluir un boton `Reiniciar` que limpie los valores editables del formulario y sus errores visibles asociados.

#### Scenario: Reinicio del formulario
- **WHEN** el usuario pulse `Reiniciar`
- **THEN** la aplicacion debera restaurar el formulario a su estado inicial de captura

### Requirement: El formulario SHALL validar todos los campos antes del envio
Antes de crear el producto, la aplicacion SHALL validar `id`, `name`, `description`, `logo`, `date_release` y `date_revision` segun las reglas funcionales definidas para F4.

#### Scenario: Validacion de campos requeridos
- **WHEN** uno o mas campos obligatorios esten vacios
- **THEN** la aplicacion debera marcar visualmente cada campo invalido y bloquear el envio

#### Scenario: Validacion de longitudes
- **WHEN** `id`, `name` o `description` no cumplan sus rangos permitidos
- **THEN** la aplicacion debera mostrar errores visuales por campo y bloquear el envio

#### Scenario: Validacion de fechas
- **WHEN** `date_release` sea anterior a la fecha actual o `date_revision` no sea exactamente un anio posterior
- **THEN** la aplicacion debera mostrar errores visuales por campo y bloquear el envio

### Requirement: El sistema SHALL verificar unicidad del identificador
La aplicacion SHALL consultar el servicio de verificacion de `id` y SHALL impedir la creacion cuando el identificador ya exista.

#### Scenario: Identificador ya existente
- **WHEN** el servicio de verificacion responda que el `id` ya existe
- **THEN** la aplicacion debera mostrar un error visual sobre el campo `id` y bloquear el envio

#### Scenario: Identificador disponible
- **WHEN** el servicio de verificacion responda que el `id` no existe
- **THEN** la aplicacion podra continuar con la creacion si el resto del formulario es valido

### Requirement: El sistema SHALL mostrar estados visuales de error por campo
Cada campo invalido del formulario SHALL mostrar visualmente su estado de error y un mensaje asociado, alineado con la maqueta de error suministrada.

#### Scenario: Error visual por campo
- **WHEN** un campo incumpla una regla de validacion
- **THEN** la interfaz debera marcar ese campo con estilo de error y un mensaje descriptivo

### Requirement: El sistema SHALL manejar errores de creacion y verificacion
La aplicacion SHALL mostrar retroalimentacion visual cuando falle la verificacion del `id` o el envio del producto al backend.

#### Scenario: Falla de verificacion remota
- **WHEN** ocurra un error al consultar el servicio de verificacion
- **THEN** la interfaz debera informar al usuario y evitar un estado silencioso de fallo

#### Scenario: Falla al crear producto
- **WHEN** el backend rechace la creacion o falle la solicitud
- **THEN** la interfaz debera mostrar un mensaje visual de error y mantener los valores del formulario
