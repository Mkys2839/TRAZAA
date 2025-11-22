// JavaScript específico para galeria1.html
document.addEventListener('DOMContentLoaded', function() {
    // Animación de imágenes al hacer scroll
    const images = document.querySelectorAll('.ani-img');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        },
        { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    images.forEach((img) => observer.observe(img));

    // Efectos hover para imágenes
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animación para cards de información
    const infoCards = document.querySelectorAll('.info-card');
    
    const infoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        { threshold: 0.2 }
    );

    infoCards.forEach((card) => infoObserver.observe(card));

    // Lightbox simple para imágenes
    images.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Función lightbox simple
    function openLightbox(src, alt) {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        // Crear imagen ampliada
        const enlargedImg = document.createElement('img');
        enlargedImg.src = src;
        enlargedImg.alt = alt;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255,255,255,0.1);
        `;
        
        // Cerrar al hacer click
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Agregar al DOM
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Restaurar scroll al cerrar
        overlay.addEventListener('click', function() {
            document.body.style.overflow = '';
        }, { once: true });
    }

    console.log('Galería 1 cargada correctamente');
});

// Función para compartir proyecto
function shareProject(projectId) {
    if (navigator.share) {
        navigator.share({
            title: 'Proyecto TRAZAA',
            text: 'Mira este increíble proyecto del Festival TRAZAA',
            url: window.location.href + '?project=' + projectId
        })
        .then(() => console.log('Compartido exitosamente'))
        .catch((error) => console.log('Error al compartir:', error));
    } else {
        // Fallback para navegadores que no soportan Web Share API
        alert('Comparte este proyecto copiando la URL de la página');
    }
}