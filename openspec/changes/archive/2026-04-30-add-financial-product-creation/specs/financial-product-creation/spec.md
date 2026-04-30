## ADDED Requirements

### Requirement: El sistema SHALL permitir crear un producto financiero desde un formulario
La aplicación SHALL permitir navegar desde el listado hacia un formulario de registro y SHALL permitir crear un producto financiero mediante un botón `Agregar`.

#### Scenario: Navegación al formulario
- **WHEN** el usuario pulse el botón principal `Agregar` desde el listado
- **THEN** la aplicación deberá abrir la pantalla de registro de producto

#### Scenario: Creación exitosa
- **WHEN** el usuario complete el formulario con datos válidos y confirme `Agregar`
- **THEN** la aplicación deberá enviar el producto al backend y reflejar el nuevo registro en el catálogo

### Requirement: El formulario SHALL permitir reiniciar sus campos
La pantalla de registro SHALL incluir un botón `Reiniciar` que limpie los valores editables del formulario y sus errores visibles asociados.

#### Scenario: Reinicio del formulario
- **WHEN** el usuario pulse `Reiniciar`
- **THEN** la aplicación deberá restaurar el formulario a su estado inicial de captura

### Requirement: El formulario SHALL validar todos los campos antes del envío
Antes de crear el producto, la aplicación SHALL validar `id`, `name`, `description`, `logo`, `date_release` y `date_revision` según las reglas funcionales definidas para F4.

#### Scenario: Validación de campos requeridos
- **WHEN** uno o más campos obligatorios estén vacíos
- **THEN** la aplicación deberá marcar visualmente cada campo inválido y bloquear el envío

#### Scenario: Validación de longitudes
- **WHEN** `id`, `name` o `description` no cumplan sus rangos permitidos
- **THEN** la aplicación deberá mostrar errores visuales por campo y bloquear el envío

#### Scenario: Validación de fechas
- **WHEN** `date_release` sea anterior a la fecha actual o `date_revision` no sea exactamente un año posterior
- **THEN** la aplicación deberá mostrar errores visuales por campo y bloquear el envío

### Requirement: El sistema SHALL verificar unicidad del identificador
La aplicación SHALL consultar el servicio de verificación de `id` y SHALL impedir la creación cuando el identificador ya exista.

#### Scenario: Identificador ya existente
- **WHEN** el servicio de verificación responda que el `id` ya existe
- **THEN** la aplicación deberá mostrar un error visual sobre el campo `id` y bloquear el envío

#### Scenario: Identificador disponible
- **WHEN** el servicio de verificación responda que el `id` no existe
- **THEN** la aplicación podrá continuar con la creación si el resto del formulario es válido

### Requirement: El sistema SHALL mostrar estados visuales de error por campo
Cada campo inválido del formulario SHALL mostrar visualmente su estado de error y un mensaje asociado, alineado con la maqueta de error suministrada.

#### Scenario: Error visual por campo
- **WHEN** un campo incumpla una regla de validación
- **THEN** la interfaz deberá marcar ese campo con estilo de error y un mensaje descriptivo

### Requirement: El sistema SHALL manejar errores de creación y verificación
La aplicación SHALL mostrar retroalimentación visual cuando falle la verificación del `id` o el envío del producto al backend.

#### Scenario: Falla de verificación remota
- **WHEN** ocurra un error al consultar el servicio de verificación
- **THEN** la interfaz deberá informar al usuario y evitar un estado silencioso de fallo

#### Scenario: Falla al crear producto
- **WHEN** el backend rechace la creación o falle la solicitud
- **THEN** la interfaz deberá mostrar un mensaje visual de error y mantener los valores del formulario
