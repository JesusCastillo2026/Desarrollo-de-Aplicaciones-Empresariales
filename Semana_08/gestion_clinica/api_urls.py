from rest_framework.routers import DefaultRouter
from .api_views import (
    CitaViewSet, HistorialMedicoViewSet, MedicamentoViewSet,
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

urlpatterns = router.urls
