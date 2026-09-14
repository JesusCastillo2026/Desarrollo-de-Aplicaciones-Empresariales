from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_pacientes, name='listar_pacientes'),
    path('propietario/nuevo/', views.crear_propietario, name='crear_propietario'),
    path('paciente/nuevo/', views.crear_paciente, name='crear_paciente'),
    path('paciente/editar/<int:id>/', views.editar_paciente, name='editar_paciente'),
    path('paciente/eliminar/<int:id>/', views.eliminar_paciente, name='eliminar_paciente'),
    path('atencion/nueva/', views.registrar_atencion, name='registrar_atencion'),
    path('atencion/editar/<int:id>/', views.editar_atencion, name='editar_atencion'),
    path('atencion/eliminar/<int:id>/', views.eliminar_atencion, name='eliminar_atencion'),
]