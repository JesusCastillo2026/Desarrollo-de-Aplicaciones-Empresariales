from django.shortcuts import render, redirect, get_object_or_404
from .models import Propietario, Paciente, Medicamento, Servicio, Veterinario, PacienteServicio
from .forms import PropietarioForm, PacienteForm, PacienteServicioForm
from django.db import transaction, connection, reset_queries
from django.db.models import Sum, Count, F
from django.contrib import messages


def listar_pacientes(request):
    # ==========================================
    # EJERCICIO 13: OPTIMIZACIÓN DE CONSULTAS
    # ==========================================

    # 1. MEDICIÓN ANTES DE OPTIMIZAR
    reset_queries()

    pacientes_sin_optimizar = Paciente.objects.all()

    for paciente in pacientes_sin_optimizar:
        _ = paciente.propietario.nombres

        historial = getattr(paciente, 'historial', None)
        if historial:
            _ = historial.alergias

        for atencion in paciente.pacienteservicio_set.all():
            _ = atencion.servicio.nombre

    consultas_antes = len(connection.queries)

    print(
        f"\n[EJERCICIO 13 - ANTES] "
        f"Consultas ejecutadas: {consultas_antes}"
    )

    # 2. MEDICIÓN DESPUÉS DE OPTIMIZAR
    reset_queries()

    pacientes = (
        Paciente.objects
        .select_related('propietario', 'historial')
        .prefetch_related('pacienteservicio_set__servicio')
        .all()
    )

    for paciente in pacientes:
        _ = paciente.propietario.nombres

        historial = getattr(paciente, 'historial', None)
        if historial:
            _ = historial.alergias

        for atencion in paciente.pacienteservicio_set.all():
            _ = atencion.servicio.nombre

    consultas_despues = len(connection.queries)

    print(
        f"[EJERCICIO 13 - DESPUÉS] "
        f"Consultas ejecutadas: {consultas_despues}"
    )

    # EJERCICIO 12: QuerySet personalizado (View 1)
    pacientes_filtrados = Paciente.objects.solo_perros().pesados()

    propietarios = Propietario.objects.all()
    medicamentos = Medicamento.objects.filter(stock__gt=0)
    servicios = Servicio.objects.order_by('precio')
    veterinarios = Veterinario.objects.all()

    contexto = {
        'pacientes': pacientes,
        'pacientes_filtrados': pacientes_filtrados,
        'propietarios': propietarios,
        'medicamentos': medicamentos,
        'servicios': servicios,
        'veterinarios': veterinarios,
        'consultas_antes': consultas_antes,
        'consultas_despues': consultas_despues,
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
    return render(
        request,
        'gestion_clinica/editar_paciente.html',
        {'form': form, 'paciente': paciente}
    )


def eliminar_paciente(request, id):
    paciente = get_object_or_404(Paciente, id=id)
    if request.method == 'POST':
        paciente.delete()
        return redirect('/')
    return render(
        request,
        'gestion_clinica/eliminar_paciente.html',
        {'paciente': paciente}
    )


def reporte_relaciones(request):
    pacientes = (
        Paciente.objects
        .select_related('propietario', 'historial')
        .prefetch_related('citas', 'pacienteservicio_set__servicio')
        .all()
    )

    return render(
        request,
        'gestion_clinica/reporte_relaciones.html',
        {'pacientes': pacientes}
    )


def registrar_atencion(request):
    if request.method == 'POST':
        form = PacienteServicioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = PacienteServicioForm()

    return render(
        request,
        'gestion_clinica/formulario_basico.html',
        {'form': form, 'titulo': 'Registrar Atención (N:M)'}
    )


def editar_atencion(request, id):
    atencion = get_object_or_404(PacienteServicio, id=id)

    if request.method == 'POST':
        form = PacienteServicioForm(request.POST, instance=atencion)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = PacienteServicioForm(instance=atencion)

    return render(
        request,
        'gestion_clinica/formulario_basico.html',
        {'form': form, 'titulo': 'Editar Atención'}
    )


def eliminar_atencion(request, id):
    atencion = get_object_or_404(PacienteServicio, id=id)

    if request.method == 'POST':
        atencion.delete()
        return redirect('/')

    return render(
        request,
        'gestion_clinica/eliminar_basico.html',
        {'objeto': atencion, 'titulo': 'Eliminar Atención'}
    )


def registrar_servicio(request):
    pacientes = Paciente.objects.all()
    servicios = Servicio.objects.all()

    if request.method == 'POST':
        paciente_id = request.POST.get('paciente')
        servicio_id = request.POST.get('servicio')

        try:
            cantidad = int(request.POST.get('cantidad', 1))
            monto = float(request.POST.get('monto', 0.00))

            if cantidad <= 0:
                raise ValueError("La cantidad debe ser mayor a 0.")

            with transaction.atomic():
                servicio = (
                    Servicio.objects
                    .select_for_update()
                    .get(id=servicio_id)
                )

                paciente = Paciente.objects.get(id=paciente_id)

                if servicio.cupos_disponibles < cantidad:
                    raise ValueError(
                        f"No hay suficientes cupos para {servicio.nombre}. "
                        f"Solo quedan {servicio.cupos_disponibles} disponibles."
                    )

                PacienteServicio.objects.create(
                    paciente=paciente,
                    servicio=servicio,
                    cantidad=cantidad,
                    monto=monto,
                    estado='PENDIENTE'
                )

                servicio.cupos_disponibles = (
                    F('cupos_disponibles') - cantidad
                )
                servicio.save(update_fields=['cupos_disponibles'])

            messages.success(
                request,
                f"¡Servicio registrado correctamente! "
                f"Se descontaron {cantidad} cupo(s)."
            )

            return redirect('registrar_servicio')

        except ValueError as e:
            messages.error(request, str(e))

        except (Paciente.DoesNotExist, Servicio.DoesNotExist):
            messages.error(
                request,
                "El paciente o servicio seleccionado no existe."
            )

        except Exception as e:
            messages.error(
                request,
                f"Ocurrió un error inesperado en la transacción: {e}"
            )

    return render(
        request,
        'gestion_clinica/registrar_servicio.html',
        {
            'pacientes': pacientes,
            'servicios': servicios
        }
    )


def reporte_agregaciones(request):
    # EJERCICIO 11: aggregate()
    total = PacienteServicio.objects.aggregate(
        total_recaudado=Sum(F('cantidad') * F('monto'))
    )

    # EJERCICIO 12: QuerySet personalizado (View 2)
    pacientes_anotados = (
        Paciente.objects
        .solo_perros()
        .pesados()
        .annotate(num_servicios=Count('pacienteservicio'))
        .order_by('-num_servicios')
    )

    estados_agrupados = (
        PacienteServicio.objects
        .values('estado')
        .annotate(total=Count('id'))
        .order_by('-total')
    )

    contexto = {
        'total_recaudado': total['total_recaudado'],
        'pacientes_anotados': pacientes_anotados,
        'estados_agrupados': estados_agrupados
    }

    return render(
        request,
        'gestion_clinica/reporte_agregaciones.html',
        contexto
    )
