from django import forms

class MascotaForm(forms.Form):
    nombre = forms.CharField(label="Nombre de la mascota", max_length=50)
    especie = forms.CharField(label="Especie", max_length=50)
    raza = forms.CharField(label="Raza", max_length=50)
    peso = forms.DecimalField(label="Peso (kg)", max_digits=5, decimal_places=2)