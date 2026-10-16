from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, redirect
from .models import mascotas
from .forms import MascotaForm

def listar_mascotas(request):
    return render(request, 'veterinaria/listar.html', {'mascotas': mascotas})

def crear_mascota(request):
    if request.method == 'POST':
        form = MascotaForm(request.POST)
        if form.is_valid():
            mascotas.append(form.cleaned_data)
            return redirect('listar_mascotas')
    else:
        form = MascotaForm()
    return render(request, 'veterinaria/crear.html', {'form': form})