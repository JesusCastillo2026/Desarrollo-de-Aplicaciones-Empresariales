# Backend del laboratorio 12

Esta carpeta contiene la API Django de la Semana 8, reutilizada para practicar consumo AJAX desde React. Se conserva el modelo clínico completo, sus migraciones y rutas. La configuración agrega CORS para el servidor Vite.

## Inicio rápido

Desde esta carpeta:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_lab12
python manage.py runserver
```

La aplicación expone la API bajo `/api/`. El recurso usado por el frontend es `/api/pacientes/`; los propietarios se consultan en `/api/propietarios/`. La búsqueda usa `?search=`.

El endpoint mantiene permisos de desarrollo abiertos. No usar en producción sin autenticación y permisos adecuados.
