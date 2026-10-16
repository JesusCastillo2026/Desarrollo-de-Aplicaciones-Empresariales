from rest_framework import serializers
from .models import (
    Cita, HistorialMedico, Medicamento, Paciente, PacienteServicio,
    Propietario, Servicio, Veterinario,
)


class PacienteSerializer(serializers.ModelSerializer):
    """Serializer del recurso simple con validación de regla de negocio."""

    class Meta:
        model = Paciente
        fields = ["id", "propietario", "nombre", "especie", "raza", "edad", "peso"]

    def validate_peso(self, value):
        if value <= 0:
            raise serializers.ValidationError("El peso debe ser mayor que cero.")
        return value


class PropietarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propietario
        fields = ["id", "nombres", "apellidos", "dni", "telefono", "direccion"]


class MedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamento
        fields = ["id", "nombre", "descripcion", "stock", "precio"]


class VeterinarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veterinario
        fields = ["id", "nombre_completo", "especialidad", "colegiatura"]


class HistorialMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialMedico
        fields = ["id", "paciente", "alergias", "peso_actual"]


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ["id", "nombre", "duracion_minutos", "precio", "cupos_disponibles"]


class PropietarioResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propietario
        fields = ["id", "nombres", "apellidos"]


class PacienteResumenSerializer(serializers.ModelSerializer):
    propietario = PropietarioResumenSerializer(read_only=True)

    class Meta:
        model = Paciente
        fields = ["id", "nombre", "especie", "raza", "peso", "propietario"]


class ServicioResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ["id", "nombre", "duracion_minutos", "precio"]


class PacienteServicioSerializer(serializers.ModelSerializer):
    """Lectura anidada de la atención, el paciente y el servicio."""

    paciente = PacienteResumenSerializer(read_only=True)
    servicio = ServicioResumenSerializer(read_only=True)

    class Meta:
        model = PacienteServicio
        fields = ["id", "paciente", "servicio", "cantidad", "monto", "estado", "fecha_realizacion"]


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = ["id", "paciente", "fecha_hora", "motivo"]
