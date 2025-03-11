from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Producto, MensajeContacto  
from django.core.mail import send_mail
from django.conf import settings
import json
from .forms import RegistroForm
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.http import JsonResponse

def verificar_login(request):
    if request.user.is_authenticated:
        return JsonResponse({"loggedIn": True})
    else:
        return JsonResponse({"loggedIn": False})

# Vista para registrar usuario
# def register_view(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, 'Registro exitoso')
#             return redirect('login')  
#         else:
#             messages.error(request, 'Error en el registro')
#             for field, errors in form.errors.items():
#                 for error in errors:
#                     messages.error(request, f"{field}: {error}")
#     else:
#         form = UserCreationForm()
#     return render(request, 'registro.html', {'form': form})



def register_view(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Registro exitoso')
            return redirect('login')  
        else:
            # Aquí solo manejamos los mensajes genéricos para mostrar en el template
            for field, errors in form.errors.items():
                for error in errors:
                    # Si el error es de la contraseña, mostramos un mensaje genérico
                    if field == 'password1':
                        messages.error(request, "Error al digitar la contraseña. Revisa los requisitos y vuelve a intentarlo.")
                    else:
                        messages.error(request, f"{field}: {error}")
    else:
        form = RegistroForm()

    return render(request, 'registro.html', {'form': form})

def register_view(request):
     if request.method == 'POST':
         form = RegistroForm(request.POST)
         if form.is_valid():
             form.save()
             messages.success(request, 'Registro exitoso')
             return redirect('login')  
         else:
             messages.error(request, 'Error en el registro')
             for field, errors in form.errors.items():
                 for error in errors:
                     messages.error(request, f"{field}: {error}")
     else:
         form = RegistroForm()  
     return render(request, 'registro.html', {'form': form})





# Vista para iniciar sesión
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  
        else:
            messages.error(request, 'Nombre de usuario o contraseña incorrectos')
    return render(request, 'login.html')




# Vista para cerrar sesión
def logout_view(request):
    logout(request)
    messages.success(request, 'Has cerrado sesión exitosamente')
    return redirect('home')

# Vista protegida de inicio
def home(request):
    productos = Producto.objects.all()  
    return render(request, 'home.html', {'productos': productos})  

# Vista para la página de contacto
# def contactanos(request):
#     if request.method == "POST":
#         name = request.POST.get("name")
#         email = request.POST.get("email")
#         message = request.POST.get("message")

#         # Guardar en la base de datos
#         MensajeContacto.objects.create(nombre=name, email=email, mensaje=message)

#         # Enviar un correo con la información del contacto
#         send_mail(
#             subject=f"Nuevo mensaje de {name}",
#             message=f"Nombre: {name}\nCorreo: {email}\nMensaje: {message}",
#             from_email=settings.EMAIL_HOST_USER,  
#             recipient_list=[settings.EMAIL_HOST_USER],  
#             fail_silently=False,
#         )

#         messages.success(request, 'Mensaje enviado correctamente')
#         return render(request, "contactanos.html", {"message_sent": True})

#     return render(request, "contactanos.html")

from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.contrib import messages
from django.shortcuts import render
from .models import MensajeContacto
from django.contrib.auth.decorators import login_required

@login_required(login_url='login')  # Redirige al login si el usuario no está autenticado
def contactanos(request):
    if request.method == "POST":
        # Obtener los datos del formulario
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        # Guardar el mensaje en la base de datos
        MensajeContacto.objects.create(nombre=name, email=email, mensaje=message)

        # Enviar correo con la información del contacto al administrador (correo básico)
        admin_message = f"""
        <html>
        <body style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
            <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 650px; margin: 20px auto;">
                <h2 style="color: #FF5733; font-size: 30px; margin-bottom: 20px; text-align: center;">Nuevo mensaje de contacto</h2>
                <p style="color: #333; font-size: 18px; line-height: 1.8;">
                    El siguiente usuario ha enviado un mensaje de contacto. A continuación, los detalles:
                </p>
                <div style="background-color: #f8f8f8; border-left: 5px solid #FF5733; padding: 20px; margin: 20px 0; font-size: 16px; color: #555; border-radius: 5px;">
                    <strong style="color: #FF5733; font-size: 18px;">Detalles del usuario:</strong>
                    <ul style="font-size: 16px; color: #333;">
                        <li><strong>Nombre:</strong> {name}</li>
                        <li><strong>Correo:</strong> {email}</li>
                    </ul>
                    <strong style="color: #FF5733; font-size: 18px;">Mensaje:</strong>
                    <p style="font-size: 16px; color: #333; margin-top: 10px;">{message}</p>
                </div>
                <p style="color: #333; font-size: 18px; text-align: center;">
                    Por favor, revisa este mensaje y proporciona la solución al usuario lo antes posible.
                </p>
            </div>
        </body>
        </html>
        """

        # Enviar el correo al administrador (al correo de la empresa o el administrador)
        send_mail(
            subject=f"Nuevo mensaje de contacto de {name}",
            message="",  # El contenido será HTML, por eso dejamos el mensaje vacío.
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["sabrosurashuila@gmail.com"],  # Correo de la empresa (puedes cambiarlo según sea necesario)
            fail_silently=False,
            html_message=admin_message  # Contenido en HTML para el administrador
        )

        # Crear el contenido HTML para el correo al usuario
        html_content = f"""
        <html>
        <body style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
            <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 650px; margin: 20px auto;">
                <h2 style="color: #FF5733; font-size: 30px; margin-bottom: 20px; text-align: center;">¡Gracias por contactarnos, {name}!</h2>
                <p style="color: #333; font-size: 18px; line-height: 1.8; text-align: center; padding-bottom: 10px;">
                    Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo pronto.
                    <br><br> Mientras tanto, aquí tienes una copia de tu mensaje para que lo puedas revisar:
                </p>
                <div style="background-color: #f8f8f8; border-left: 5px solid #FF5733; padding: 20px; margin: 20px 0; font-size: 16px; color: #555; border-radius: 5px;">
                    <strong style="color: #FF5733; font-size: 18px;">Tu mensaje:</strong>
                    <p style="font-size: 16px; color: #333; margin-top: 10px;">{message}</p>
                </div>
                <p style="color: #333; font-size: 18px; text-align: center; padding-top: 20px;">
                    Saludos,<br><strong>El equipo de soporte</strong>
                </p>
            </div>
        </body>
        </html>
        """

        # Enviar el correo decorado al usuario
        email_message = EmailMessage(
            subject="Gracias por tu mensaje",
            body=html_content,
            from_email=settings.EMAIL_HOST_USER,
            to=[email],
        )
        email_message.content_subtype = "html"  # Establecer el tipo de contenido como HTML
        email_message.send(fail_silently=False)

        # Mostrar un mensaje de éxito al usuario
        messages.success(request, 'Mensaje enviado correctamente')
        return redirect("contactanos")  # Redirigir después de enviar


        # Renderizar la página con el mensaje de éxito
        return render(request, "contactanos.html", {"message_sent": True})

    return render(request, "contactanos.html")

from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
import json

def enviar_correo_confirmacion(request):
    if request.method == "POST":
        try:
            # Cargar los datos del cuerpo de la solicitud
            data = json.loads(request.body)

            # Verificar qué datos está recibiendo Django
            print("Datos recibidos en el backend:", data)

            email_cliente = data.get("email")  # Correo del cliente
            nombre = data.get("nombre", "")
            apellido = data.get("apellido", "")
            celular = data.get("celular", "")
            municipio = data.get("municipio", "")
            residencia = data.get("residencia", "")
            productos = data.get("productos", "No especificado")
            metodo_pago = data.get("metodo_pago", "No especificado")
            total = data.get("total", "0")

            # Definir la URL de la imagen del QR según el método de pago
            qr_imagen = ""
            if metodo_pago == "Nequi":
                qr_imagen = "https://i.imgur.com/9fqPzWN.jpeg"
            elif metodo_pago == "Daviplata":
                qr_imagen = "https://i.imgur.com/4ZDJQ7N.jpeg"

            # Verificar si el email del cliente está vacío
            if not email_cliente:
                return JsonResponse({"error": "No se recibió el email del cliente"}, status=400)

            print(f"Email cliente recibido: {email_cliente}")

            # Construcción del mensaje en HTML para el cliente
            mensaje_html_cliente = f"""
            <html>
            <body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9; padding: 30px;">
                <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 700px; margin: auto;">
                    <h2 style="color: #FF5733; font-size: 36px; margin-bottom: 20px; text-align: center;">¡Gracias por tu compra, {nombre} {apellido}!</h2>
                    <p style="font-size: 18px; line-height: 1.6;">Estamos emocionados de que hayas elegido nuestros productos. Aquí tienes los detalles de tu compra:</p>

                    <h3 style="color: #FF5733; font-size: 22px;">📌 Productos comprados:</h3>
                    <pre style="background-color: #f8f8f8; padding: 10px; border-left: 4px solid #FF5733; font-size: 18px; color: #333;">{productos}</pre>

                    <h3 style="color: #FF5733; font-size: 22px;">💰 Total: ${total}</h3>
                    <h3 style="color: #FF5733; font-size: 22px;">📢 Método de pago: {metodo_pago}</h3>

                    <h3 style="color: #FF5733; font-size: 22px;">📍 Datos del comprador:</h3>
                    <ul style="font-size: 18px; color: #555;">
                        <li><strong>Celular:</strong> {celular}</li>
                        <li><strong>Municipio:</strong> {municipio}</li>
                        <li><strong>Residencia:</strong> {residencia}</li>
                    </ul>
                    <p style="font-size: 18px; color: #333; text-align: center;">Gracias por confiar en nosotros. Te enviaremos cualquier actualización sobre tu pedido.</p>
            """

            # Si el método de pago es Nequi o Daviplata, agregar el QR al correo al cliente
            if qr_imagen:
                mensaje_html_cliente += f"""
                    <h3 style="color: #FF5733; font-size: 22px; text-align: center;">📷 Escanea este código QR para completar tu pago:</h3>
                    <img src="{qr_imagen}" alt="Código QR" style="width: 250px; height:auto; display: block; margin: 20px auto;">
                """

            mensaje_html_cliente += """
                    <p style="font-size: 18px; color: #333; text-align: center;">¡Gracias por confiar en nosotros!</p>
                </div>
            </body>
            </html>
            """

            # Construcción del mensaje en HTML para el administrador (sin QR)
            mensaje_html_admin = f"""
            <html>
            <body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9; padding: 30px;">
                <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 700px; margin: auto;">
                    <h2 style="color: #FF5733; font-size: 36px; margin-bottom: 20px; text-align: center;">Nueva compra realizada</h2>
                    <p style="font-size: 18px; line-height: 1.6;">Se ha realizado una nueva compra. Aquí están los detalles:</p>

                    <h3 style="color: #FF5733; font-size: 22px;">📌 Productos comprados:</h3>
                    <pre style="background-color: #f8f8f8; padding: 10px; border-left: 4px solid #FF5733; font-size: 18px; color: #333;">{productos}</pre>

                    <h3 style="color: #FF5733; font-size: 22px;">💰 Total: ${total}</h3>
                    <h3 style="color: #FF5733; font-size: 22px;">📢 Método de pago: {metodo_pago}</h3>

                    <h3 style="color: #FF5733; font-size: 22px;">📍 Datos del comprador:</h3>
                    <ul style="font-size: 18px; color: #555;">
                        <li><strong>Celular:</strong> {celular}</li>
                        <li><strong>Municipio:</strong> {municipio}</li>
                        <li><strong>Residencia:</strong> {residencia}</li>
                    </ul>

                    <p style="font-size: 18px; color: #333; text-align: center;">Revisa el comprobante y procesa la compra en el sistema.</p>
                </div>
            </body>
            </html>
            """

            # Configurar remitente
            remitente = settings.EMAIL_HOST_USER

            # Enviar correo al cliente
            send_mail(
                subject="Confirmación de compra",
                message="",
                from_email=remitente,
                recipient_list=[email_cliente],
                fail_silently=False,
                html_message=mensaje_html_cliente
            )

            # Enviar correo a la empresa (sin QR y con mensaje adicional)
            send_mail(
                subject="Nueva compra realizada",
                message="",
                from_email=remitente,
                recipient_list=["sabrosurashuila@gmail.com"],  # Correo de la empresa
                fail_silently=False,
                html_message=mensaje_html_admin
            )

            return JsonResponse({"mensaje": "Correo enviado correctamente"})

        except Exception as e:
            print(f"Error en el envío de correo: {e}")  # Imprime el error en la consola
            return JsonResponse({"error": str(e)}, status=400)


from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User

def restablecer(request):
    if request.method == "POST":
        email = request.POST["email"]
        user = User.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            enlace = request.build_absolute_uri(f"/cambiar_contraseña/{uid}/{token}/")

            # Crear el mensaje de correo en HTML
            subject = "Restablecimiento de contraseña"
            message = f"""
            <html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        color: #333;
                        padding: 20px;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }}
                    h1 {{
                        color: #333;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }}
                    p {{
                        font-size: 16px;
                        line-height: 1.6;
                        color: #555;
                    }}
                    .btn {{
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #ff6f00; /* Naranja */
                        color: #000; /* Texto negro */
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 16px;
                        margin-top: 20px;
                        border: 1px solid #e0e0e0; /* Borde sutil */
                    }}
                    .btn:hover {{
                        background-color: #e65c00; /* Naranja más oscuro al pasar el mouse */
                    }}
                    .footer {{
                        margin-top: 30px;
                        font-size: 14px;
                        color: #777;
                    }}
                    .link {{
                        color: #333;
                        text-decoration: none;
                    }}
                    .link:hover {{
                        text-decoration: underline;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Restablecimiento de contraseña</h1>
                    <p>Hola <strong>{user.username}</strong>,</p>
                    <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no fuiste tú, puedes ignorar este mensaje.</p>
                    <p>Para cambiar tu contraseña, haz clic en el siguiente botón:</p>
                    <a href="{enlace}" class="btn">Cambiar contraseña</a>
                    <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                    <p><a href="{enlace}" class="link">{enlace}</a></p>
                    <div class="footer">
                        <p>Gracias,</p>
                        <p>El equipo de Soporte</p>
                    </div>
                </div>
            </body>
            </html>
            """

            # Enviar el correo
            send_mail(
                subject,
                "",  # Mensaje de texto plano (vacío porque usamos HTML)
                "jalmpa77@gmail.com",  # Remitente
                [email],  # Destinatario
                html_message=message,  # Mensaje en HTML
                fail_silently=False,
            )

            messages.success(request, "Se ha enviado un enlace de restablecimiento a su correo.")
            return redirect("login")
        else:
            messages.error(request, "No se encontró un usuario con ese correo electrónico.")
            return redirect("restablecer")  # Redirige de nuevo a la página de restablecimiento
    return render(request, "restablecer.html")



def cambiar_contraseña (request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user and default_token_generator.check_token(user, token):
        if request.method == "POST":
            nueva_contraseña = request.POST["password"]
            user.set_password (nueva_contraseña) 
            user.save()
            return redirect("cambio_contraseña")

        return render(request, "cambiar_contraseña.html") # Página para cambiar contraseña
    return redirect("login") # Si el enlace es inválido, redirige al login



def cambio_contraseña(request):
    return render(request, "cambio_contraseña.html")



from django.shortcuts import render

def manual_usuario(request):
    return render(request, 'manual_usuario.html')
