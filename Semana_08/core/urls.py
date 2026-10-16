from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('gestion_clinica.api_urls')),
    path('', include('gestion_clinica.urls')),  # <- Apuntando a gestion_clinica
]