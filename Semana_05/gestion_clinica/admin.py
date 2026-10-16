from django.contrib import admin
from .models import Propietario, Paciente, Medicamento, Servicio, Veterinario, HistorialMedico, Cita, PacienteServicio

# 1. Inlines (Ejercicios 11 y 12)
class HistorialMedicoInline(admin.StackedInline):
    model = HistorialMedico
    can_delete = False
    verbose_name_plural = 'Historial Médico'

class PacienteServicioInline(admin.TabularInline):
    model = PacienteServicio
    extra = 1

# 2. ModelAdmins (Ejercicio 10: Mínimo 3 modelos personalizados)
@admin.register(Propietario)
class PropietarioAdmin(admin.ModelAdmin):
    list_display = ('nombres', 'apellidos', 'telefono')
    search_fields = ('nombres', 'apellidos')

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'especie', 'raza')
    search_fields = ('nombre', 'especie')
    list_filter = ('especie',)
    inlines = [HistorialMedicoInline, PacienteServicioInline]

@admin.register(Medicamento)
class MedicamentoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'stock', 'precio')
    list_filter = ('stock',) # Filtro útil para ver cuáles están agotados

# 3. Registro simple del resto (Ejercicio 9)
admin.site.register(Servicio)
admin.site.register(Veterinario)
admin.site.register(Cita)