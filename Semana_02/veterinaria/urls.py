from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_mascotas, name='listar_mascotas'),
    path('crear/', views.crear_mascota, name='crear_mascota'),
]