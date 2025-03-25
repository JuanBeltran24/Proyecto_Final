from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class RegistroForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        label="Correo electrónico",
        error_messages={
            'required': 'Por favor ingresa tu correo electrónico',
            'invalid': 'Ingresa un correo electrónico válido'
        }
    )

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Personalizar mensajes
        self.fields['username'].error_messages = {
            'unique': 'Este nombre de usuario ya está en uso',
            'required': 'Por favor ingresa un nombre de usuario'
        }
        
        # Texto de ayuda para contraseña
        self.fields['password1'].help_text = """
        <ul class="password-requirements">
            <li>Mínimo 8 caracteres</li>
            <li>Al menos una letra mayúscula</li>
            <li>Al menos un número</li>
            <li>No puede ser similar a tu nombre de usuario</li>
        </ul>
        """
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Este correo electrónico ya está registrado")
        return email


# forms.py
from django import forms
from .models import Producto

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'imagen', 'precio', 'categoria']

from django import forms

class PagoForm(forms.Form):
    nombre = forms.CharField(label="Nombre", max_length=100, required=True)
    apellido = forms.CharField(label="Apellido", max_length=100, required=True)
    celular = forms.CharField(label="Celular", max_length=15, required=True)
    municipio = forms.CharField(label="Municipio", max_length=100, required=True)
    residencia = forms.CharField(label="Dirrecion", max_length=255, required=True)
    email = forms.EmailField(label="Correo Electrónico", required=True)



from django import forms
from .models import PerfilUsuario

class PerfilUsuarioForm(forms.ModelForm):
    class Meta:
        model = PerfilUsuario
        fields = ["foto_perfil", "direccion", "departamento", "municipio"]