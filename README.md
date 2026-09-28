# Desarrollo-de-Aplicaciones-Empresariales

---

## Semana 02: Arquitectura MVT, Enrutamiento y Renderizado Dinámico con DTL

**Problemática**
La clínica veterinaria requiere una solución web inicial para presentar su catálogo de servicios, información de contacto y listados clínicos sin depender de almacenamiento persistente. El reto consiste en establecer el patrón arquitectónico del framework Django y gestionar el flujo de datos desde el backend hacia el navegador web, comprobando la correcta renderización de estructuras en memoria cada vez que un usuario realiza una solicitud HTTP.

**Requisitos Funcionales**
* SETUP: Creación del entorno de trabajo, inicialización del proyecto Django y configuración de la aplicación web de gestión clínica.
* ROUTING: Mapeo y distribución de peticiones URL desacopladas mediante el archivo urls.py del proyecto enlazado al urls.py de la aplicación.
* CONTROLLERS: Implementación de funciones de vista (FBV) en views.py encargadas de procesar la lógica de negocio y preparar los diccionarios de contexto.
* TEMPLATING: Despliegue de vistas dinámicas mediante el motor de plantillas de Django (DTL), recorriendo listas de datos en memoria mediante etiquetas `{% for %}` y validaciones con `{% if %}`.

**Diseño del Modelo y Aplicación Creada**
* Arquitectura: Estructuración del proyecto bajo el patrón MVT (Modelo - Vista - Template) para separar responsabilidades entre lógica y presentación.
* Manejo de Datos en Memoria: Paso de parámetros y colecciones (listas de diccionarios con doctores, pacientes y servicios) enviados directamente desde el contexto de la vista hacia los templates HTML.
* Enrutamiento Modular: Centralización de rutas que permite navegar entre las diferentes páginas del sistema sin recargar de forma estática o rígida las URLs.

---

## Semana 03: Implementación de base de datos SQLite y operaciones CRUD con Django ORM

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

---

## Semana 04: Ampliación del Modelo de Datos (1:1, 1:N, N:M) y Optimización de Consultas

**Problemática**
A medida que la clínica crece, surge la necesidad de manejar historiales médicos exclusivos para cada mascota y registrar el historial de atenciones y servicios clínicos recibidos. El reto es escalar la base de datos para soportar relaciones avanzadas sin afectar el rendimiento de la aplicación, evitando la saturación del servidor por consultas redundantes ("N+1").

**Requisitos Funcionales**
* MODELING EXTENSION: Implementación de relaciones estructurales complejas: 1:1 (OneToOneField) para expedientes clínicos, y N:M (ManyToManyField) con modelo intermedio (`through`) para registrar atributos propios de las atenciones (fecha y estado).
* QUERY OPTIMIZATION: Refactorización de las vistas de lectura integrando los métodos `select_related()` y `prefetch_related()` para reducir drásticamente el número de consultas SQL en base a los JOINs de la base de datos.
* ADVANCED CRUD: Creación, actualización y eliminación de registros en la tabla intermedia (`PacienteServicio`) mediante formularios personalizados expuestos en la interfaz.

**Diseño del Modelo y Aplicación Creada**
* Entidades Independientes: `Medicamento` y `Veterinario` operando de forma autónoma.
* Relación 1:N: Se mantiene `Propietario` gestionando múltiples `Paciente`.
* Relación 1:1: Creación de la entidad `HistorialMedico` como una ficha complementaria exclusiva vinculada directamente a `Paciente`.
* Relación N:M: Asociación entre `Paciente` y `Servicio` a través de la entidad transaccional `PacienteServicio`.

---

## Semana 05: Personalización del Django Admin, ModelAdmin e Inlines

**Problemática**
El equipo administrativo y médico de la clínica requiere una interfaz centralizada y segura (Backoffice) para gestionar los registros complejos de mascotas, historiales y servicios de forma ágil. El reto consiste en habilitar esta gestión sin tener que desarrollar desde cero múltiples vistas y plantillas, aprovechando las herramientas nativas del framework para administrar datos altamente relacionados desde una sola pantalla sin perder el contexto del paciente.

**Requisitos Funcionales**
* ADMIN SETUP: Habilitación del panel administrativo de Django e integración de las 7 entidades de la base de datos ampliada de la clínica veterinaria.
* MODEL ADMIN: Personalización de la interfaz de las entidades principales (`Paciente`, `Propietario`, `Medicamento`) configurando la presentación en columnas (`list_display`), agregando barras de búsqueda funcionales (`search_fields`) y habilitando paneles laterales de filtrado (`list_filter`) para optimizar la búsqueda de información.
* INLINE FORMS: Edición de registros relacionados en la misma pantalla del registro principal mediante la implementación de formularios anidados para optimizar el flujo de trabajo del staff clínico.

**Diseño del Modelo y Aplicación Creada**
* Backoffice Centralizado: El Administrador de Django asume el control de la gestión interna, reutilizando el ORM y los modelos previamente definidos para generar automáticamente una interfaz segura.
* Gestión 1:1 Integrada: Implementación de `StackedInline` para incrustar el formulario del `HistorialMedico` apilado verticalmente dentro de la vista de edición general del `Paciente`.
* Gestión N:M Transaccional: Implementación de `TabularInline` para la tabla intermedia `PacienteServicio`. Permite agregar, editar estados o eliminar los servicios clínicos recibidos directamente desde el perfil del paciente mediante una cuadrícula dinámica.

---

## Semana 06: Refactorización de Plantillas (Herencia, Filtros, Includes) y Seguridad XSS

**Problemática**
Con el ecosistema ampliado de 7 entidades completamente funcional, las vistas públicas de la clínica (Frontend) comenzaron a presentar problemas de mantenibilidad debido a la redundancia de código HTML (como encabezados y pies de página repetidos). Además, los formularios públicos requerían una auditoría de seguridad para garantizar que los datos ingresados por los usuarios no expusieran el sistema a ataques de inyección. El reto consiste en aplicar buenas prácticas de diseño de plantillas en Django para centralizar la interfaz gráfica, facilitar la reutilización de componentes y validar los mecanismos de protección por defecto.

**Requisitos Funcionales**
* TEMPLATE INHERITANCE: Implementación de la etiqueta `{% extends %}` y `{% block content %}` para unificar el diseño de la aplicación bajo un único archivo maestro (`base.html`), eliminando la repetición de estructuras HTML5 y configuraciones de Bootstrap.
* REUSABILITY: Extracción de estructuras repetitivas, específicamente la lógica de renderizado de los formularios de creación y edición, hacia archivos independientes inyectados dinámicamente mediante la etiqueta `{% include %}` parametrizada.
* DATA FORMATTING: Aplicación de filtros de plantilla (como `|upper` y `|floatformat:2`) para estandarizar la presentación visual de datos clínicos y financieros directamente en el frontend, sin alterar los registros originales en la base de datos.
* SECURITY & DOCUMENTATION: Validación práctica del mecanismo de auto-escape de Django frente a ataques XSS inyectando scripts maliciosos controlados en los formularios, y documentación de estructuras complejas de relaciones (N:M) mediante comentarios `{# #}` en el código fuente.

**Diseño del Modelo y Aplicación Creada**
* Interfaz Modular: El Frontend de la clínica veterinaria ahora opera bajo un sistema de plantillas jerárquicas, donde las vistas de reporte de relaciones y listados heredan un diseño responsivo maestro.
* Componentes Escalables: Los formularios para registrar pacientes, propietarios o editar atenciones comparten un único molde HTML, facilitando el mantenimiento y la consistencia visual en todo el sistema público.
* Seguridad Garantizada: Se comprobó que las interfaces refactorizadas ofrecen un nivel de protección robusto para el usuario final (auto-escape), igualando la fiabilidad del entorno aislado del Backoffice desarrollado en la semana anterior.