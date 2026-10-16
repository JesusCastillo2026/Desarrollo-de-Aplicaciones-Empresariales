from django.shortcuts import render, redirect, get_object_or_404
from .models import Propietario, Paciente, Medicamento, Servicio, Veterinario, PacienteServicio
from .forms import PropietarioForm, PacienteForm, PacienteServicioForm

def listar_pacientes(request):
    pacientes = Paciente.objects.select_related('propietario', 'historial').prefetch_related(
        'pacienteservicio_set__servicio'
    ).all()
    
    propietarios = Propietario.objects.all()
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
            return redirect('/')
    else:
        form = PropietarioForm()
    return render(request, 'gestion_clinica/crear_propietario.html', {'form': form})

def crear_paciente(request):
    if request.method == 'POST':
        form = PacienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
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
        return redirect('/')
    return render(request, 'gestion_clinica/eliminar_paciente.html', {'paciente': paciente})

def reporte_relaciones(request):
    pacientes = Paciente.objects.select_related('propietario', 'historial').prefetch_related(
        'citas', 
        'pacienteservicio_set__servicio'
    ).all()
    
    return render(request, 'gestion_clinica/reporte_relaciones.html', {'pacientes': pacientes})

def registrar_atencion(request):
    if request.method == 'POST':
        form = PacienteServicioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = PacienteServicioForm()
    return render(request, 'gestion_clinica/formulario_basico.html', {'form': form, 'titulo': 'Registrar Atención (N:M)'})

def editar_atencion(request, id):
    atencion = get_object_or_404(PacienteServicio, id=id)
    if request.method == 'POST':
        form = PacienteServicioForm(request.POST, instance=atencion)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = PacienteServicioForm(instance=atencion)
    return render(request, 'gestion_clinica/formulario_basico.html', {'form': form, 'titulo': 'Editar Atención'})

def eliminar_atencion(request, id):
    atencion = get_object_or_404(PacienteServicio, id=id)
    if request.method == 'POST':
        atencion.delete()
        return redirect('/')
    return render(request, 'gestion_clinica/eliminar_basico.html', {'objeto': atencion, 'titulo': 'Eliminar Atención'})