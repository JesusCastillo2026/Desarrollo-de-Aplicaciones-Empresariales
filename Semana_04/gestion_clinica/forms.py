from django import forms
from .models import Propietario, Paciente, Medicamento, Servicio, Veterinario
from .models import PacienteServicio

class PacienteServicioForm(forms.ModelForm):
    class Meta:
        model = PacienteServicio
        fields = ['paciente', 'servicio', 'estado']

class PropietarioForm(forms.ModelForm):
    class Meta:
        model = Propietario
        fields = ['nombres', 'apellidos', 'dni', 'telefono', 'direccion']

class PacienteForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['propietario', 'nombre', 'especie', 'raza', 'edad', 'peso']