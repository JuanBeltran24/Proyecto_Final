from django.contrib import admin
from .models import Producto

admin.site.register(Producto)


from django.contrib import admin
from .models import MensajeContacto

admin.site.register(MensajeContacto)



from .models import PerfilUsuario

admin.site.register(PerfilUsuario)