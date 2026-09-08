Desarrollo-de-Aplicaciones-Empresariales

---

Semana 01: Configuración de Entorno, Arquitectura Modular y Gestión con Django Admin

Problemática
El área empresarial requiere sentar las bases tecnológicas para un sistema de gestión de catálogo de ítems. El desafío consiste en establecer un entorno de desarrollo estructurado y desacoplado, definiendo la arquitectura modular del proyecto, configurando la persistencia de datos relacionales desde cero y habilitando un módulo de administración seguro para la gestión inicial de registros sin depender de interfaces complejas.

Requisitos Funcionales
* SETUP: Inicialización de la arquitectura del proyecto separando la configuración global (config) de la lógica de negocio (core).
* MODELING: Definición del modelo de datos Item con campos de texto descriptivo y registro automático de fecha y hora de creación.
* PERSISTENCE: Generación y aplicación de migraciones automáticas hacia SQLite mediante Django ORM.
* ADMIN: Registro del modelo en el panel administrativo nativo de Django y creación de credenciales de superusuario para el control total del catálogo.
* READ: Implementación de la vista principal conectada a plantillas DTL para renderizar dinámicamente la lista de ítems mediante tablas responsivas.

Diseño del Modelo y Aplicación Creada
* Arquitectura: Estructura desacoplada bajo el estándar modular de Django (núcleo config y módulo de aplicación core).
* Administración Nativa: Activación del panel /admin/ para operaciones inmediatas de gestión de datos sin necesidad de construir formularios CRUD manuales en la primera fase.
* Renderizado Dinámico: Integración del motor de plantillas de Django (DTL) con Bootstrap 5 para el despliegue del catálogo.

---

Semana 02: Arquitectura MVT, Enrutamiento y Renderizado Dinámico con DTL

Problemática
La clínica veterinaria requiere una solución web inicial para presentar su catálogo de servicios, información de contacto y listados clínicos sin depender de almacenamiento persistente. El reto consiste en establecer el patrón arquitectónico del framework Django y gestionar el flujo de datos desde el backend hacia el navegador web, comprobando la correcta renderización de estructuras en memoria cada vez que un usuario realiza una solicitud HTTP.

Requisitos Funcionales
* SETUP: Creación del entorno de trabajo, inicialización del proyecto Django y configuración de la aplicación web de gestión clínica.
* ROUTING: Mapeo y distribución de peticiones URL desacopladas mediante el archivo urls.py del proyecto enlazado al urls.py de la aplicación.
* CONTROLLERS: Implementación de funciones de vista (FBV) en views.py encargadas de procesar la lógica de negocio y preparar los diccionarios de contexto.
* TEMPLATING: Despliegue de vistas dinámicas mediante el motor de plantillas de Django (DTL), recorriendo listas de datos en memoria mediante etiquetas {% for %} y validaciones con {% if %}.

Diseño del Modelo y Aplicación Creada
* Arquitectura: Estructuración del proyecto bajo el patrón MVT (Modelo - Vista - Template) para separar responsabilidades entre lógica y presentación.
* Manejo de Datos en Memoria: Paso de parámetros y colecciones (listas de diccionarios con doctores, pacientes y servicios) enviados directamente desde el contexto de la vista hacia los templates HTML.
* Enrutamiento Modular: Centralización de rutas que permite navegar entre las diferentes páginas del sistema sin recargar de forma estática o rígida las URLs.

---

Semana 03: Implementación de base de datos SQLite y operaciones CRUD con Django ORM

Problemática
La clínica veterinaria necesita evolucionar su sistema inicial (que almacenaba datos temporalmente en memoria) hacia una solución de almacenamiento persistente. El objetivo es evitar la pérdida de información clínica y de contacto de los clientes cada vez que se reinicia el servidor, permitiendo una gestión real y duradera.

Requisitos Funcionales
* CREATE: Registro de nuevos propietarios y pacientes a través de formularios web vinculados a la base de datos.
* READ: Lectura y renderizado dinámico de los registros almacenados utilizando QuerySets para listarlos en tablas HTML.
* UPDATE: Capacidad de modificar la información existente mediante formularios prellenados con los datos actuales del registro.
* DELETE: Eliminación segura de registros que incluye una pantalla intermedia de confirmación para evitar borrados accidentales.

Diseño del Modelo y Aplicación Creada
* Arquitectura: Sistema construido sobre el patrón MVT de Django con almacenamiento en SQLite.
* ORM: Todas las transacciones a la base de datos se manejan de forma segura a través de Django ORM, sin redactar sentencias SQL manuales.
* Modelo Relacional (1:N): Se estructuraron entidades principales como Propietario y Paciente. Se implementó una clave foránea (ForeignKey) en la entidad Paciente para garantizar que cada mascota esté obligatoriamente vinculada a un dueño responsable.
