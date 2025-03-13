import re
from django.core.exceptions import ValidationError

# Validador para contraseñas
def validar_contraseña(value):
    # Verificar longitud mínima
    if len(value) < 8:
        raise ValidationError("La contraseña debe tener al menos 8 caracteres.")
    
    # Verificar que no sea solo numérica
    if value.isdigit():
        raise ValidationError("La contraseña no puede ser solo números.")
    
    # Verificar que no sea una contraseña común
    lista_comun = ['12345678', 'password', 'qwerty', 'letmein']
    if value in lista_comun:
        raise ValidationError("La contraseña es demasiado común. Usa algo más seguro.")
    
    # Verificar si la contraseña contiene al menos una letra y un número
    if not re.search(r'[a-zA-Z]', value) or not re.search(r'\d', value):
        raise ValidationError("La contraseña debe contener al menos una letra y un número.")
