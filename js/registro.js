// JavaScript específico para registro.html
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const headerSubmitBtn = document.getElementById('headerSubmitBtn');

    // Validación del formulario
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm(this)) {
            // Simular envío del formulario
            simulateFormSubmission();
        }
    });

    // Botón del header también envía el formulario
    headerSubmitBtn.addEventListener('click', function() {
        if (validateForm(registrationForm)) {
            simulateFormSubmission();
        } else {
            // Scroll al formulario si hay errores
            registrationForm.scrollIntoView({ behavior: 'smooth' });
            
            // Resaltar campos requeridos
            highlightRequiredFields();
        }
    });

    // Función de validación mejorada
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Resetear estilos de error
        resetValidationStyles();
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                markFieldAsInvalid(field, 'Este campo es obligatorio');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                markFieldAsInvalid(field, 'Por favor ingresa un email válido');
                isValid = false;
            } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
                markFieldAsInvalid(field, 'Por favor ingresa un teléfono válido');
                isValid = false;
            } else {
                markFieldAsValid(field);
            }
        });

        // Validar que se haya seleccionado un interés
        const interesesSelected = form.querySelector('input[name="intereses"]:checked');
        if (!interesesSelected) {
            const interesesGroup = form.querySelector('.checkbox-group');
            interesesGroup.classList.add('is-invalid');
            isValid = false;
        } else {
            const interesesGroup = form.querySelector('.checkbox-group');
            interesesGroup.classList.remove('is-invalid');
        }

        return isValid;
    }

    // Funciones auxiliares de validación
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }

    function markFieldAsInvalid(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        // Crear o actualizar mensaje de error
        let errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function markFieldAsValid(field) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
        
        // Remover mensaje de error si existe
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function resetValidationStyles() {
        const fields = registrationForm.querySelectorAll('.form-control, .form-select, .form-check-input');
        fields.forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
        });
        
        const errorMessages = registrationForm.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(msg => msg.remove());
        
        const interesesGroup = registrationForm.querySelector('.checkbox-group');
        interesesGroup.classList.remove('is-invalid');
    }

    function highlightRequiredFields() {
        const requiredFields = registrationForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
                return;
            }
        });
    }

    // Simular envío del formulario
    function simulateFormSubmission() {
        // Mostrar loading state
        const submitBtn = registrationForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de envío
        setTimeout(() => {
            // Mostrar mensaje de éxito
            thankYouMessage.style.display = 'block';
            registrationForm.style.display = 'none';
            
            // Scroll al mensaje de éxito
            thankYouMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Opcional: Resetear formulario
            registrationForm.reset();
            resetValidationStyles();
            
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Usar notificación si está disponible
            if (typeof showNotification === 'function') {
                showNotification('¡Registro completado exitosamente!', 'success');
            }
            
            console.log('Formulario enviado correctamente');
        }, 1500);
    }

    // Efectos visuales para los campos
    const formFields = registrationForm.querySelectorAll('.form-control, .form-select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });

    console.log('Página de registro cargada correctamente');
});

// Estilos adicionales para validación
const style = document.createElement('style');
style.textContent = `
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .is-valid {
        border-color: #198754 !important;
        box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25) !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
    
    .checkbox-group.is-invalid {
        border: 2px solid #dc3545;
        border-radius: 8px;
        padding: 15px;
        background-color: rgba(220, 53, 69, 0.05);
    }
    
    .form-group.focused label {
        color: #ff6f91 !important;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);