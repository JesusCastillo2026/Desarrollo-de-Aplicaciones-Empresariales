from django.db import models

# 1. Entidad Independiente: Medicamento
class Medicamento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=200)
    stock = models.IntegerField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.nombre} (Stock: {self.stock})"

# 2. Entidad Independiente: Servicio
class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    duracion_minutos = models.IntegerField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.nombre} - S/. {self.precio}"

# 3. Entidad Independiente: Veterinario
class Veterinario(models.Model):
    nombre_completo = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=80)
    colegiatura = models.CharField(max_length=20)

    def __str__(self):
        return f"Dr. {self.nombre_completo} ({self.especialidad})"

# 4. Entidad Principal (1): Propietario
class Propietario(models.Model):
    nombres = models.CharField(max_length=80)
    apellidos = models.CharField(max_length=80)
    dni = models.CharField(max_length=8, unique=True)
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.nombres} {self.apellidos} (DNI: {self.dni})"

# 5. Entidad Dependiente (N): Paciente
class Paciente(models.Model):
    propietario = models.ForeignKey(Propietario, on_delete=models.CASCADE, related_name='pacientes')
    nombre = models.CharField(max_length=50)
    especie = models.CharField(max_length=30)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    peso = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.nombre} ({self.especie}) - Dueño: {self.propietario.nombres}"