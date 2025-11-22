// JavaScript específico para galeria2.html
document.addEventListener('DOMContentLoaded', function() {
    // Animación de tarjetas al hacer scroll
    const cards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, 100);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Efectos hover suaves para tarjetas
    cards.forEach(card => {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            }, 50);
        });
    });

    // Efecto de elevación suave para botones - COMO REGISTRO
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        let buttonHoverTimeout;
        
        button.addEventListener('mouseenter', function() {
            clearTimeout(buttonHoverTimeout);
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 14px rgba(255, 121, 121, 0.45)';
        });
        
        button.addEventListener('mouseleave', function() {
            buttonHoverTimeout = setTimeout(() => {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 10px rgba(255, 76, 76, 0.35)';
            }, 50);
        });

        // Efecto de click suave
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 8px rgba(255, 76, 76, 0.35)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 14px rgba(255, 121, 121, 0.45)';
        });
    });

    // Manejo de botones "Ver proyecto"
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                
                // Efecto de click suave
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 3px 8px rgba(255, 76, 76, 0.35)';
                
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 6px 14px rgba(255, 121, 121, 0.45)';
                }, 150);
                
                // Aquí puedes agregar lógica para mostrar más detalles del proyecto
                console.log('Ver proyecto clickeado');
                
                // Ejemplo: Mostrar alerta temporal
                const card = this.closest('.project-card');
                const img = card.querySelector('.project-img');
                const projectName = img.alt || 'Proyecto';
                
                // Usar la función showNotification del main.js si está disponible
                if (typeof showNotification === 'function') {
                    showNotification(`Abriendo detalles de: ${projectName}`, 'info');
                }
            }
        });
    });

    console.log('Galería 2 cargada correctamente con animaciones suaves como registro');
});