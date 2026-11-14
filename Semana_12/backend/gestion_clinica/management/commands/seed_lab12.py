from django.core.management.base import BaseCommand
from gestion_clinica.models import Paciente, Propietario


class Command(BaseCommand):
    help = "Crea datos de ejemplo para el laboratorio AJAX."

    def handle(self, *args, **options):
        ana, _ = Propietario.objects.get_or_create(
            dni="87654321",
            defaults={
                "nombres": "Ana",
                "apellidos": "Torres",
                "telefono": "999111222",
                "direccion": "Lima",
            },
        )
        luis, _ = Propietario.objects.get_or_create(
            dni="76543210",
            defaults={
                "nombres": "Luis",
                "apellidos": "Rojas",
                "telefono": "999333444",
                "direccion": "Lima",
            },
        )
        samples = [
            (ana, "Luna", "Perro", "Labrador", 4, "18.50"),
            (luis, "Michi", "Gato", "Mestizo", 2, "4.20"),
        ]
        for owner, name, species, breed, age, weight in samples:
            Paciente.objects.get_or_create(
                propietario=owner,
                nombre=name,
                defaults={
                    "especie": species,
                    "raza": breed,
                    "edad": age,
                    "peso": weight,
                },
            )
        self.stdout.write(self.style.SUCCESS("Datos de ejemplo listos."))
