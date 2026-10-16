# Semana 08 - Laboratorio 08 Django REST Framework

## Proyecto
Clínica Veterinaria desarrollada con Django 5, SQLite y Django REST Framework.

## Objetivo
Exponer los modelos y relaciones existentes como servicios REST en JSON, reutilizando el ORM y el QuerySet personalizado de la Semana 07.

## Recursos y equivalencias
- **Recurso simple:** `Paciente`; el serializer valida que `peso` sea mayor que cero.
- **Recurso con relaciones:** `PacienteServicio` (atención), con `Paciente` y `Servicio` anidados y de solo lectura.
- **Campo de estado:** `PacienteServicio.estado` (PENDIENTE, PAGADO o DEVUELTO), filtrable con `?estado=`.
- **QuerySet reutilizado:** `Paciente.objects.solo_perros().pesados()`, disponible como acción `/api/pacientes/perros-pesados/`.

No se crea un campo de estado adicional: el estado ya existe en el modelo intermedio de la Semana 07. La aplicación no tenía otro campo de estado en Paciente.

## Implementación
- Django REST Framework está agregado a `INSTALLED_APPS` y a `requirements.txt`.
- `serializers.py` contiene serializers para Paciente, Propietario, Medicamento, Veterinario, HistorialMedico, Servicio, PacienteServicio y Cita. La atención anida la información del paciente y del servicio.
- `api_views.py` expone los recursos mediante ModelViewSet y el recurso de atenciones mediante ReadOnlyModelViewSet.
- `api_urls.py` registra los ViewSets con DefaultRouter bajo `/api/`.
- Los pacientes admiten búsqueda y ordenamiento; las atenciones admiten filtro por estado.
- La consulta de atenciones usa `select_related()` para evitar consultas N+1 en la relación anidada.
- Se mantiene el acceso abierto de laboratorio para probar las peticiones. No debe usarse sin autenticación y permisos adecuados en producción.

## Endpoints
| Recurso | URL base | Métodos |
|---|---|---|
| Pacientes | `/api/pacientes/` | GET, POST, PUT, PATCH, DELETE |
| Propietarios | `/api/propietarios/` | GET, POST, PUT, PATCH, DELETE |
| Medicamentos | `/api/medicamentos/` | GET, POST, PUT, PATCH, DELETE |
| Veterinarios | `/api/veterinarios/` | GET, POST, PUT, PATCH, DELETE |
| Historiales | `/api/historiales/` | GET, POST, PUT, PATCH, DELETE |
| Servicios | `/api/servicios/` | GET, POST, PUT, PATCH, DELETE |
| Citas | `/api/citas/` | GET, POST, PUT, PATCH, DELETE |
| Atenciones | `/api/atenciones/` | GET |

El router también presenta el índice navegable en `/api/`.

## Filtros y acción
- Búsqueda: `/api/pacientes/?search=Max`
- Orden: `/api/pacientes/?ordering=-peso`
- Estado: `/api/atenciones/?estado=PAGADO`
- Parámetros combinados: `/api/pacientes/?search=Max&ordering=nombre`
- Acción del QuerySet: `/api/pacientes/perros-pesados/`

## Validación de la API
Ejecutar las pruebas automatizadas desde esta carpeta:

```bash
python manage.py test gestion_clinica
```

Las pruebas verifican los códigos HTTP 200, 201, 400, 404 y 204, la validación de peso, filtros, acción personalizada y la cantidad de consultas de la serialización anidada. La medición en la prueba crea tres atenciones de ejemplo: sin optimizar produce 10 consultas (una consulta de lista y tres por atención); con `select_related()` produce 1 consulta. Esos valores son para ese conjunto de prueba; el comando de medición calcula los valores reales de la base de datos local:

```bash
python manage.py medir_api_queries
```

## Respuestas conceptuales del laboratorio
- Un `ModelSerializer` convierte una instancia en un diccionario JSON y también valida los datos entrantes. Se usa `many=True` cuando se serializa un QuerySet porque se envían varias instancias.
- `is_valid()` ejecuta las reglas del serializer. Los datos aceptados quedan en `validated_data`; los rechazados se explican en `errors`. Después de validar, `save()` crea o actualiza el registro.
- DefaultRouter crea automáticamente rutas de lista y detalle y vincula GET/POST/PATCH/PUT/DELETE a las acciones del ViewSet.
- La API responde datos y códigos HTTP para que otro cliente los consuma; un Template devuelve HTML listo para presentar en el navegador. El Admin es una interfaz interna de gestión y no sustituye una API pública.
- La API queda abierta en esta práctica porque no se han configurado permisos de autenticación. Antes de publicar el servicio deben habilitarse autenticación, permisos por rol, validación de datos, HTTPS y límites de acceso.

## Ejercicios 1 al 14
1. Se habilitó DRF en settings y requirements. Se eligió Paciente como recurso simple y PacienteServicio como recurso relacionado; estado y QuerySet son los ya añadidos en Semana 07.
2. `PacienteSerializer(paciente).data` serializa un objeto; `PacienteSerializer(Paciente.objects.all(), many=True).data` serializa el conjunto completo.
3. El peso debe ser positivo. Un peso de 8.50 kg es válido y uno de 0.00 kg se rechaza con un error de validación.
4. Las vistas genéricas están disponibles como demostración en /api/genericos/pacientes/ y /api/genericos/pacientes/<id>/. El API final del ejercicio 5 usa el router en /api/pacientes/.
5. `DefaultRouter` genera rutas de colección y detalle para cada registro sin escribir manualmente cada patrón.
6. Las pruebas cubren GET lista/detalle (200), POST válido (201), POST inválido (400), PATCH (200), DELETE (204) y detalle inexistente (404).
7. La atención anida paciente y servicio. La consulta se optimiza con `select_related('paciente__propietario', 'servicio')`; la prueba mide la diferencia con tres atenciones.
8. Paciente tiene SearchFilter y OrderingFilter; atención filtra por estado; la acción `perros-pesados` reutiliza ambos métodos del QuerySet.
9. La investigación aplicada es la clínica veterinaria. Se eligieron Paciente, PacienteServicio, estado y `solo_perros().pesados()`.
10. Hay serializers ModelSerializer para las entidades de la clínica y validación propia en peso de Paciente.
11. Los ViewSets se registran en un DefaultRouter. Las pruebas automatizadas comprueban los códigos solicitados.
12. PacienteServicio entrega relaciones anidadas y su queryset evita consultas repetidas.
13. Se implementaron búsqueda, ordenamiento, filtro por estado y acción del QuerySet; los ejemplos están en la tabla de URLs.
14. Se actualizaron este README, el README general y requirements.txt.

## Ejecutar el proyecto
```bash
python -m venv venv
venv\\Scripts\\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Abrir `http://127.0.0.1:8000/api/`.
