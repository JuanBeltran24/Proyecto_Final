document.addEventListener('DOMContentLoaded', function() {
    // Función para transferir datos del perfil al formulario de pago
    function transferUserDataToPaymentForm() {
        console.log('Intentando transferir datos...'); // Para depuración

        // Campos del perfil de usuario
        const profileDireccion = document.querySelector('input[name="direccion"]');
        const profileMunicipio = document.querySelector('input[name="municipio"]');
        const profileDepartamento = document.querySelector('input[name="departamento"]');

        // Campos del formulario de pago
        const paymentNombre = document.getElementById('nombre');
        const paymentApellido = document.getElementById('apellido');
        const paymentCelular = document.getElementById('celular');
        const paymentMunicipio = document.getElementById('municipio');
        const paymentResidencia = document.getElementById('residencia');
        const paymentEmail = document.getElementById('email');

        // Transferir datos con validaciones
        if (profileDireccion && paymentResidencia) {
            paymentResidencia.value = profileDireccion.value;
            console.log('Dirección transferida:', profileDireccion.value);
        }

        if (profileMunicipio && paymentMunicipio) {
            paymentMunicipio.value = profileMunicipio.value;
            console.log('Municipio transferido:', profileMunicipio.value);
        }

        // Opcional: Transferir más campos si es necesario
        if (profileDepartamento) {
            console.log('Departamento:', profileDepartamento.value);
        }
    }

    // Método 1: Si usas un botón para abrir el modal
    const openModalButton = document.getElementById('abrir-modal-pago');
    if (openModalButton) {
        openModalButton.addEventListener('click', transferUserDataToPaymentForm);
    }

    // Método 2: Si usas Bootstrap
    const bootstrapModal = document.getElementById('modal-pago');
    if (bootstrapModal) {
        bootstrapModal.addEventListener('show.bs.modal', transferUserDataToPaymentForm);
    }

    // Método 3: Fallback genérico
    const paymentForm = document.getElementById('pago-form');
    if (paymentForm) {
        paymentForm.addEventListener('focus', transferUserDataToPaymentForm, true);
    }
});