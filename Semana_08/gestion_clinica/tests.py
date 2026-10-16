from django.test import TestCase
from django.db import connection, reset_queries
from rest_framework.test import APITestCase

from .models import Paciente, PacienteServicio, Propietario, Servicio
from .serializers import PacienteServicioSerializer


class APIEndpointTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.propietario = Propietario.objects.create(
            nombres="Ana", apellidos="Rojas", dni="12345678",
            telefono="999111222", direccion="Lima",
        )
        cls.paciente = Paciente.objects.create(
            propietario=cls.propietario, nombre="Max", especie="Perro",
            raza="Mestizo", edad=4, peso="18.50",
        )
        cls.servicio = Servicio.objects.create(
            nombre="Control", duracion_minutos=30, precio="45.00",
            cupos_disponibles=10,
        )
        PacienteServicio.objects.create(
            paciente=cls.paciente, servicio=cls.servicio,
            cantidad=1, monto="45.00", estado="PAGADO",
        )

    def test_crud_and_http_status_codes(self):
        response = self.client.get("/api/pacientes/")
        self.assertEqual(response.status_code, 200)

        valid = {
            "propietario": self.propietario.pk,
            "nombre": "Luna", "especie": "Gato", "raza": "Criollo",
            "edad": 2, "peso": "4.25",
        }
        created = self.client.post("/api/pacientes/", valid, format="json")
        self.assertEqual(created.status_code, 201)
        patient_id = created.data["id"]

        invalid = {**valid, "nombre": "Nube", "peso": "0"}
        rejected = self.client.post("/api/pacientes/", invalid, format="json")
        self.assertEqual(rejected.status_code, 400)
        self.assertIn("peso", rejected.data)

        detail = self.client.get(f"/api/pacientes/{patient_id}/")
        self.assertEqual(detail.status_code, 200)

        updated = self.client.patch(
            f"/api/pacientes/{patient_id}/", {"peso": "5.00"}, format="json"
        )
        self.assertEqual(updated.status_code, 200)

        deleted = self.client.delete(f"/api/pacientes/{patient_id}/")
        self.assertEqual(deleted.status_code, 204)

        missing = self.client.get("/api/pacientes/99999/")
        self.assertEqual(missing.status_code, 404)

    def test_search_ordering_custom_action_and_state_filter(self):
        self.assertEqual(
            self.client.get("/api/pacientes/?search=Max").status_code, 200
        )
        self.assertEqual(
            self.client.get("/api/pacientes/?ordering=-peso").status_code, 200
        )
        heavy_dogs = self.client.get("/api/pacientes/perros-pesados/")
        self.assertEqual(heavy_dogs.status_code, 200)
        self.assertEqual(len(heavy_dogs.data), 1)

        paid = self.client.get("/api/atenciones/?estado=PAGADO")
        pending = self.client.get("/api/atenciones/?estado=PENDIENTE")
        self.assertEqual(paid.status_code, 200)
        self.assertEqual(len(paid.data), 1)
        self.assertEqual(len(pending.data), 0)

    def test_nested_read_only_endpoint(self):
        response = self.client.get("/api/atenciones/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["paciente"]["propietario"]["nombres"], "Ana")
        created = self.client.post(
            "/api/atenciones/",
            {"paciente": self.paciente.pk, "servicio": self.servicio.pk},
            format="json",
        )
        self.assertEqual(created.status_code, 405)


class APIQueryOptimizationTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        owner = Propietario.objects.create(
            nombres="Luis", apellidos="Paredes", dni="87654321",
            telefono="999222333", direccion="Arequipa",
        )
        service = Servicio.objects.create(
            nombre="Vacunación", duracion_minutos=20, precio="30.00",
            cupos_disponibles=20,
        )
        for index in range(3):
            patient = Paciente.objects.create(
                propietario=owner, nombre=f"Perro {index}", especie="Perro",
                raza="Mestizo", edad=index + 1, peso="16.00",
            )
            PacienteServicio.objects.create(
                paciente=patient, servicio=service, cantidad=1,
                monto="30.00", estado="PENDIENTE",
            )

    def test_select_related_reduces_nested_serialization_queries(self):
        reset_queries()
        items = list(PacienteServicio.objects.all())
        PacienteServicioSerializer(items, many=True).data
        before = len(connection.queries)

        reset_queries()
        items = list(PacienteServicio.objects.select_related(
            "paciente", "paciente__propietario", "servicio"
        ))
        PacienteServicioSerializer(items, many=True).data
        after = len(connection.queries)

        self.assertEqual(len(items), 3)
        self.assertEqual(before, 10)
        self.assertEqual(after, 1)
