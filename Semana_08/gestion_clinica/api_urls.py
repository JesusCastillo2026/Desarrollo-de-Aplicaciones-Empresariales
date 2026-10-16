from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    CitaViewSet, HistorialMedicoViewSet, MedicamentoViewSet,
    PacienteDetailAPIView, PacienteListCreateAPIView,
    PacienteServicioViewSet, PacienteViewSet, PropietarioViewSet,
    ServicioViewSet, VeterinarioViewSet,
)

router = DefaultRouter()
router.register("pacientes", PacienteViewSet, basename="paciente")
router.register("propietarios", PropietarioViewSet, basename="propietario")
router.register("medicamentos", MedicamentoViewSet, basename="medicamento")
router.register("veterinarios", VeterinarioViewSet, basename="veterinario")
router.register("historiales", HistorialMedicoViewSet, basename="historial")
router.register("servicios", ServicioViewSet, basename="servicio")
router.register("citas", CitaViewSet, basename="cita")
router.register("atenciones", PacienteServicioViewSet, basename="atencion")

urlpatterns = [
    # URLs genéricas del ejercicio 4; el router es la ruta final principal.
    path("genericos/pacientes/", PacienteListCreateAPIView.as_view(), name="paciente-lista-generica"),
    path("genericos/pacientes/<int:pk>/", PacienteDetailAPIView.as_view(), name="paciente-detalle-generico"),
    *router.urls,
]
