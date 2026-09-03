from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('gestion_clinica.urls')),  # <- Apuntando a gestion_clinica
]