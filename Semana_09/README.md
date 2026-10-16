# Laboratorio Semana 09 — React y Vite

## Problemática

La clínica veterinaria necesita una interfaz de usuario dinámica que presente sus pacientes, medicamentos, profesionales y atenciones. En esta semana se construye el cliente con React y Vite y se practican JSX, listas, condiciones, estilos y relaciones anidadas. Los datos se cargan manualmente con la misma forma de los recursos de la API REST desarrollada en la Semana 08; el consumo de la API se realizará en semanas posteriores.

## Requisitos funcionales

* **SETUP:** aplicación React configurada con Vite, scripts de desarrollo, compilación y lint.
* **JSX Y EXPRESIONES:** panel clínico con datos y valores calculados.
* **LISTAS:** renderizado de pacientes, medicamentos, servicios y veterinarios mediante `map()` y claves estables `key`.
* **CONDICIONALES:** estado vacío para búsquedas sin resultados y avisos de inventario por stock.
* **RELACIONES:** atenciones agrupadas por paciente con servicio anidado.
* **PRESENTACIÓN:** diseño responsivo, filtros interactivos y estilos CSS.

## Entidades y relaciones

Los objetos de ejemplo respetan los campos publicados por los serializers de Semana 08: `Paciente`, `Propietario`, `Medicamento`, `Veterinario`, `Servicio` y `PacienteServicio`. La relación de cada paciente con su propietario se resuelve usando el identificador del serializer. Las atenciones contienen los objetos anidados `paciente` y `servicio`, como en la respuesta de la API.

## Estructura del frontend

```text
frontend/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── index.css
```

## Ejecución

Requiere Node.js 20.19 o superior y npm.

```bash
cd frontend
npm install
npm run dev
```

Abre la dirección local que Vite indica en la consola. Para validar el código y generar la compilación de producción:

```bash
npm run lint
npm run build
```

La aplicación Django de la Semana 08 se conserva en esta carpeta de semana. Para levantar por separado el backend, desde `Semana_09/` ejecuta `python manage.py migrate` y `python manage.py runserver`. El cliente de esta semana no realiza peticiones a dicho backend.

## Decisiones de implementación

* Los arreglos de datos están definidos en `src/App.jsx` para aislar el enfoque del laboratorio en el renderizado del frontend.
* Se usan claves `id` en las listas y se convierte el peso decimal con `Number(...).toFixed(2)` para presentarlo de manera uniforme.
* `PacienteServicio` sirve de modelo intermedio para agrupar varias atenciones bajo cada paciente, con datos del servicio, fecha, estado y monto.
* `.gitignore` evita subir `node_modules/`, `dist/`, entornos virtuales, archivos de caché y la base SQLite.