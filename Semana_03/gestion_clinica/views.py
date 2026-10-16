from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import render, redirect
from .models import Propietario, Paciente, Medicamento, Servicio, Veterinario
from .forms import PropietarioForm, PacienteForm

def listar_pacientes(request):
    pacientes = Paciente.objects.all()
    propietarios = Propietario.objects.order_by('apellidos')
    medicamentos = Medicamento.objects.filter(stock__gt=0)
    servicios = Servicio.objects.order_by('precio')
    veterinarios = Veterinario.objects.all()

    contexto = {
        'pacientes': pacientes,
        'propietarios': propietarios,
        'medicamentos': medicamentos,
        'servicios': servicios,
        'veterinarios': veterinarios
    }
    return render(request, 'gestion_clinica/listar.html', contexto)

def crear_propietario(request):
    if request.method == 'POST':
        form = PropietarioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_clinica')
    else:
        form = PropietarioForm()
    return render(request, 'gestion_clinica/crear_propietario.html', {'form': form})

def crear_paciente(request):
    if request.method == 'POST':
        form = PacienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_clinica')
    else:
        form = PacienteForm()
    return render(request, 'gestion_clinica/crear_paciente.html', {'form': form})

def editar_paciente(request, id):
    paciente = get_object_or_404(Paciente, id=id)
    if request.method == 'POST':
        form = PacienteForm(request.POST, instance=paciente)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = PacienteForm(instance=paciente)
    return render(request, 'gestion_clinica/editar_paciente.html', {'form': form, 'paciente': paciente})

def eliminar_paciente(request, id):
    paciente = get_object_or_404(Paciente, id=id)
    if request.method == 'POST':
        paciente.delete()
        return redirect('listar_clinica')
    return render(request, 'gestion_clinica/eliminar_paciente.html', {'paciente': paciente})