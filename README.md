# Desarrollo de Aplicaciones Empresariales

Repositorio académico del curso **Desarrollo de Aplicaciones Empresariales**. Reúne prácticas semanales de desarrollo web, desde los fundamentos de Django hasta la integración de interfaces React con una API REST.

## Propósito

Documentar la evolución de una aplicación para la gestión de una clínica veterinaria. Cada carpeta contiene el código y las instrucciones de ejecución de su semana. Las guías y los informes están en [Documentos 1-16](Documentos%201-16/README.md).

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
| [12](Semana_12/) | AJAX y servicios web | Integración de React con Django mediante Axios y CORS; estados de carga/error, búsqueda remota y CRUD REST de pacientes. |

## Estructura

```text
.
├── Semana_01/ … Semana_10/
├── Semana_11/
│   ├── README.md
│   └── frontend/
├── Semana_12/
│   ├── README.md
│   ├── backend/                 # API Django independiente, basada en Semana 8
│   └── frontend/                # React + Axios
├── Documentos 1-16/
│   ├── README.md
│   └── Semana 01.pdf … Semana 12.pdf
├── README.md
└── requirements.txt
```

## Ejecución

Las semanas son proyectos independientes. Sigue el README incluido en cada carpeta. Para proyectos React, entra a `frontend`, instala dependencias con `npm install` e inicia con `npm run dev`.

### Semana 12: integración completa

Inicia Django en una terminal:

```powershell
cd Semana_12/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_lab12
python manage.py runserver
```

En otra terminal, inicia React:

```powershell
cd Semana_12/frontend
npm install
npm run dev
```

Abre la URL local que presenta Vite. El frontend consulta `http://127.0.0.1:8000/api`; Django permite el origen local de Vite mediante CORS. La guía de arranque, las rutas y las verificaciones están en [Semana 12](Semana_12/README.md).

## Estado de integración

- Semanas 1 a 8: fundamentos, persistencia y API con Django.
- Semanas 9 a 11: interfaces React y comunicación entre componentes con datos de práctica.
- Semana 12: React consume la API, ejecuta GET/POST/PATCH/DELETE y búsqueda remota; los cambios persisten en SQLite.
- La API de práctica mantiene permisos abiertos para facilitar el laboratorio. Requiere autenticación y permisos restrictivos antes de un despliegue público.
- `node_modules`, `dist`, los entornos virtuales y la base SQLite local se generan al ejecutar los proyectos y no se publican.

## Autoría académica

Trabajo realizado para el curso **Desarrollo de Aplicaciones Empresariales**.
