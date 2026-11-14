# Semana 12 — AJAX y servicios web

Laboratorio de integración entre React y Django REST Framework. La aplicación consume la API de pacientes de la Semana 8 mediante Axios e implementa estados de carga/error, búsqueda remota y operaciones GET, POST, PATCH y DELETE.

## Estructura

- `frontend/`: aplicación React + Vite con práctica CRUD y panel administrativo.
- `backend/`: copia independiente del proyecto Django de la Semana 8, con CORS habilitado.

## Requisitos

Python 3.10 o posterior, Node.js 20.19 o posterior y npm.

## Iniciar el backend

```powershell
cd Semana_12/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_lab12
python manage.py runserver
```

La API queda disponible en `http://127.0.0.1:8000/api/`. El comando de datos iniciales se puede ejecutar más de una vez sin duplicar los registros de ejemplo.

## Iniciar React

En otra terminal:

```powershell
cd Semana_12/frontend
npm install
npm run dev
```

Abre la dirección mostrada por Vite, normalmente `http://localhost:5173/`. React usa la variable `VITE_API_URL` si está definida; el valor predeterminado es `http://127.0.0.1:8000/api`.

## Endpoints y resultados

| Operación | Endpoint | Respuesta |
|---|---|---|
| Listar y buscar | `GET /api/pacientes/?search=Luna` | `200`, resultados JSON |
| Crear | `POST /api/pacientes/` | `201`, con validación del serializer |
| Editar | `PATCH /api/pacientes/{id}/` | `200`, registro actualizado |
| Eliminar | `DELETE /api/pacientes/{id}/` | `204`; la interfaz también gestiona `404` |
| Propietarios | `GET /api/propietarios/` | `200`, opciones del formulario |

Django autoriza los orígenes locales `http://localhost:5173` y `http://127.0.0.1:5173`. Si Vite usa otro puerto, actualiza `CORS_ALLOWED_ORIGINS` en `backend/core/settings.py`.

## Comprobación del frontend

```powershell
cd Semana_12/frontend
npm run lint
npm run build
```

La API conserva los permisos abiertos del ejercicio para facilitar las pruebas. Úsala con datos de desarrollo; antes de desplegarla públicamente, configura autenticación y permisos.
