from django import forms
from .models import Propietario, Paciente, Medicamento, Servicio, Veterinario

class PropietarioForm(forms.ModelForm):
    class Meta:
        model = Propietario
        fields = ['nombres', 'apellidos', 'dni', 'telefono', 'direccion']

class PacienteForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['propietario', 'nombre', 'especie', 'raza', 'edad', 'peso']