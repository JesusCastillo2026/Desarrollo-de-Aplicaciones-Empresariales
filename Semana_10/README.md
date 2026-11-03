# Laboratorio Semana 10 — Componentes, props, estado y eventos

## Problemática

La interfaz de la clínica veterinaria construida en la Semana 9 concentraba casi toda su presentación dentro de `App.jsx`. En esta semana se reorganiza en componentes funcionales reutilizables y se agregan interacciones con `useState`, eventos JSX, búsquedas controladas y un formulario validado.

## Requisitos funcionales

* **COMPONENTES Y PROPS:** tarjetas, listas y relaciones se separan en archivos bajo `frontend/src/components/`; los datos pasan del componente padre al hijo mediante props.
* **COMPOSICIÓN:** `Tarjeta` presenta un título y recibe su contenido mediante `children`.
* **ESTADO Y EVENTOS:** cada tarjeta de medicamento maneja su propio contador con `useState` y `onClick`; los botones se desactivan si el stock es cero.
* **BÚSQUEDA CONTROLADA:** los campos usan `value` y `onChange` para filtrar por nombre sin distinguir mayúsculas.
* **FORMULARIO:** el registro de paciente usa `onSubmit`, `preventDefault`, validación del nombre y peso positivo, y actualiza la lista sin mutar el arreglo previo.
* **RELACIONES:** atenciones y servicios se muestran dentro de tarjetas de paciente con totales calculados.

## Componentes implementados

| Archivo | Responsabilidad |
|---|---|
| `Tarjeta.jsx` | Contenedor reutilizable con `titulo` y `children`. |
| `MedicamentoTarjeta.jsx` | Presenta medicamento, stock y contador independiente. |
| `MedicamentoLista.jsx` | Busca medicamentos y dibuja una tarjeta por registro con `map()` y `key`. |
| `PacienteTarjeta.jsx` | Muestra datos de paciente y tutor recibidos por props. |
| `PacienteLista.jsx` | Controla la búsqueda y compone tarjetas de paciente. |
| `PacienteFormulario.jsx` | Controla los campos, valida y notifica el registro nuevo. |
| `AtencionTarjeta.jsx` | Muestra atenciones anidadas y calcula el monto total. |
| `AtencionLista.jsx` | Agrupa las atenciones por paciente y genera las tarjetas. |
| `VeterinarioLista.jsx` | Presenta la lista del equipo médico mediante componentes hijos. |
| `data.js` | Mantiene los arreglos de práctica con la forma de la API de Semana 08. |

## Ejecución

Se requiere Node.js 20.19 o superior y npm.

```bash
cd frontend
npm install
npm run dev
```

Para revisar el código y compilar la versión de producción:

```bash
npm run lint
npm run build
```

## Reglas de estado y validación

Las props son datos de entrada y se tratan como solo lectura. Cuando el usuario cambia un valor, el componente propietario actualiza estado con el setter de `useState`. La lista de pacientes se actualiza creando un arreglo nuevo (`[nuevoPaciente, ...actuales]`), sin usar `push()`.

El formulario reutiliza la regla de la API de Semana 08: el peso debe ser mayor que cero. El alta y los contadores se guardan solo en el estado de React durante la sesión actual. Para persistir un registro en Django aún falta enviar una solicitud HTTP a la API, manejar su respuesta y actualizar la interfaz con el registro confirmado por el servidor.

## Versionado

Los archivos `.gitignore` excluyen `node_modules/` y `dist/`; ambos directorios se regeneran localmente mediante npm.
