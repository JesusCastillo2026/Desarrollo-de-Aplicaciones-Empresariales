# Desarrollo de Aplicaciones Empresariales

Repositorio académico del curso **Desarrollo de Aplicaciones Empresariales**. Reúne prácticas semanales de desarrollo web, desde los fundamentos de Django hasta la integración de interfaces React con una API REST.

## Propósito

Documentar la evolución de aplicaciones de gestión y comercio electrónico. Cada carpeta contiene el código y las instrucciones de ejecución de su semana. Las guías y los informes están en [Documentos 1-16](Documentos%201-16/README.md).

## Tecnologías

- **Backend:** Python, Django y Django REST Framework
- **Base de datos:** SQLite
- **Frontend:** React, Vite y Axios
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
| [11](Semana_11/) | Comunicación entre componentes | Props, callbacks, estado elevado, datos derivados y `useEffect`; catálogo con carrito y panel de pacientes. |
| [12](Semana_12/) | AJAX y servicios web | Integración React-Django con Axios y CORS; búsqueda, estados de carga/error y CRUD REST de pacientes. |
| [13](Semana_13/) | Proyecto integrador PikaFit | Análisis de roles, requisitos, reglas, arquitectura, rutas y flujo de pases; incluye el código fuente para abrir y recorrer en VS Code. |

## Estructura destacada

```text
.
├── Semana_01/ … Semana_10/
├── Semana_11/
├── Semana_12/
│   ├── backend/                 # API Django de la clínica
│   └── frontend/                # React + Axios
├── Semana_13/
│   ├── README.md                # Respuestas detalladas de ejercicios 1–14
│   ├── PikaFit/                 # Código fuente Node.js/Express, MongoDB, Web y Android
│   │   └── GUIA_LABORATORIO_13.md
│   └── evidencias_pikafit/      # Diagramas de arquitectura, estructura y flujo
├── Documentos 1-16/
│   ├── README.md
│   └── Semana 01.pdf … Semana 13.pdf
├── README.md
└── requirements.txt
```

## Semana 13

La carpeta [Semana 13](Semana_13/) analiza el proyecto integrador PikaFit y contiene una copia del código fuente público para abrir en VS Code. Consulta la [guía de recorrido y ejecución](Semana_13/PikaFit/GUIA_LABORATORIO_13.md) para ubicar roles, autorización, rutas, pases y persistencia. La configuración `.env`, credenciales y base de datos local se crean por separado y no se incluyen en el repositorio.

## Estado de integración

- Semanas 1 a 8: fundamentos, persistencia y API con Django.
- Semanas 9 a 11: interfaces React y comunicación entre componentes.
- Semana 12: React consume la API de clínica, con CRUD y búsqueda remota.
- Semana 13: analiza el proyecto PikaFit e incluye su código fuente, guía ejecutable y documentación.
- La API de ejercicios conserva permisos de desarrollo abiertos. Configura autenticación y permisos antes de cualquier despliegue público.
- `node_modules`, `dist`, entornos virtuales y bases SQLite locales no se publican.

## Autoría académica

Trabajo realizado para el curso **Desarrollo de Aplicaciones Empresariales**.
