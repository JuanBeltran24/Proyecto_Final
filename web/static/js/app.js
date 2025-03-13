var carritoVisible = false;
let metodoSeleccionado = "";
let qrSeleccionado = "";

// Esperamos que la página cargue completamente
document.addEventListener('DOMContentLoaded', ready);

function ready() {
    // Verificar si hay un mensaje de pago exitoso
    if (localStorage.getItem('pagoExitoso')) {
        // Crear y mostrar mensaje de éxito
        mostrarMensajeExito();
        // Eliminar el flag para que no se muestre de nuevo
        localStorage.removeItem('pagoExitoso');
    }

    // Eventos para los botones de eliminar, sumar y restar
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', eliminarItemCarrito);
    });

    document.querySelectorAll('.sumar-cantidad').forEach(boton => {
        boton.addEventListener('click', sumarCantidad);
    });

    document.querySelectorAll('.restar-cantidad').forEach(boton => {
        boton.addEventListener('click', restarCantidad);
    });

    // Evento para agregar productos al carrito
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', agregarAlCarritoClicked);
    });

    // Evento para mostrar el modal de pago
    let botonPagar = document.getElementById('btn-pagar');
    if (botonPagar) {
        botonPagar.addEventListener('click', mostrarModalPago);
    }

    // Eventos para los métodos de pago
    document.getElementById('nequi').addEventListener('click', () => {
        metodoSeleccionado = "Nequi";
        mostrarQR("/static/img/qrn.jpeg", "Número: 3227281252");
    });

    document.getElementById('daviplata').addEventListener('click', () => {
        metodoSeleccionado = "Daviplata";
        mostrarQR("/static/img/qrd.jpeg", "Número: 3204500034");
    });

    // Evento para cerrar el modal
    document.querySelector(".cerrar").addEventListener("click", cerrarModal);

    // Evento para cerrar el modal al hacer clic fuera de él
    window.addEventListener("click", function (event) {
        let modal = document.getElementById("modal-pago");
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Evento para confirmar el pago
    document.getElementById("confirmarPago").addEventListener("click", confirmarPago);
}

// Función para mostrar el mensaje de éxito con estilos mejorados
function mostrarMensajeExito() {
    // Crear elemento de mensaje
    const mensajeExito = document.createElement('div');
    mensajeExito.className = 'mensaje-exito';
    mensajeExito.innerHTML = `
        <div class="mensaje-contenido">
            <i class="fa-solid fa-circle-check" style="font-size: 48px; margin-bottom: 15px;"></i>
            <h3>¡Pago Realizado con Éxito!</h3>
            <p>Tu pedido ha sido procesado correctamente.</p>
            <p>Hemos enviado la factura a tu correo electrónico.</p>
            <button id="cerrar-mensaje">Cerrar</button>
        </div>
    `;
    
    // Estilos mejorados para el mensaje
    mensajeExito.style.position = 'fixed';
    mensajeExito.style.top = '50%';
    mensajeExito.style.left = '50%';
    mensajeExito.style.transform = 'translate(-50%, -50%)';
    mensajeExito.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    mensajeExito.style.borderRadius = '12px';
    mensajeExito.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    mensajeExito.style.zIndex = '1000';
    mensajeExito.style.textAlign = 'center';
    mensajeExito.style.padding = '30px 40px';
    mensajeExito.style.minWidth = '300px';
    mensajeExito.style.maxWidth = '450px';
    mensajeExito.style.backdropFilter = 'blur(10px)';
    mensajeExito.style.border = '1px solid rgba(220, 220, 220, 0.5)';
    
    // Estilos para elementos internos
    const contenido = mensajeExito.querySelector('.mensaje-contenido');
    contenido.style.display = 'flex';
    contenido.style.flexDirection = 'column';
    contenido.style.alignItems = 'center';
    
    const icon = mensajeExito.querySelector('i');
    icon.style.color = '#4CAF50';
    
    const title = mensajeExito.querySelector('h3');
    title.style.color = '#333';
    title.style.fontSize = '24px';
    title.style.margin = '10px 0';
    title.style.fontWeight = '600';
    
    const paragraphs = mensajeExito.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.color = '#555';
        p.style.margin = '5px 0';
        p.style.fontSize = '16px';
    });
    
    const button = mensajeExito.querySelector('button');
    button.style.marginTop = '20px';
    button.style.padding = '10px 25px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '30px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    button.style.fontWeight = '500';
    button.style.transition = 'all 0.3s ease';
    
    // Efecto hover para el botón
    button.onmouseover = function() {
        this.style.backgroundColor = '#45a049';
        this.style.transform = 'scale(1.05)';
    };
    button.onmouseout = function() {
        this.style.backgroundColor = '#4CAF50';
        this.style.transform = 'scale(1)';
    };
    
    // Agregar mensaje al cuerpo del documento
    document.body.appendChild(mensajeExito);
    
    // Agregar overlay de fondo
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';
    document.body.appendChild(overlay);
    
    // Efecto de entrada
    mensajeExito.style.opacity = '0';
    mensajeExito.style.transform = 'translate(-50%, -60%)';
    setTimeout(() => {
        mensajeExito.style.transition = 'all 0.5s ease';
        mensajeExito.style.opacity = '1';
        mensajeExito.style.transform = 'translate(-50%, -50%)';
    }, 10);
    
    // Agregar evento para cerrar el mensaje
    document.getElementById('cerrar-mensaje').addEventListener('click', function() {
        cerrarMensajeExito(mensajeExito, overlay);
    });
    
    // También cerrar al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        cerrarMensajeExito(mensajeExito, overlay);
    });
    
    // Ocultar automáticamente después de 6 segundos
    setTimeout(() => {
        if (document.body.contains(mensajeExito)) {
            cerrarMensajeExito(mensajeExito, overlay);
        }
    }, 30000);
}

// Función para cerrar el mensaje con animación
function cerrarMensajeExito(mensaje, overlay) {
    mensaje.style.opacity = '0';
    mensaje.style.transform = 'translate(-50%, -40%)';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        if (document.body.contains(mensaje)) {
            mensaje.remove();
        }
        if (document.body.contains(overlay)) {
            overlay.remove();
        }
    }, 500);
}

// Función para mostrar el modal de pago
function mostrarModalPago() {
    let modalPago = document.getElementById("modal-pago");
    if (modalPago) {
        modalPago.style.display = "block";
        document.getElementById("modalBackdrop").style.display = "block";
        mostrarProductosEnPago();
        actualizarTotalPago();
        
        // Añadimos esto para hacer scroll suave al modal
        setTimeout(() => {
            modalPago.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modal-pago").style.display = "none";
    document.getElementById("modalBackdrop").style.display = "none";
}

// Función para mostrar el QR
function mostrarQR(imagenSrc, textoQR) {
    let qrImagen = document.getElementById("qr-imagen");
    let qrTexto = document.getElementById("qr-texto");
    let qrContainer = document.getElementById("qr-container");

    if (qrImagen) {
        qrImagen.src = imagenSrc + "?t=" + new Date().getTime(); // Evitar caché
        qrImagen.style.display = "block";
    }

    if (qrTexto) {
        qrTexto.innerText = textoQR;
        qrTexto.style.display = "block";
    }

    if (qrContainer) {
        qrContainer.style.display = "block";
    }
}

// Función para confirmar el pago
function confirmarPago() {
    // Obtener los valores del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let celular = document.getElementById("celular").value.trim();
    let municipio = document.getElementById("municipio").value.trim();
    let residencia = document.getElementById("residencia").value.trim();
    let email = document.getElementById("email").value.trim();

    // Validar que todos los campos estén completos
    if (!nombre || !apellido || !celular || !municipio || !residencia || !email) {
        alert("Por favor, completa todos los campos del formulario.");
        return; // Detener la ejecución si falta algún campo
    }

    // Validar que se haya seleccionado un método de pago
    if (!metodoSeleccionado) {
        alert("Por favor, selecciona un método de pago.");
        return; // Detener la ejecución si no se seleccionó un método de pago
    }

    // Mostrar el spinner
    document.getElementById("spinner").style.display = "block";

    // Obtener los productos del carrito
    let productos = [...document.querySelectorAll(".carrito-item")].map(item => ({
        titulo: item.querySelector(".carrito-item-titulo").innerText,
        cantidad: item.querySelector(".carrito-item-cantidad").value,
        precio: item.querySelector(".carrito-item-precio").innerText
    }));

    let productosTexto = productos.map(p => `${p.titulo} x${p.cantidad} - ${p.precio}`).join("\n");

    // Obtener el total
    let totalElemento = document.getElementById("monto-total");
    let total = totalElemento ? totalElemento.innerText.replace(/[^0-9]/g, "") : "0";

    // Enviar los datos al backend
    fetch("/enviar-correo/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken() // Incluir el token CSRF
        },
        body: JSON.stringify({
            email: email,
            nombre: nombre,
            apellido: apellido,
            celular: celular,
            municipio: municipio,
            residencia: residencia,
            productos: productosTexto,
            metodo_pago: metodoSeleccionado,
            total: total
        })
    })
    .then(response => response.json())
    .then(data => {
        // Ocultar el spinner
        document.getElementById("spinner").style.display = "none";

        if (data.mensaje) {
            // Eliminamos el alert original
            // alert("Pago confirmado. La factura ha sido enviada.");
            
            document.querySelector(".carrito-items").innerHTML = ""; // Vaciar el carrito
            actualizarTotalCarrito();
            cerrarModal();

            // Hacer scroll al apartado principal (inicio de la página)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Almacenar flag de pago exitoso antes de recargar
            localStorage.setItem('pagoExitoso', 'true');

            // Recargar la página solo una vez
            location.reload();
        } else {
            alert("Error al enviar la factura.");
        }
    })
    .catch(error => {
        // Ocultar el spinner en caso de error
        document.getElementById("spinner").style.display = "none";
        console.error("Error:", error);
        alert("Ocurrió un error al procesar el pago.");
    });
}

// Función para obtener el token CSRF
function getCSRFToken() {
    let cookieValue = null;
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("csrftoken=")) {
            cookieValue = cookie.substring("csrftoken=".length, cookie.length);
            break;
        }
    }
    return cookieValue;
}

// Función para agregar productos al carrito
function agregarAlCarritoClicked(event) {
    let item = event.target.parentElement;
    let titulo = item.querySelector('.titulo-item').innerText;
    let precio = item.querySelector('.precio-item').innerText;
    let imagenSrc = item.querySelector('.img-item').src;
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

// Función para hacer visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    document.querySelector('.carrito').style.marginRight = '0';
    document.querySelector('.carrito').style.opacity = '1';
    document.querySelector('.contenedor-items').style.width = '60%';
}

// Función para agregar un ítem al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    let itemsCarrito = document.querySelector('.carrito-items');
    if ([...itemsCarrito.querySelectorAll('.carrito-item-titulo')].some(item => item.innerText === titulo)) {
        alert("El item ya se encuentra en el carrito");
        return;
    }

    let item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = 
        `<img src="${imagenSrc}" width="80px" alt="Imagen del producto">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <button class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>`;

    itemsCarrito.appendChild(item);
    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    item.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);
    actualizarTotalCarrito();
}

// Función para sumar la cantidad de un ítem
function sumarCantidad(event) {
    let cantidadElemento = event.target.parentElement.querySelector('.carrito-item-cantidad');
    cantidadElemento.value = parseInt(cantidadElemento.value) + 1;
    actualizarTotalCarrito();
}

// Función para restar la cantidad de un ítem
function restarCantidad(event) {
    let cantidadElemento = event.target.parentElement.querySelector('.carrito-item-cantidad');
    if (parseInt(cantidadElemento.value) > 1) {
        cantidadElemento.value = parseInt(cantidadElemento.value) - 1;
        actualizarTotalCarrito();
    }
}

// Función para eliminar un ítem del carrito
function eliminarItemCarrito(event) {
    event.target.closest('.carrito-item').remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Función para ocultar el carrito si está vacío
function ocultarCarrito() {
    let carrito = document.querySelector(".carrito-items");
    if (carrito && carrito.children.length === 0) {
        document.querySelector(".carrito").style.marginRight = "-100%";
        document.querySelector(".carrito").style.opacity = "0";
        document.querySelector(".contenedor-items").style.width = "100%";
        carritoVisible = false;
    }
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
    let total = 0;

    document.querySelectorAll(".carrito-item").forEach(item => {
        let precioTexto = item.querySelector(".carrito-item-precio").innerText;
        let precio = parseFloat(precioTexto.replace(/[^0-9.]/g, "")) || 0; 
        let cantidad = parseInt(item.querySelector(".carrito-item-cantidad").value) || 0;

        total += precio * cantidad;
    });

    total = Math.round(total);

    let totalElemento = document.querySelector(".carrito-precio-total");
    if (totalElemento) {
        totalElemento.innerText = `$${total}`;
    }

    actualizarTotalPago();
}

// Función para actualizar el total en el modal de pago
function actualizarTotalPago() {
    let totalElemento = document.querySelector(".carrito-precio-total");
    let total = totalElemento ? parseInt(totalElemento.innerText.replace(/[^0-9]/g, "")) : 0;

    let montoTotalElemento = document.getElementById("monto-total");
    if (montoTotalElemento) {
        montoTotalElemento.innerText = `$${total}`;
    }
}

// Función para mostrar los productos en el modal de pago
function mostrarProductosEnPago() {
    let productosHTML = [...document.querySelectorAll(".carrito-item")].map(item => 
        `<div class="producto-pago">
            <img src="${item.querySelector('img').src}" width="50" alt="${item.querySelector('.carrito-item-titulo').innerText}">
            <p>${item.querySelector('.carrito-item-titulo').innerText} x${item.querySelector('.carrito-item-cantidad').value} - ${item.querySelector('.carrito-item-precio').innerText}</p>
        </div>`
    ).join('');

    document.getElementById("productos-pago").innerHTML = productosHTML;
    actualizarTotalPago();
}
