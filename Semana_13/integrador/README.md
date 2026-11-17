# Aplicación integradora — clínica veterinaria

La Parte 2 se vincula con la clínica desarrollada en las Semanas 8–12 de este mismo repositorio. No se duplican el backend ni los modelos: la base existente conserva el proyecto Django `core`, la app `gestion_clinica`, su API REST y el frontend React conectado con Axios.

- Backend en uso: [Semana 12/backend](../../Semana_12/backend/).
- Frontend en uso: [Semana 12/frontend](../../Semana_12/frontend/).
- Las rutas `/api/pacientes/`, `/api/propietarios/`, `/api/citas/`, `/api/servicios/` y otras están configuradas por DRF.
- La carpeta `frontend/src/pages` de esta entrega es el espacio inicial de pantallas del panel. La API de clínica conserva sus endpoints existentes.
- Reglas de negocio, requisitos, mapa de módulos y operación principal se documentan en [README del laboratorio](../README.md).

Autenticación y autorización por rol siguen pendientes en el backend actual; por ello los roles y requisitos de permisos se especifican como diseño futuro, no como capacidad terminada.
