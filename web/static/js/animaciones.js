// CATEGORIAS
document.addEventListener('DOMContentLoaded', function() {
    // Variables para las categorías
    const categoriesSlider = document.getElementById('categoriesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const categoryItems = document.querySelectorAll('.category-item');
    const productItems = document.querySelectorAll('.item');
    
    // Navegación con botones
    prevBtn.addEventListener('click', function() {
        categoriesSlider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        categoriesSlider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Filtrado de productos por categoría
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover clase active de todos los items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Agregar clase active al elemento seleccionado
            this.classList.add('active');
            
            // Obtener la categoría seleccionada
            const selectedCategory = this.getAttribute('data-category');
            
            // Mostrar u ocultar productos según la categoría seleccionada
            productItems.forEach(product => {
                const productCategory = product.getAttribute('data-categoria');
                
                if (selectedCategory === 'todos' || productCategory === selectedCategory) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});


// Animacions Categorias 
document.addEventListener('DOMContentLoaded', function() {
    const categoriesSection = document.getElementById('Servicio');
    const categoryItems = document.querySelectorAll('.category-item');
    
    function checkScroll() {
        const sectionPosition = categoriesSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (sectionPosition < screenHeight * 0.75) {
            categoriesSection.classList.add('visible');
            
            // Añadir aparición individual de elementos
            categoryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('appear');
                }, (index + 1) * 150); // Aumentado el retraso para un efecto más dramático
            });
        }
    }
    
    // Añadir event listener de scroll
    window.addEventListener('scroll', checkScroll);
    
    // Llamar una vez al cargar la página para manejar casos en que la sección ya está visible
    checkScroll();
});



// FEATURE
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.card-feature');
    const animationDelay = 200; // 200ms entre cada animación
    
    // Crear observer para animar al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animación secuencial con retraso progresivo
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * animationDelay);
                
                // Dejar de observar después de animar para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Se dispara cuando el 10% del elemento es visible
    });
    
    // Observar cada card
    features.forEach(card => {
        observer.observe(card);
    });
});

// QUIENES SOMOS

document.addEventListener("DOMContentLoaded", function () {
    const aboutUsItems = document.querySelectorAll(".about-us-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    aboutUsItems.forEach((item) => {
        observer.observe(item);
    });
});


// MAPA Y VIDEO
document.addEventListener('DOMContentLoaded', function() {
    function animateOnScroll() {
        const sections = document.querySelectorAll('.advanced-map, .advanced-video');
        
        const checkVisibility = function() {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.75);
                
                if (isVisible) {
                    section.classList.add('animated');
                    // Para Google Maps iframe, necesita un pequeño retraso
                    if (section.classList.contains('advanced-map')) {
                        setTimeout(() => {
                            const iframe = section.querySelector('iframe');
                            if (iframe) iframe.style.opacity = 1;
                        }, 400);
                    }
                }
            });
        };
        
        // Verificar al cargar y al hacer scroll
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
    }
    
    animateOnScroll();
});







