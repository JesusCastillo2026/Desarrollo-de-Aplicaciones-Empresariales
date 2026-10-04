# Semana 07 - Laboratorio 07: ORM avanzado

## Proyecto
Clínica Veterinaria desarrollada con Django.

## Objetivo
Aplicar funcionalidades avanzadas del ORM de Django sobre las entidades y relaciones desarrolladas en las semanas anteriores.

## Funcionalidades implementadas

### Transacciones y expresiones F()
Se implementó una operación para registrar servicios de los pacientes mediante `transaction.atomic()`. La operación crea un registro en `PacienteServicio` y descuenta simultáneamente los `cupos_disponibles` del modelo `Servicio` utilizando una expresión `F()`. También se comprobó el rollback ante errores para evitar registros incompletos.

### Reportes con aggregate() y annotate()
Se implementaron reportes utilizando:
- `aggregate()` para calcular el total global recaudado.
- `annotate()` para calcular la cantidad de servicios relacionados por paciente.
- `values().annotate()` para agrupar registros por estado: PENDIENTE, PAGADO y DEVUELTO.

### QuerySet personalizado
Se creó `PacienteQuerySet` con dos métodos encadenables:
- `solo_perros()`
- `pesados()`

El QuerySet fue asignado al modelo `Paciente` mediante `as_manager()` y utilizado en más de una View.

### Optimización de consultas
Se midió el problema N+1 con `reset_queries()` y `connection.queries`. Se optimizó el listado de pacientes usando:
- `select_related()` para las relaciones ForeignKey y OneToOne.
- `prefetch_related()` para las relaciones múltiples.

## Entidades principales trabajadas
- Paciente
- Propietario
- HistorialMedico
- Cita
- Servicio
- Veterinario
- PacienteServicio

## Tecnologías
- Python
- Django 5
- SQLite
- HTML / Bootstrap
- Git y GitHub
