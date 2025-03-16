// CATEGORIAS
document.addEventListener('DOMContentLoaded', function() {
    // Variables para las categorías
    const categoriesSlider = document.getElementById('categoriesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const categoryItems = document.querySelectorAll('.category-item');
    const productItems = document.querySelectorAll('.item');
    
    // Animación inicial para categorías
    categoryItems.forEach((item, index) => {
        item.style.opacity = 0;
        setTimeout(() => {
            item.classList.add('slide-in');
        }, index * 100);
    });
    
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
            
            // Aplicar animación a los productos
            productItems.forEach(product => {
                product.style.opacity = 0;
                product.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    const productCategory = product.getAttribute('data-categoria');
                    
                    if (selectedCategory === 'todos' || productCategory === selectedCategory) {
                        product.style.display = 'block';
                        product.style.opacity = 1;
                        product.style.transform = 'translateY(0)';
                    } else {
                        product.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
});




// FEATURE
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible-down");
                observer.unobserve(entry.target); // Deja de observar el elemento después de la animación
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(".elemento-animado");
    elementsToAnimate.forEach(element => {
        observer.observe(element);
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


// MAPA 
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll(".map-container, .video-container");
    elements.forEach(el => observer.observe(el));
});


// VIDEO
document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".video-container");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(videoContainer);
});








