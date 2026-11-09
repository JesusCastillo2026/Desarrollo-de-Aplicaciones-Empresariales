# Desarrollo de Aplicaciones Empresariales

Repositorio académico del curso **Desarrollo de Aplicaciones Empresariales**. Reúne los proyectos y prácticas organizados por semana, con énfasis en el desarrollo web con Django, la construcción de una API REST y la creación de interfaces con React.

## Objetivo

Documentar la evolución de una aplicación para la gestión de una clínica veterinaria, desde la configuración inicial del entorno hasta la separación del backend y el frontend. Cada carpeta semanal contiene el trabajo correspondiente a esa etapa.

## Tecnologías

- **Backend:** Python, Django y Django REST Framework
- **Base de datos:** SQLite
- **Frontend:** React y Vite
- **Control de versiones:** Git y GitHub

## Recorrido del curso

| Semana | Tema | Trabajo realizado |
|:---:|---|---|
| [01](Semana_01/) | Fundamentos de Django | Preparación del entorno, creación del proyecto y la aplicación, modelo inicial, vistas, rutas, plantillas, administración y documentación de ejecución. |
| [02](Semana_02/) | Arquitectura MVT y renderizado | Organización de vistas, URLs y plantillas; presentación de datos en memoria y captura de información mediante formularios. |
| [03](Semana_03/) | Persistencia y operaciones CRUD | Modelos, migraciones, SQLite y Django ORM para registrar, consultar, actualizar y eliminar datos. |
| [04](Semana_04/) | Relaciones entre modelos | Relaciones 1:1, 1:N y N:M con modelo intermedio; consultas relacionadas y optimización con `select_related()` y `prefetch_related()`. |
| [05](Semana_05/) | Django Admin | Registro y personalización de modelos con `ModelAdmin`, búsquedas, filtros e Inlines para editar entidades relacionadas. |
| [06](Semana_06/) | Plantillas y seguridad | Herencia de plantillas, bloques, componentes reutilizables, filtros y revisión de la protección automática frente a XSS. |
| [07](Semana_07/) | ORM avanzado | Transacciones, expresiones `F()`, reportes con agregaciones, QuerySets personalizados y optimización de consultas. |
| [08](Semana_08/) | API REST | Serializadores, ViewSets, rutas, validaciones, filtros, relaciones anidadas y pruebas automatizadas con Django REST Framework. |
| [09](Semana_09/) | React y Vite | Interfaz inicial con componentes, listas, renderizado condicional, filtros y estilos responsivos; datos de práctica compatibles con la API. |
| [10](Semana_10/) | Componentes e interacción | Componentes reutilizables, props, estado, eventos, búsqueda y formularios controlados con validación. |

## Estructura

```text
.
├── Semana_01/
├── Semana_02/
├── Semana_03/
├── Semana_04/
├── Semana_05/
├── Semana_06/
├── Semana_07/
├── Semana_08/
├── Semana_09/
├── Semana_10/
├── Documentos 1-16/
│   └── README.md
├── README.md
└── requirements.txt
```

La carpeta [Documentos 1-16](Documentos%201-16/README.md) contiene el índice de guías por semana y los enlaces de descarga disponibles. Las semanas 11 a 16 quedan reservadas para incorporar material cuando se trabaje en ellas.

## Ejecución de los proyectos

Las semanas son proyectos o etapas independientes; abre la carpeta de la semana que deseas ejecutar y sigue las instrucciones de su README. Para los proyectos Django, el flujo habitual es:

1. Crear y activar un entorno virtual.
2. Instalar las dependencias indicadas en `requirements.txt`.
3. Ejecutar las migraciones cuando la semana utilice base de datos.
4. Iniciar el servidor con `python manage.py runserver`.

Para el frontend de React, ingresa a `Semana_09/frontend` o `Semana_10/frontend`, instala las dependencias con `npm install` y ejecuta `npm run dev`. Consulta el README de cada semana para los comandos y requisitos específicos.

## Estado de integración

- Las semanas 1 a 8 desarrollan el backend Django y la API.
- Las semanas 9 y 10 desarrollan el frontend React con datos de práctica.
- En la Semana 10, el formulario actualiza el estado de React durante la sesión; todavía no persiste los datos en Django ni consume la API.
- Cada carpeta semanal contiene el alcance y las instrucciones específicas de esa práctica.

## Autoría académica

Trabajo desarrollado para el curso **Desarrollo de Aplicaciones Empresariales**. El contenido se organiza con fines académicos y de seguimiento de las prácticas semanales.
