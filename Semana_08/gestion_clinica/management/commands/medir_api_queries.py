from django.core.management.base import BaseCommand
from django.db import connection, reset_queries
from gestion_clinica.models import PacienteServicio
from gestion_clinica.serializers import PacienteServicioSerializer


class Command(BaseCommand):
    help = "Compara consultas de la serialización anidada con y sin select_related."

    def handle(self, *args, **options):
        # La carga de objetos y la serialización se incluyen en la medición.
        reset_queries()
        atenciones = list(PacienteServicio.objects.all())
        PacienteServicioSerializer(atenciones, many=True).data
        sin_optimizar = len(connection.queries)

        reset_queries()
        atenciones_optimizadas = list(
            PacienteServicio.objects.select_related(
                "paciente", "paciente__propietario", "servicio"
            )
        )
        PacienteServicioSerializer(atenciones_optimizadas, many=True).data
        optimizadas = len(connection.queries)

        self.stdout.write(f"Atenciones medidas: {len(atenciones)}")
        self.stdout.write(f"Consultas sin optimizar: {sin_optimizar}")
        self.stdout.write(f"Consultas optimizadas: {optimizadas}")
