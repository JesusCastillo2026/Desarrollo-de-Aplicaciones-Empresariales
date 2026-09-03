# Desarrollo-de-Aplicaciones-Empresariales

**Semana 01:**
#
#
#
#
**Semana 02:**
#
#
#
#
**Semana 03: Implementación de base de datos SQLite y operaciones CRUD con Django ORM**

**Problemática**
La clínica veterinaria necesita evolucionar su sistema inicial (que almacenaba datos temporalmente en memoria) hacia una solución de almacenamiento persistente. El objetivo es evitar la pérdida de información clínica y de contacto de los clientes cada vez que se reinicia el servidor, permitiendo una gestión real y duradera.

**Requisitos Funcionales**
* CREATE: Registro de nuevos propietarios y pacientes a través de formularios web vinculados a la base de datos.
* READ: Lectura y renderizado dinámico de los registros almacenados utilizando QuerySets para listarlos en tablas HTML.
* UPDATE: Capacidad de modificar la información existente mediante formularios prellenados con los datos actuales del registro.
* DELETE: Eliminación segura de registros que incluye una pantalla intermedia de confirmación para evitar borrados accidentales.

**Diseño del Modelo y Aplicación Creada**
* Arquitectura: Sistema construido sobre el patrón MVT de Django con almacenamiento en SQLite.
* ORM: Todas las transacciones a la base de datos se manejan de forma segura a través de Django ORM, sin redactar sentencias SQL manuales.
* Modelo Relacional (1:N): Se estructuraron entidades principales como Propietario y Paciente. Se implementó una clave foránea (ForeignKey) en la entidad Paciente para garantizar que cada mascota esté obligatoriamente vinculada a un dueño responsable.
