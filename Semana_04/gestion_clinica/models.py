from django.db import models

class Medicamento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=200)
    stock = models.IntegerField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.nombre} (Stock: {self.stock})"

class Veterinario(models.Model):
    nombre_completo = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=80)
    colegiatura = models.CharField(max_length=20)

    def __str__(self):
        return f"Dr. {self.nombre_completo} ({self.especialidad})"

class Propietario(models.Model):
    nombres = models.CharField(max_length=80)
    apellidos = models.CharField(max_length=80)
    dni = models.CharField(max_length=8, unique=True)
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.nombres} {self.apellidos} (DNI: {self.dni})"

# Relación 1:N (Base de la semana 3)
class Paciente(models.Model):
    propietario = models.ForeignKey(Propietario, on_delete=models.CASCADE, related_name='pacientes')
    nombre = models.CharField(max_length=50)
    especie = models.CharField(max_length=30)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    peso = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.nombre

# --- AMPLIACIÓN PARA CUMPLIR LA RÚBRICA ---

# Relación 1:1 (Extensión del paciente)
class HistorialMedico(models.Model):
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE, related_name='historial')
    alergias = models.TextField(blank=True, null=True)
    peso_actual = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    
    def __str__(self):
        return f"Historial de {self.paciente.nombre}"

# Relación N:M (Uso de ManyToManyField con through)
class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    duracion_minutos = models.IntegerField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    pacientes_atendidos = models.ManyToManyField(Paciente, through='PacienteServicio', related_name='servicios_recibidos')

    def __str__(self):
        return f"{self.nombre} - S/. {self.precio}"

# Modelo intermedio para la relación N:M
class PacienteServicio(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    fecha_realizacion = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=50, default='Completado')

    def __str__(self):
        return f"{self.servicio.nombre} a {self.paciente.nombre}"