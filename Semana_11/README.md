# Semana 11 — Comunicación entre componentes

Desarrollo del Laboratorio 11 para practicar comunicación de datos y eventos en React. El trabajo se divide en un mini catálogo con carrito y un panel administrativo de pacientes para la clínica veterinaria.

## Contenido

- `frontend/src/practica/`: catálogo, filtro compartido, carrito, aviso temporal y datos de cafetería.
- `frontend/src/components/`: panel administrativo con estado elevado, listado, filas, formulario controlado y resumen derivado.
- `frontend/src/App.jsx`: navegación entre las dos partes de la práctica.

## Ejecución

Requisito: Node.js 20.19 o superior.

```powershell
cd Semana_11/frontend
npm install
npm run dev
```

Abrir la URL local que muestre Vite (normalmente `http://localhost:5173/`). Para revisar el proyecto:

```powershell
npm run lint
npm run build
```

## Comunicación implementada

`Practica` y `PanelPacientes` mantienen el estado compartido. Entregan valores y registros a los componentes hijos mediante props; reciben acciones a través de callbacks como `onAgregar`, `onQuitar`, `onGuardar`, `onEliminar` y `onAlternarEstado`. Las listas se actualizan creando arreglos nuevos con spread, `map()` y `filter()`.

El carrito obtiene unidades y total con `reduce()` sin duplicar esos datos en estado. `useEffect` sincroniza el título de la pestaña con las unidades/registros y limpia el temporizador del aviso al desmontar o cambiar el nombre.

## Alcance

Los registros de ejemplo se mantienen en memoria y se reinician al recargar. No se consume la API ni se persiste en Django; esa integración está prevista para la Semana 12. Consulta el [informe del laboratorio](../Documentos%201-16/Laboratorio%2011%20-%20Comunicaci%C3%B3n%20entre%20componentes.pdf) para objetivos, decisiones y extractos explicados.
