from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import enviar_correo_confirmacion, verificar_autenticacion, historial_compras
from .views import editar_perfil

urlpatterns = [
    path('registro/', views.register_view, name='registro'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home, name='home'),
    path('contactanos/', views.contactanos, name='contactanos'),
    path("enviar-correo/", enviar_correo_confirmacion, name="enviar_correo"),
    path('restablecer/', views.restablecer, name='restablecer'),
    path("cambiar_contraseña/<uidb64>/<token>/", views.cambiar_contraseña, name="cambiar_contraseña"),
    path("cambio_contraseña/", views.cambio_contraseña, name="cambio_contraseña"),
    path('manual_usuario/', views.manual_usuario, name='manual_usuario'),
   path('verificar-autenticacion/', views.verificar_autenticacion, name='verificar_autenticacion'),
    path('historial_compras/', views.historial_compras, name='historial_compras'),
    path('', views.home, name='home'),  # Página principal
    path("perfil/", editar_perfil, name="perfil"),
  
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




