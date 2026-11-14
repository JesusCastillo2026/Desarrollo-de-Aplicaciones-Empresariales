# Desarrollo de Aplicaciones Empresariales

Repositorio académico del curso **Desarrollo de Aplicaciones Empresariales**. Reúne las prácticas semanales de desarrollo web, desde los fundamentos de Django hasta la construcción de interfaces con React y su futura integración con una API.

## Propósito

Documentar la evolución de una aplicación para la gestión de una clínica veterinaria. Cada carpeta contiene el código y las instrucciones de la semana correspondiente. Los PDFs de las guías y los informes se encuentran en [Documentos 1-16](Documentos%201-16/README.md).

## Tecnologías

- **Backend:** Python, Django y Django REST Framework
- **Base de datos:** SQLite
- **Frontend:** React y Vite
- **Control de versiones:** Git y GitHub

## Recorrido del curso

| Semana | Tema | Trabajo realizado |
|:---:|---|---|
| [01](Semana_01/) | Fundamentos de Django | Entorno, proyecto y aplicación, modelo inicial, vistas, rutas, plantillas y administración. |
| [02](Semana_02/) | Arquitectura MVT y renderizado | Vistas, URLs, plantillas y formularios con datos en memoria. |
| [03](Semana_03/) | Persistencia y operaciones CRUD | Modelos, migraciones, SQLite y operaciones de creación, consulta, actualización y eliminación. |
| [04](Semana_04/) | Relaciones entre modelos | Relaciones 1:1, 1:N y N:M, consultas relacionadas y optimización. |
| [05](Semana_05/) | Django Admin | Registro y personalización de modelos, búsquedas, filtros e Inlines. |
| [06](Semana_06/) | Plantillas y seguridad | Herencia, componentes reutilizables, filtros y protección frente a XSS. |
| [07](Semana_07/) | ORM avanzado | Transacciones, expresiones `F()`, agregaciones, QuerySets personalizados y optimización. |
| [08](Semana_08/) | API REST | Serializadores, ViewSets, rutas, validaciones, filtros, relaciones y pruebas con Django REST Framework. |
| [09](Semana_09/) | React y Vite | Componentes, listas, renderizado condicional, filtros y estilos adaptables. |
| [10](Semana_10/) | Componentes e interacción | Props, estado, eventos, búsqueda y formularios controlados. |
| [11](Semana_11/) | Comunicación entre componentes | Props descendentes, callbacks, estado elevado, datos derivados y `useEffect`; mini catálogo con carrito y panel administrativo de pacientes. |

## Estructura

```text
.
├── Semana_01/ … Semana_10/
├── Semana_11/
│   ├── README.md
│   └── frontend/
│       ├── src/practica/       # Mini catálogo y carrito
│       ├── src/components/     # Panel de pacientes
│       └── package.json
├── Documentos 1-16/
│   ├── README.md
│   ├── Semana 01.pdf … Semana 10.pdf
│   └── Laboratorio 11 - Comunicación entre componentes.pdf
├── README.md
└── requirements.txt
```

## Ejecución de los proyectos

Las semanas son ejercicios independientes. Abre la carpeta de la semana que quieras ejecutar y sigue su README. Para proyectos Django, el flujo usual es crear y activar un entorno virtual, instalar `requirements.txt`, ejecutar las migraciones indicadas e iniciar con `python manage.py runserver`.

Para las prácticas React de las semanas 9, 10 y 11, entra a la carpeta `frontend`, instala dependencias con `npm install` y ejecuta `npm run dev`. En Semana 11 también puedes verificar el código de forma estática con `npm run lint` y compilarlo para producción con `npm run build`.

## Estado de integración

- Semanas 1 a 8: backend Django y API REST.
- Semanas 9 a 11: interfaces React y práctica de comunicación entre componentes.
- Semana 11 conserva datos locales en memoria; no consume todavía la API ni persiste en Django. Esa integración corresponde a la Semana 12.
- `node_modules` y `dist` se generan localmente y no forman parte del repositorio.

## Autoría académica

Trabajo realizado para el curso **Desarrollo de Aplicaciones Empresariales**.
