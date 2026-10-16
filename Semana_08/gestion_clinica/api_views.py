from rest_framework import filters, generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    Cita, HistorialMedico, Medicamento, Paciente, PacienteServicio,
    Propietario, Servicio, Veterinario,
)
from .serializers import (
    CitaSerializer, HistorialMedicoSerializer, MedicamentoSerializer,
    PacienteSerializer, PacienteServicioSerializer, PropietarioSerializer,
    ServicioSerializer, VeterinarioSerializer,
)


# Vistas genéricas del ejercicio 4, conservadas bajo /api/genericos/ como demostración.
class PacienteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Paciente.objects.select_related("propietario").all()
    serializer_class = PacienteSerializer


class PacienteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paciente.objects.select_related("propietario").all()
    serializer_class = PacienteSerializer


class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.select_related("propietario").all()
    serializer_class = PacienteSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre", "especie", "raza", "propietario__nombres", "propietario__apellidos"]
    ordering_fields = ["nombre", "especie", "edad", "peso"]
    ordering = ["nombre"]

    @action(detail=False, methods=["get"], url_path="perros-pesados")
    def perros_pesados(self, request):
        pacientes = self.get_queryset().solo_perros().pesados()
        serializer = self.get_serializer(pacientes, many=True)
        return Response(serializer.data)


class PropietarioViewSet(viewsets.ModelViewSet):
    queryset = Propietario.objects.all().order_by("apellidos", "nombres")
    serializer_class = PropietarioSerializer


class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all().order_by("nombre")
    serializer_class = MedicamentoSerializer


class VeterinarioViewSet(viewsets.ModelViewSet):
    queryset = Veterinario.objects.all().order_by("nombre_completo")
    serializer_class = VeterinarioSerializer


class HistorialMedicoViewSet(viewsets.ModelViewSet):
    queryset = HistorialMedico.objects.select_related("paciente").all()
    serializer_class = HistorialMedicoSerializer


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all().order_by("nombre")
    serializer_class = ServicioSerializer


class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.select_related("paciente").all()
    serializer_class = CitaSerializer


class PacienteServicioViewSet(viewsets.ReadOnlyModelViewSet):
    """Atenciones de solo lectura, con relaciones precargadas para el JSON."""

    serializer_class = PacienteServicioSerializer

    def get_queryset(self):
        queryset = PacienteServicio.objects.select_related(
            "paciente",
            "paciente__propietario",
            "servicio",
        ).all()
        estado = self.request.query_params.get("estado")
        if estado:
            queryset = queryset.filter(estado__iexact=estado.strip())
        return queryset
