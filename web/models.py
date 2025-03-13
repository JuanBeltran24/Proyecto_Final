from django.db import models

class Producto(models.Model):
    CATEGORIAS = [
        ('roscas', 'Roscas'),
        ('suspiros', 'Suspiros'),
        ('galletas', 'Galletas'),
        ('bizcochos', 'Bizcochos'),
    ]

    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='productos/')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS, default='roscas')

    def __str__(self):
        return self.nombre
    
from django.db import models

class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    mensaje = models.TextField()

    def __str__(self):
        return f"Mensaje de {self.nombre} - {self.email}"


from django.db import models

class Pedido(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    email = models.EmailField()
    municipio = models.CharField(max_length=100)
    residencia = models.CharField(max_length=100)
    productos = models.TextField()  # Puedes ajustar este campo si es necesario
    metodo_pago = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pedido de {self.nombre} {self.apellido}"


