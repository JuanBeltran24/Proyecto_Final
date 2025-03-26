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

// Animaciones Categorias
document.addEventListener('DOMContentLoaded', function() {
    const categoriesSection = document.querySelector('.top-categories');
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Configurar valores aleatorios para cada elemento
    categoryItems.forEach(item => {
        // Valores aleatorios entre -200 y 200 para X, y entre -50 y 50 para Y
        const randomX = Math.floor(Math.random() * 400) - 200;
        const randomY = Math.floor(Math.random() * 100) - 50;
        
        // Asignar variables CSS personalizadas
        item.style.setProperty('--random-x', randomX);
        item.style.setProperty('--random-y', randomY);
        
        // Retraso aleatorio entre 0 y 0.5s
        const randomDelay = Math.random() * 0.5;
        item.style.animationDelay = randomDelay + 's';
    });
    
    // Observador de intersección para activar la animación al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                categoryItems.forEach(item => {
                    item.classList.add('slide-in-random');
                });
                // Opcional: dejar de observar después de la primera vez
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Se activa cuando el 30% del elemento es visible
    });
    
    // Observar la sección de categorías
    if (categoriesSection) {
        observer.observe(categoriesSection);
    }
});



// FEATURE
document.addEventListener('DOMContentLoaded', function() {
    const featuresSection = document.querySelector('.container-features');
    const featureCards = document.querySelectorAll('.card-feature');
    
    // Configurar valores aleatorios para cada feature card
    featureCards.forEach((card, index) => {
        // Valores aleatorios para desktop
        const randomX = Math.floor(Math.random() * 300) - 150; // -150 a 150
        const randomY = Math.floor(Math.random() * 200) - 100; // -100 a 100
        const randomRotate = Math.floor(Math.random() * 20) - 10; // -10 a 10 grados
        
        // Valores aleatorios para mobile (solo en Y)
        const randomYMobile = Math.floor(Math.random() * 200) + 100; // 100 a 300
        
        // Asignar variables CSS personalizadas
        card.style.setProperty('--feature-random-x', randomX);
        card.style.setProperty('--feature-random-y', randomY);
        card.style.setProperty('--feature-random-rotate', randomRotate);
        card.style.setProperty('--feature-random-y-mobile', randomYMobile);
        
        // Retraso escalonado basado en el índice (0.1s entre cada card)
        const delay = index * 0.1;
        card.style.animationDelay = delay + 's';
    });
    
    // Observador de intersección para features
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                featureCards.forEach(card => {
                    card.classList.add('feature-slide-in');
                });
                featureObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    });
    
    // Observar la sección de features
    if (featuresSection) {
        featureObserver.observe(featuresSection);
    }
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








